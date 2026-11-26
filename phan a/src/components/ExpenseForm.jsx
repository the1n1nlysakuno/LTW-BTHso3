import { Component } from 'react';
import { CATEGORIES } from '../data';

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      amount: '',
      category: CATEGORIES[0],
      date: new Date().toISOString().slice(0, 10),
      err: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, amount, category, date } = this.state;
    const num = Number(amount);

    if (!title.trim()) return this.setState({ err: 'Vui lòng nhập nội dung chi tiêu.' });
    if (!amount || num <= 0) return this.setState({ err: 'Số tiền phải lớn hơn 0.' });
    if (!date) return this.setState({ err: 'Vui lòng chọn ngày chi.' });

    this.props.onAdd({
      id: Date.now().toString(),
      title: title.trim(),
      amount: num,
      category,
      date,
    });

    this.setState({ title: '', amount: '', err: '' });
  };

  render() {
    const { title, amount, category, date, err } = this.state;

    return (
      <section className="panel">
        <h2 className="panel-title">Thêm khoản chi tiêu</h2>
        <form className="expense-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nội dung</label>
            <input
              type="text"
              placeholder="VD: Ăn sáng, đổ xăng..."
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Số tiền (VNĐ)</label>
            <input
              type="number"
              placeholder="VD: 50000"
              value={amount}
              onChange={(e) => this.setState({ amount: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Loại chi tiêu</label>
            <select
              value={category}
              onChange={(e) => this.setState({ category: e.target.value })}
            >
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
              onChange={(e) => this.setState({ date: e.target.value })}
            />
          </div>

          {err && <div className="error-msg">{err}</div>}
          <button className="btn-submit" type="submit">+ Thêm khoản chi</button>
        </form>
      </section>
    );
  }
}
