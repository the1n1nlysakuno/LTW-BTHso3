import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import useFetch from './hooks/useFetch';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';

const API_URL = 'https://6b078fce58419b87a4385293.mockapi.io/expenses';

function ExpenseApp() {
  const { theme } = useTheme();
  const { data: expenses, loading, error, addItem, deleteItem } = useFetch(API_URL);
  const [filter, setFilter] = useState('Tất cả');
  const [showClock, setShowClock] = useState(true);

  const filtered =
    filter === 'Tất cả'
      ? expenses
      : expenses.filter((item) => item.category === filter);

  const total = filtered.reduce((sum, item) => sum + Number(item.amount), 0);

  useEffect(() => {
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')}đ`;
  }, [total]);

  return (
    <div className={`app-wrapper ${theme}`}>
      <Header
        showClock={showClock}
        onToggleClock={() => setShowClock((s) => !s)}
      />

      <main className="main-layout">
        <ExpenseForm onAdd={addItem} />

        <section className="panel">
          <h2 className="panel-title">Các khoản đã chi</h2>
          <FilterBar active={filter} onChange={setFilter} />

          {error && <div className="error-msg" style={{ marginBottom: 12 }}>{error}</div>}
          {loading ? (
            <p className="status-text">Đang tải dữ liệu...</p>
          ) : (
            <ExpenseList items={filtered} onDelete={deleteItem} />
          )}
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseApp />
    </ThemeProvider>
  );
}
