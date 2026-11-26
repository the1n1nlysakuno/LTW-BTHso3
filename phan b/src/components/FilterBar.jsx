import { CATEGORIES } from '../data';

export default function FilterBar({ active, onChange }) {
  const opts = ['Tất cả', ...CATEGORIES];

  return (
    <div className="filter-bar">
      {opts.map((cat) => (
        <button
          key={cat}
          className={active === cat ? 'active' : ''}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
