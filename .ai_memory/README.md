# RAG Memory (Knowledge Base cho Lập trình viên AI)

Thư mục này hoạt động như một Memory lưu trữ dài hạn (Long-term Memory) cho các AI Agent tham gia vào dự án này.

## Cơ chế hoạt động (RAG)
1. **Feedback & Lưu trữ (Storage)**: Khi người dùng phàn nàn, sửa lỗi hoặc đưa ra một "best practice" cho dự án, Agent sẽ tự viết ra một markdown chứa bài học và lưu vào đây.
2. **Truy xuất (Retrieval)**: Trước khi làm tính năng mới, Agent bắt buộc phải thực hiện quét từ khóa theo context trên toàn bộ thư mục `.ai_memory` này để tìm "Guideline" đã thống nhất.

## Cấu trúc file Lesson
```markdown
# [Chủ đề]
- Hoàn cảnh: (Ví dụ: Lúc làm tính năng X bị nhắc nhở)
- Bài học cốt lõi: (Nên làm gì / Không nên làm gì)
- Áp dụng vào Code: (Code snippet minh họa)
```
