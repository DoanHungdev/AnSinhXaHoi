/**
 * AN SINH 360 - VIỆT NAM | LOCAL MOCK AI CHATBOT
 * Injects floating chatbot widget, handles keyword queries & quick chips
 */

(function () {
  'use strict';

  const BOT_KNOWLEDGE = [
    {
      keywords: ['bhyt', 'y tế', 'bảo hiểm y tế', 'viện phí'],
      reply: 'Bảo hiểm y tế (BHYT) tại Việt Nam năm 2024 ghi nhận bao phủ 94,2% dân số (95,523 triệu người tham gia). Khi khám chữa bệnh đúng tuyến, người tham gia được quỹ chi trả 80% - 100% chi phí. Trẻ em dưới 6 tuổi, người có công, hộ nghèo được ngân sách cấp thẻ BHYT hoàn toàn miễn phí!'
    },
    {
      keywords: ['bhxh', 'bảo hiểm xã hội', 'lương hưu', 'nghỉ hưu', 'tuổi già'],
      reply: 'BHXH gồm 2 loại: Bắt buộc (5 chế độ: Ốm đau, Thai sản, Tai nạn lao động, Hưu trí, Tử tuất) và Tự nguyện (Hưu trí, Tử tuất). Năm 2024 có 20,11 triệu người tham gia BHXH (~42,71% lực lượng lao động). Người tham gia đủ năm đóng BHXH sẽ được hưởng lương hưu hàng tháng và cấp thẻ BHYT miễn phí suốt đời.'
    },
    {
      keywords: ['bhtn', 'thất nghiệp', 'mất việc', 'trợ cấp thất nghiệp', 'học nghề'],
      reply: 'Bảo hiểm thất nghiệp có hơn 16,09 triệu người tham gia (năm 2024), chi trả trợ cấp bằng 60% bình quân tiền lương 6 tháng liền kề đóng BHTN. Người lao động còn được cấp thẻ BHYT miễn phí, tư vấn giới thiệu việc làm và hỗ trợ học nghề miễn phí!'
    },
    {
      keywords: ['người già', 'cao tuổi', '80 tuổi', 'hưu trí'],
      reply: 'Người cao tuổi từ đủ 80 tuổi không có lương hưu được hưởng trợ cấp xã hội hàng tháng theo Nghị định 76/2024/NĐ-CP (chuẩn trợ cấp 500.000đ/tháng), cấp thẻ BHYT miễn phí và chúc thọ định kỳ.'
    },
    {
      keywords: ['người khuyết tật', 'khuyết tật', 'yếu thế', 'hòa nhập'],
      reply: 'Người khuyết tật nặng và đặc biệt nặng được hưởng trợ cấp bảo trợ xã hội hàng tháng, cấp thẻ BHYT miễn phí, hỗ trợ phục hồi chức năng và vay vốn ưu đãi 0% từ Ngân hàng Chính sách Xã hội để tạo sinh kế hòa nhập cộng đồng.'
    },
    {
      keywords: ['trẻ em', 'dưới 6 tuổi', 'tiêm chủng', 'học sinh'],
      reply: '100% trẻ em dưới 6 tuổi được Nhà nước cấp thẻ BHYT miễn phí, tiêm vắc-xin miễn phí trong chương trình tiêm chủng mở rộng và phổ cập giáo dục mầm non, miễn học phí tiểu học.'
    },
    {
      keywords: ['giảm nghèo', 'nghèo', 'cận nghèo', 'nhà đại đoàn kết'],
      reply: 'Chính sách giảm nghèo đa chiều (Nghị định 07/2021/NĐ-CP) hỗ trợ vay vốn sản xuất lãi suất thấp, tặng giống cây con, xây nhà Đại đoàn kết, hỗ trợ tiền điện và học phí. Tỷ lệ nghèo đa chiều Việt Nam đã giảm xuống khoảng 1,93% - 2,4% năm 2024.'
    }
  ];

  function renderChatbot() {
    // Check if chatbot container already exists
    if (document.getElementById('chatbot-root')) return;

    const root = document.createElement('div');
    root.id = 'chatbot-root';
    root.innerHTML = `
      <!-- Floating Trigger Button -->
      <button class="chatbot-trigger-btn" id="chatbot-toggle" aria-label="Mở trợ lý AI An Sinh" title="Trợ lý AI An Sinh 360">
        🤖
      </button>

      <!-- Chatbot Popup Window -->
      <div class="chatbot-window" id="chatbot-window">
        <div class="chat-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.25rem;">🤖</span>
            <div>
              <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">Trợ Lý AI An Sinh</div>
              <div style="font-size: 0.65rem; color: var(--accent-teal); font-weight: 600;">GDKT&PL Lớp 12</div>
            </div>
          </div>
          <button id="chatbot-close" style="font-size: 1.1rem; color: var(--text-muted); cursor: pointer; padding: 4px;">✕</button>
        </div>

        <div class="chat-messages" id="chat-messages">
          <div class="chat-msg bot">
            Chào bạn, tôi là trợ lý AI An Sinh. Bạn muốn tìm hiểu chính sách nào?
          </div>
        </div>

        <!-- Quick Chips -->
        <div class="chat-chips">
          <button class="chat-chip" data-topic="BHYT">BHYT</button>
          <button class="chat-chip" data-topic="BHXH">BHXH</button>
          <button class="chat-chip" data-topic="BHTN">BHTN</button>
          <button class="chat-chip" data-topic="Người già">Người già</button>
          <button class="chat-chip" data-topic="Người khuyết tật">Khuyết tật</button>
          <button class="chat-chip" data-topic="Trẻ em">Trẻ em</button>
          <button class="chat-chip" data-topic="Giảm nghèo">Giảm nghèo</button>
        </div>

        <!-- Input Bar -->
        <form class="chat-input-bar" id="chat-form">
          <input type="text" id="chat-input" class="chat-input-field" placeholder="Nhập câu hỏi của bạn..." autocomplete="off" />
          <button type="submit" class="chat-send-btn" aria-label="Gửi câu hỏi">➤</button>
        </form>
      </div>
    `;

    document.body.appendChild(root);

    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatWin = document.getElementById('chatbot-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    toggleBtn.addEventListener('click', () => {
      chatWin.classList.toggle('open');
      if (chatWin.classList.contains('open')) {
        chatInput.focus();
      }
    });

    closeBtn.addEventListener('click', () => {
      chatWin.classList.remove('open');
    });

    function addMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${sender}`;
      msgDiv.textContent = text;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleQuestion(text) {
      if (!text.trim()) return;
      addMessage('user', text);
      chatInput.value = '';

      setTimeout(() => {
        const query = text.toLowerCase();
        let matched = BOT_KNOWLEDGE.find(item =>
          item.keywords.some(k => query.includes(k))
        );

        if (matched) {
          addMessage('bot', matched.reply);
        } else {
          addMessage(
            'bot',
            'Tôi có thể giải đáp các chính sách: Bảo hiểm y tế (BHYT), Bảo hiểm xã hội (BHXH), Trợ cấp thất nghiệp (BHTN), Chăm sóc người cao tuổi, Người khuyết tật, Quyền trẻ em và Chương trình giảm nghèo bền vững. Bạn hãy bấm vào các gợi ý bên dưới nhé!'
          );
        }
      }, 350);
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuestion(chatInput.value);
    });

    // Chips click
    root.querySelectorAll('.chat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-topic');
        handleQuestion(topic);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', renderChatbot);
})();
