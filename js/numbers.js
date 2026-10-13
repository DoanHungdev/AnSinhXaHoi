/**
 * AN SINH 360 - VIỆT NAM | DATA STORYTELLING & COUNT-UP SCRIPT
 * Target numbers verified from BHXH Vietnam official 2024 reports:
 * - BHYT: 95,523,000+ người (~94.2% dân số)
 * - BHXH: 20,110,000+ người (~42.71% lực lượng LĐ trong độ tuổi)
 */

(function () {
  'use strict';

  function animateCount(element, target, duration, suffix = '') {
    const startTime = performance.now();
    const startVal = 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (target - startVal) * easeProgress);

      element.textContent = current.toLocaleString('vi-VN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString('vi-VN') + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const counterBhyt = document.getElementById('count-bhyt');
    const counterBhxh = document.getElementById('count-bhxh');

    // Trigger counting with official 2024 data
    if (counterBhyt) {
      setTimeout(() => {
        animateCount(counterBhyt, 95523000, 2200, '+');
      }, 300);
    }

    if (counterBhxh) {
      setTimeout(() => {
        animateCount(counterBhxh, 20110000, 2200, '+');
      }, 700);
    }
  });
})();
