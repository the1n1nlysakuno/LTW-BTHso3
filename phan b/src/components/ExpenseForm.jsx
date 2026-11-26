import { useRef, useState } from 'react';
import { CATEGORIES } from '../data';

export default function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [err, setErr] = useState('');
  const titleRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = Number(amount);

    if (!title.trim()) return setErr('Vui lòng nhập nội dung chi tiêu.');
    if (!amount || num <= 0) return setErr('Số tiền phải lớn hơn 0.');
    if (!date) return setErr('Vui lòng chọn ngày chi.');

    setErr('');
    const ok = await onAdd({
      title: title.trim(),
      amount: num,
      category,
      date,
    });

    if (ok) {
      setTitle('');
      setAmount('');
      titleRef.current?.focus();
    }
  };

  return (
    <section className="panel">
      <h2 className="panel-title">Thêm khoản chi tiêu</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nội dung</label>
          <input
            ref={titleRef}
            type="text"
            placeholder="VD: Ăn sáng, đổ xăng..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input
            type="number"
            placeholder="VD: 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Loại chi tiêu</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ngày chi</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {err && <div className="error-msg">{err}</div>}
        <button className="btn-submit" type="submit">+ Thêm khoản chi</button>
      </form>
    </section>
  );
}
