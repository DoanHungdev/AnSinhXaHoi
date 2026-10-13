/**
 * AN SINH 360 - VIỆT NAM | LAN'S TIMELINE & CRISIS INTERACTION
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const crisisBtn = document.getElementById('trigger-crisis-btn');
    const flashOverlay = document.getElementById('flash-overlay');

    if (crisisBtn) {
      crisisBtn.addEventListener('click', () => {
        // 1. Play sound
        if (typeof window.playAlarmSound === 'function') {
          window.playAlarmSound();
        }

        // 2. Shake screen & flash red
        document.body.classList.add('shaking');
        if (flashOverlay) {
          flashOverlay.classList.add('flashing');
        }

        setTimeout(() => {
          document.body.classList.remove('shaking');
          if (flashOverlay) {
            flashOverlay.classList.remove('flashing');
          }

          // 3. Open Crisis Modal
          if (typeof window.openModal === 'function') {
            window.openModal('crisis-modal');
          }
        }, 400);
      });
    }

    // Nút "Tiếp tục hành trình"
    const resolveBtn = document.getElementById('resolve-crisis-btn');
    if (resolveBtn) {
      resolveBtn.addEventListener('click', () => {
        if (typeof window.playSuccessSound === 'function') {
          window.playSuccessSound();
        }
        if (typeof window.closeModal === 'function') {
          window.closeModal('crisis-modal');
        }

        // Đổi trạng thái card điểm 4 sang đã được cứu trợ
        const card4 = document.getElementById('timeline-card-4');
        if (card4) {
          card4.classList.remove('danger-card');
          card4.style.borderColor = 'var(--accent-teal)';
          card4.innerHTML = `
            <div>
              <div class="point-time-tag" style="color: var(--accent-emerald);">ĐÃ ĐƯỢC BẢO HỘ THÀNH CÔNG</div>
              <h3 class="point-title">Điểm 4: Được Bảo Hiểm Thất Nghiệp & Đào Tạo Nghề Vớt Lên</h3>
              <p class="point-desc">Lan được chi trả 60% mức lương trợ cấp thất nghiệp hàng tháng và cấp thẻ BHYT miễn phí. Nhờ gói hỗ trợ học nghề miễn phí, Lan đã chuyển đổi kỹ năng và có việc làm mới tại doanh nghiệp công nghệ!</p>
            </div>
            <div class="timeline-card-img">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Mercedes-Benz-Vietnam_factory_workers_management.jpg" alt="Lan phục hồi và có việc làm mới tại doanh nghiệp ở Việt Nam" />
            </div>
          `;
        }
      });
    }
  });
})();
