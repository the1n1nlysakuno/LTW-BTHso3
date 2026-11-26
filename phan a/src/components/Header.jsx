import { Component } from 'react';
import Clock from './Clock';

export default class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="top-header">
        <div className="header-inner">
          <h1 className="brand-title">Sổ chi tiêu online</h1>
          <div className="header-actions">
            {showClock && <Clock />}
            <button className="btn-small" onClick={onToggleClock}>
              {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
            </button>
          </div>
        </div>
      </header>
    );
  }
}
