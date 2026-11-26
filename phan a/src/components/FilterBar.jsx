import { Component } from 'react';
import { CATEGORIES } from '../data';

export default class FilterBar extends Component {
  render() {
    const { active, onChange } = this.props;
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
}
