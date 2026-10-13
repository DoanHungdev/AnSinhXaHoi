/**
 * AN SINH 360 - VIỆT NAM | FAIRNESS SLIDER INTERACTION SCRIPT
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('support-slider');
    const supportVal = document.getElementById('support-val');
    const personBImg = document.getElementById('person-b-img');
    const personBCard = document.getElementById('person-b-card');
    const personBStatus = document.getElementById('person-b-status');
    const gapScore = document.getElementById('gap-score');

    if (!slider) return;

    function updateFairness(val) {
      if (supportVal) supportVal.textContent = val + '%';

      // Tính khoảng cách chênh lệch
      const gap = Math.max(10, Math.round(80 - (val * 0.7)));
      if (gapScore) gapScore.textContent = gap + '%';

      // Điều chỉnh bộ lọc ảnh Người B (Nông dân phục hồi)
      if (personBImg) {
        const brightness = 0.6 + (val / 100) * 0.45; // 0.6 -> 1.05
        const saturate = 0.4 + (val / 100) * 0.65;   // 0.4 -> 1.05
        personBImg.style.filter = `brightness(${brightness}) saturate(${saturate})`;
      }

      // Điều chỉnh Card B
      if (personBCard) {
        if (val > 65) {
          personBCard.style.borderColor = 'var(--accent-emerald)';
          personBCard.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.25)';
        } else if (val > 30) {
          personBCard.style.borderColor = 'var(--accent-teal)';
          personBCard.style.boxShadow = '0 8px 25px rgba(20, 184, 166, 0.15)';
        } else {
          personBCard.style.borderColor = 'var(--glass-border)';
          personBCard.style.boxShadow = 'var(--glass-shadow)';
        }
      }

      // Trạng thái sinh kế Người B
      if (personBStatus) {
        if (val < 30) {
          personBStatus.innerHTML = `
            <span style="color: var(--accent-rose); font-weight: 700;">⚠ Nguy cơ tái nghèo cùng cực:</span>
            Mất trắng mùa màng sau bão lũ, kiệt quệ vốn liếng, không có phao cứu trợ khẩn cấp, con cái đối mặt nguy cơ bỏ học.
          `;
        } else if (val < 70) {
          personBStatus.innerHTML = `
            <span style="color: var(--accent-amber); font-weight: 700;">⚡ Bước đầu phục hồi sinh kế:</span>
            Nhận gạo và nhu yếu phẩm cứu trợ từ Nhà nước; Ngân hàng Chính sách Xã hội khoanh nợ và giải ngân vốn phục hồi cây trồng.
          `;
        } else {
          personBStatus.innerHTML = `
            <span style="color: var(--accent-emerald); font-weight: 700;">✓ Tái thiết toàn diện & Ổn định bền vững:</span>
            Được cấp bù bảo hiểm nông nghiệp, hỗ trợ vật liệu dựng lại nhà kiên cố, BHYT miễn phí 100%, nhanh chóng đưa cuộc sống trở lại bình thường!
          `;
        }
      }
    }

    slider.addEventListener('input', (e) => {
      updateFairness(Number(e.target.value));
    });

    // Khởi tạo ở mức 50%
    updateFairness(50);
  });
})();
