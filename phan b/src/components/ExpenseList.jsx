export default function ExpenseList({ items, onDelete }) {
  const total = items.reduce((sum, item) => sum + Number(item.amount), 0);

  const handleDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <p className="status-text">Chưa có khoản chi nào.</p>
      ) : (
        <ul className="expense-list">
          {items.map((item) => (
            <li key={item.id} className="expense-item">
              <div>
                <strong>{item.title}</strong>
                <div className="expense-meta">
                  {item.category} • {item.date}
                </div>
              </div>
              <div className="expense-right">
                <span className="expense-amount">
                  {Number(item.amount).toLocaleString('vi-VN')} đ
                </span>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id, item.title)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total-row">
        <span>Tổng cộng:</span>
        <span>{total.toLocaleString('vi-VN')} đ</span>
      </div>
    </div>
  );
}
