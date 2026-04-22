# 🃏 DECK SELECTION ARCHITECTURE (Updated: 2026-04-21)

## Quyết định Kiến trúc (Agent 0 - Commander)
- **Trạng thái trước:** A/B Test ngẫu nhiên (Variant A = Lenormand, Variant B = AI Oracle)
- **Trạng thái mới:** **User tự chọn bộ bài** (thay vì random assign)

## Lý do Thay đổi
- Hai bộ bài phục vụ hai "Use Moment" hoàn toàn khác nhau:
  - **Bộ A (Lenormand):** Định hướng chung cho ngày — User dùng sáng sớm / bất cứ lúc nào
  - **Bộ B (AI Oracle / Tiếng Vọng Thần Linh):** Ra quyết định cho 1 vấn đề cụ thể
- A/B test ngẫu nhiên tạo "intent mismatch" làm hỏng UX và sai lệch dữ liệu.

## Quy tắc cho tất cả Agent
- **KHÔNG** dùng `Math.random()` để phân bổ bộ bài nữa.
- **PHẢI** dùng `localStorage['cw_selected_deck']` (giá trị: `'lenormand'` hoặc `'oracle'`) để biết user đang chọn bộ nào.
- Mặc định khi vào lần đầu: `'lenormand'`

## Agent 5 — Nhiệm vụ Tracking (Thay thế A/B)
Không còn tracking Variant A/B nữa. Thay bằng:
- `DECK_SELECTED`: User bấm tab chọn bộ nào (lenormand / oracle)
- `SHARE_CLICK`: User chia sẻ — cần kèm thêm field `deck` đang dùng
- `DRAW_COMPLETED`: Mỗi lần rút xong — kèm field `deck`
- Mục tiêu: So sánh engagement (lượt share, lượt rút) giữa 2 bộ để biết bộ nào thu hút hơn
