import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!ignore) setData(json);
      } catch {
        if (!ignore) setError('Không tải được dữ liệu. Kiểm tra lại đường truyền mạng/Link MockAPI');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [url]);

  const addItem = async (item) => {
    setError('');
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();
      setData((prev) => [created, ...prev]);
      return true;
    } catch {
      setError('Thêm khoản chi thất bại.');
      return false;
    }
  };

  const deleteItem = async (id) => {
    setError('');
    try {
      const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError('Xóa khoản chi thất bại.');
    }
  };

  return { data, loading, error, addItem, deleteItem };
}
