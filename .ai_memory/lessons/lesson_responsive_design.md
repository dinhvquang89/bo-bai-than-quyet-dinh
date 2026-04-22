# 📱 RESPONSIVE DESIGN RULE (MOBILE-FIRST)

## 1. Yêu Cầu Cốt Lõi của Dự Án
- Mọi thành phần UI của Web/Webapp (Đặc biệt là Thần Khải Oracle) bắt buộc phải tích hợp khả năng **Tự động nhận diện thiết bị (Responsive UI)**.
- Giao diện phải co giãn, sắp xếp hợp lý và thân thiện tuyệt đối với màn hình Smart Phone (Mobile) cũng như hiển thị đẹp trên PC.

## 2. Tiêu Chuẩn Frontend (Tailwind/CSS)
- Yêu cầu sử dụng triết lý `Mobile-first` (Viết code cho màn hình điện thoại trước).
- Sử dụng triệt để các modifier breakpoints của Tailwind (`sm:`, `md:`, `lg:`, `xl:`) để điều chỉnh kích thước Flexbox/Grid.
- Không sử dụng các giá trị kích thước tĩnh quá lớn (như `width: 800px`) dễ gây vỡ khung trên Màn hình dọc.

## 3. Lịch Trình Thực Thi
- Chữ ký Lệnh: Hệ thống phải tự động rà soát quy tắc này để tư vấn hoặc tái thiết kế cho User **SAU KHI dự án đã Public Online thành công**. Lúc đó sẽ đánh giá lại Cấu trúc Responsive có đạt chuẩn Mobile hay chưa chưa.
