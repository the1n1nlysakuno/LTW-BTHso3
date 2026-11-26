# Đặng Nhật Quang - B25DCTV063

# Sổ chi tiêu online (Phần A & Phần B) 

- `phan-a-class/` — Xây dựng bằng Class Component (dữ liệu mẫu tĩnh).
- `phan-b-hooks/` — Xây dựng bằng Function Component + Hooks (kết nối MockAPI).

# Cách chạy từng phần

```bash
# Chạy Phần A
cd phan-a-class
npm install
npm run dev

# Chạy Phần B
cd phan-b-hooks
npm install
npm run dev
```

# Hooks đã khắc phục các thách thức của Class Component như thế nào trong bài?

1. Gom logic liên quan vào cùng một chỗ (`useEffect`):
   - Trong `phan-a-class`, `Clock.jsx` phải tách `setInterval` ở `componentDidMount` và `clearInterval` ở `componentWillUnmount`. Tương tự, `App.jsx` phải cập nhật `document.title` lặp lại ở cả `componentDidMount` và `componentDidUpdate`.
   - Trong `phan-b-hooks`, `useEffect` gom cả khởi tạo lẫn dọn dẹp vào chung một chỗ, ngắn hơn và tránh quên cleanup.

2. Code gọn hơn, bỏ `constructor` và `this`:
   - Class Component cần `constructor`, `super(props)`, `this.state`, `this.setState` và arrow function để giữ đúng ngữ cảnh `this`.
   - `useState` cho phép tách từng state độc lập, đọc và cập nhật trực tiếp.

3. Tái sử dụng logic gọi API dễ dàng (`useFetch`):
   - Toàn bộ logic `GET / POST / DELETE`, trạng thái `loading` và `error` được đóng gói trong custom hook `src/hooks/useFetch.js`, gọn hơn nhiều so với mô hình HOC/Render Props của Class.

4. Chia sẻ theme không cần truyền props nhiều tầng (`useContext`) & focus ô nhập (`useRef`):
   - `ThemeContext` + `useContext` giúp `Header` và `App` dùng chung chế độ Sáng/Tối trực tiếp.
   - `useRef` focus lại ô nhập nội dung sau khi thêm khoản chi chỉ bằng `titleRef.current?.focus()`.
