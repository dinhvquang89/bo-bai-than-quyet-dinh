# SOP: 200-SERIES AGENT WORKFLOW

This document defines the operational procedures for Agents 200-203 in the "Bộ bài Thần Quyết Định" workspace.

## 1. General Principles
- **Coordination:** Antigravity acts as the central coordinator, decomposing instructions from **Agent 200** into tasks for **201-203**.
- **Audit Rule:** Every modification must include the `@AGENT_MODIFIED` comment.
- **Lean Operations:** Minimize agent switching. Only activate 204-209 if complexity warrants it.

## 2. Agent Roles & Handover
| From | To | Trigger | Process |
| :--- | :--- | :--- | :--- |
| **200** | **Coordinator** | Strategic Goal | Input high-level objective. |
| **Coordinator** | **201/202/203** | Task Assignment | Breakdown into actionable code/content tasks. |
| **202** | **203** | Deployment | 202 finishes feature -> 203 performs QA & Monitoring. |
| **201** | **203** | Campaign Launch | 201 starts marketing -> 203 tracks conversion & SEO. |

## 3. Reporting Templates

### Daily Progress (Agent 201-203 -> Coordinator)
```markdown
## [Agent ID] Progress Report - [Date]
- **Tasks Completed:**
- **Issues Encountered:**
- **Next Steps:**
- **Impact Metrics:** (if applicable)
```

### Strategic Summary (Coordinator -> Agent 200)
```markdown
# EXECUTIVE SUMMARY - [Project Phase]
- **Status:** [Green/Yellow/Red]
- **Key Achievements:**
- **Resource Usage:** [Active Agents: 201, 202...]
- **Strategic Recommendation:**
```

## 4. Conflict Resolution
- In case of overlapping responsibilities (e.g., UI vs logic), **Agent 202** holds the technical authority.
- Final strategic disputes are resolved by **Agent 200**.

## 5. Universal Audit Protocol (BẮT BUỘC)

Để đảm bảo tính nhất quán và không vi phạm các quy tắc đã thiết lập, **TẤT CẢ** các câu hỏi và yêu cầu của **Agent 200** (User) đều phải được thực thi thông qua 4 lớp lọc tự động sau đây trước khi đưa ra câu trả lời hoặc hành động:

1.  **Lớp 1: Thời gian & Lịch trình (Calendar Check):**
    *   Xác định thứ trong tuần và nhiệm vụ tương ứng trong [MARKETING_CALENDAR_1MONTH.md](file:///d:/Antigravity%20projects/bo%20bai%20than%20quyet%20dinh/MARKETING_CALENDAR_1MONTH.md).
2.  **Lớp 2: Tiến độ thực tế (Log Check):**
    *   Đối soát với [MARKETING_LOG.md](file:///d:/Antigravity%20projects/bo%20bai%20than%20quyet%20dinh/MARKETING_LOG.md) để biết việc gì đã làm, việc gì đang dở dang.
3.  **Lớp 3: Quy tắc & Giới hạn (Rule Check):**
    *   Kiểm tra tính tuân thủ: Quy tắc 1 giờ/ngày, chiến lược Faceless (không lộ mặt), loại bỏ nội dung "healing fluff" (chữa lành), và Audit Trail `@AGENT_MODIFIED`.
4.  **Lớp 4: Mục tiêu giai đoạn (Strategy Check):**
    *   Đối chiếu với lộ trình 4 tuần trong [MARKETING_PLAN.md](file:///d:/Antigravity%20projects/bo%20bai%20than%20quyet%20dinh/MARKETING_PLAN.md) để đảm bảo không đi lệch hướng chiến lược của tuần hiện tại.

---
// @AGENT_MODIFIED: 2026-05-05T10:47:00Z | Agent 200 | Reason: Integrated Universal Audit Protocol (4 Layers) for all interactions | Tag: #process
