# Cưng Tea - GitHub Pages

Website tĩnh, không có giỏ hàng và không có chức năng đặt đơn.

## Cấu trúc
- `index.html`: trang chính, layout chiến dịch/quảng cáo.
- `menu.html`: trang con Menu, giữ cùng header/footer/style.
- `data/campaign.json`: nội dung quảng cáo, dễ thay đổi theo ngày.
- `data/menu.json`: dữ liệu món và giá, tách riêng khỏi HTML.
- `campaign.js`: đọc campaign.json.
- `menu.js`: đọc menu.json và dựng menu.
- `styles.css`: layout dùng chung.
- `assets/fruit-promo.jpg`: ảnh quảng cáo (có thể thay/xóa).

## Chạy trên GitHub Pages
Upload toàn bộ các file/thư mục này lên repository, sau đó vào Settings → Pages → Deploy from a branch → chọn branch chứa website và thư mục `/ (root)`.

Website dùng đường dẫn tương đối (`data/menu.json`, `assets/...`) nên chạy được cả khi repository nằm ở dạng `username.github.io/ten-repo/`.

## Lưu ý
GitHub Pages chỉ phục vụ file tĩnh. Không có backend, SMTP, database hay xác minh giá phía server. Vì website hiện không nhận order nên không có rủi ro từ việc tính tiền trên client. Nếu sau này thêm order, nên đưa phần xử lý đơn sang backend/API riêng.
