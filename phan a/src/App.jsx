import { Component } from 'react';
import { INITIAL_EXPENSES } from './data';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import ExpenseList from './components/ExpenseList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: INITIAL_EXPENSES,
      filter: 'Tất cả',
      showClock: true,
    };
  }

  getFiltered() {
    const { expenses, filter } = this.state;
    return filter === 'Tất cả'
      ? expenses
      : expenses.filter((item) => item.category === filter);
  }

  updateTitle() {
    const total = this.getFiltered().reduce((sum, x) => sum + Number(x.amount), 0);
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')}đ`;
  }

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.expenses !== this.state.expenses ||
      prevState.filter !== this.state.filter
    ) {
      this.updateTitle();
    }
  }

  handleAdd = (item) => {
    this.setState((prev) => ({ expenses: [item, ...prev.expenses] }));
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      expenses: prev.expenses.filter((item) => item.id !== id),
    }));
  };

  render() {
    const { filter, showClock } = this.state;
    const filtered = this.getFiltered();

    return (
      <div className="app-wrapper">
        <Header
          showClock={showClock}
          onToggleClock={() => this.setState((prev) => ({ showClock: !prev.showClock }))}
        />

        <main className="main-layout">
          <ExpenseForm onAdd={this.handleAdd} />

          <section className="panel">
            <h2 className="panel-title">Các khoản đã chi</h2>
            <FilterBar
              active={filter}
              onChange={(cat) => this.setState({ filter: cat })}
            />
            <ExpenseList items={filtered} onDelete={this.handleDelete} />
          </section>
        </main>
      </div>
    );
  }
}
