import Clock from './Clock';
import { useTheme } from '../context/ThemeContext';

export default function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="top-header">
      <div className="header-inner">
        <h1 className="brand-title">Sổ chi tiêu online</h1>
        <div className="header-actions">
          {showClock && <Clock />}
          <button className="btn-small" onClick={onToggleClock}>
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
          <button className="btn-small" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </div>
      </div>
    </header>
  );
}
