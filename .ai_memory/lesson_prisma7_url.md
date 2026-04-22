# Prisma 7 Schema URL Error

- **Hoàn cảnh:** Khi cài mới Prisma (v7.7.0) cho Next.js, viết schema truyền thống có `url = env("DATABASE_URL")` ở khối `datasource db`.
- **Bài học cốt lõi:** Bắt đầu từ Prisma 7, `url` trong `schema.prisma` KHÔNG CÒN ĐƯỢC HỖ TRỢ. Configuration cho migrate / kết nối DB đã chuyển một phần sang `prisma.config.ts` và phần url runtime chuyển thẳng vào tham số khởi tạo `new PrismaClient({ url: ... })`.
- **Cách fix (Cho Prisma 7):**
  1. Trong `schema.prisma` chỉ để:
  ```prisma
  datasource db {
    provider = "sqlite"
  }
  ```
  2. Bỏ `url` đi. Config connection string trong `prisma.config.ts` hoặc truyền trực tiếp vào `PrismaClient` ở Server side.
