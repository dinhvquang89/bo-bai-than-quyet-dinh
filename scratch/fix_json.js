const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'data', 'content_oracle.json');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Keep the first 490 lines
const head = lines.slice(0, 490).join('\n');

// Corrected tail content
const tail = `                      "adviceVn":  "Đánh giá lại mục tiêu. Đây có thực sự là thứ bạn cần không?",
                      "imageUrl":  "https://images.unsplash.com/photo-1542125387-c71274d94f0a?q=80&w=800&auto=format&fit=crop"
                  },
                  {
                      "adviceEn":  "Smooth out the rough edges. Harmony is more important than being right.",
                      "descriptionVn":  "Căng thẳng tồn tại do thiếu sự cân bằng. Hãy tìm điểm chung.",
                      "descriptionEn":  "Tension exists because of a lack of balance. Seek the middle ground.",
                      "imageUrl":  "/images/oracle/card_harmony.png",
                      "nameEn":  "Look For Harmony",
                      "nameVn":  "Tìm Sự Hòa Hợp",
                      "adviceVn":  "Hãy làm dịu những mâu thuẫn. Sự hòa hợp quan trọng hơn việc ai đúng ai sai."
                  },
                  {
                      "adviceEn":  "Pull back. Silence will provide the clarity that communication cannot.",
                      "descriptionVn":  "Kênh truyền tin đang quá nhiều. Bạn cần tạm rời xa để nghe được rõ ràng hơn.",
                      "descriptionEn":  "The channel is noisy. You need to distance yourself to hear clearly.",
                      "imageUrl":  "/images/oracle/card_disconnect.png",
                      "nameEn":  "End Direct Connection",
                      "nameVn":  "Ngắt Kết Nối Trực Tiếp",
                      "adviceVn":  "Hãy rút lui. Sự tĩnh lặng sẽ mang lại sự sáng suốt mà giao tiếp không thể làm được."
                  },
                  {
                      "adviceEn":  "Keep a notebook nearby. The best ideas come when you least expect them.",
                      "descriptionVn":  "Một tia sáng trí tuệ sắp lóe lên. Hãy sẵn sàng để nắm bắt nó.",
                      "descriptionEn":  "A flash of insight is about to strike. Be ready to capture it.",
                      "imageUrl":  "/images/oracle/card_inspiration.png",
                      "nameEn":  "Sudden Inspiration",
                      "nameVn":  "Cảm Hứng Bất Ngờ",
                      "adviceVn":  "Hãy giữ sổ tay bên mình. Những ý tưởng tốt nhất sẽ đến khi bạn ít mong đợi nhất."
                  },
                  {
                      "adviceEn":  "Nurture the small steps. Consistency will turn them into a legacy.",
                      "descriptionVn":  "Cây sồi khổng lồ bắt đầu từ hạt mầm nhỏ. Đừng coi thường những bước khởi đầu.",
                      "descriptionEn":  "The giant oak starts as a tiny seed. Don't despise the small start.",
                      "imageUrl":  "/images/oracle/card_small_start.png",
                      "nameEn":  "Small Beginnings",
                      "nameVn":  "Khởi Đầu Nhỏ Bé",
                      "adviceVn":  "Hãy nuôi dưỡng những bước đi nhỏ. Sự kiên trì sẽ biến chúng thành di sản."
                  }
              ]
}
// @AGENT_MODIFIED: 2026-04-22T02:00:00Z | Agent 4 | Reason: Repaired corrupted Vietnamese encoding in content_oracle.json | Tag: #fix #data`;

fs.writeFileSync(filePath, head + '\n' + tail, 'utf8');
console.log('File content_oracle.json has been reconstructed successfully.');
