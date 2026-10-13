/**
 * AN SINH 360 - VIỆT NAM | BUDGET DECISION SIMULATOR & CRISIS SCRIPT
 * Comprehensive interactive economic decision simulator for GDKT&PL 12
 */

(function () {
  'use strict';

  let budgetAlloc = {
    yte: 25,
    vieclam: 20,
    giamngheo: 20,
    nguoigia: 20,
    treem: 15
  };

  let reserveAlloc = {
    yte: 15,
    giamngheo: 15
  };

  const PRESETS = {
    balanced: { yte: 20, vieclam: 20, giamngheo: 20, nguoigia: 20, treem: 20 },
    health: { yte: 35, vieclam: 15, giamngheo: 15, nguoigia: 15, treem: 20 },
    growth: { yte: 15, vieclam: 35, giamngheo: 25, nguoigia: 15, treem: 10 }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const sliders = {
      yte: document.getElementById('slider-yte'),
      vieclam: document.getElementById('slider-vieclam'),
      giamngheo: document.getElementById('slider-giamngheo'),
      nguoigia: document.getElementById('slider-nguoigia'),
      treem: document.getElementById('slider-treem')
    };

    const valDisplays = {
      yte: document.getElementById('val-yte'),
      vieclam: document.getElementById('val-vieclam'),
      giamngheo: document.getElementById('val-giamngheo'),
      nguoigia: document.getElementById('val-nguoigia'),
      treem: document.getElementById('val-treem')
    };

    const budgetTotalDisplay = document.getElementById('budget-total');
    const budgetStatusText = document.getElementById('budget-status-text');
    const autoBalanceBtn = document.getElementById('auto-balance-btn');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const startSimBtn = document.getElementById('start-sim-btn');
    const normalResultSec = document.getElementById('normal-result-section');
    const resultBadge = document.getElementById('result-badge');
    const resultTitle = document.getElementById('result-title');
    const resultDisasterAlert = document.getElementById('result-disaster-alert');
    const disasterResYte = document.getElementById('disaster-res-yte');
    const disasterResGiamngheo = document.getElementById('disaster-res-giamngheo');

    // Result value elements
    const valResultYte = document.getElementById('val-result-yte');
    const descResultYte = document.getElementById('desc-result-yte');
    const valResultVieclam = document.getElementById('val-result-vieclam');
    const descResultVieclam = document.getElementById('desc-result-vieclam');
    const valResultGiamngheo = document.getElementById('val-result-giamngheo');
    const descResultGiamngheo = document.getElementById('desc-result-giamngheo');
    const valResultNguoigia = document.getElementById('val-result-nguoigia');
    const descResultNguoigia = document.getElementById('desc-result-nguoigia');
    const valResultTreem = document.getElementById('val-result-treem');
    const descResultTreem = document.getElementById('desc-result-treem');
    const resCommentary = document.getElementById('res-commentary');

    // Disaster modal elements
    const disasterModal = document.getElementById('disaster-modal');
    const resYte = document.getElementById('res-slider-yte');
    const resGiamngheo = document.getElementById('res-slider-giamngheo');
    const resYteVal = document.getElementById('res-val-yte');
    const resGiamngheoVal = document.getElementById('res-val-giamngheo');
    const resTotal = document.getElementById('res-total');
    const confirmResBtn = document.getElementById('confirm-reserve-btn');

    function getTotal() {
      return budgetAlloc.yte + budgetAlloc.vieclam + budgetAlloc.giamngheo + budgetAlloc.nguoigia + budgetAlloc.treem;
    }

    function syncInputs() {
      Object.keys(budgetAlloc).forEach(key => {
        if (sliders[key]) sliders[key].value = budgetAlloc[key];
        if (valDisplays[key]) valDisplays[key].textContent = budgetAlloc[key];
      });
    }

    function updateBudgetUI() {
      const total = getTotal();
      if (budgetTotalDisplay) {
        budgetTotalDisplay.textContent = `${total} / 100`;
      }

      if (budgetStatusText) {
        if (total === 100) {
          budgetTotalDisplay.style.color = 'var(--color-success)';
          budgetStatusText.textContent = '✅ Đã phân bổ tối ưu 100 / 100 điểm (Sẵn sàng mô phỏng)';
          budgetStatusText.style.color = 'var(--color-success)';
        } else if (total > 100) {
          budgetTotalDisplay.style.color = 'var(--color-accent)';
          budgetStatusText.textContent = `⚡ Phân bổ ${total} / 100 điểm (Huy động thêm ${total - 100} điểm nguồn lực xã hội hóa - Sẵn sàng mô phỏng)`;
          budgetStatusText.style.color = 'var(--color-accent)';
        } else {
          budgetTotalDisplay.style.color = 'var(--color-warning)';
          budgetStatusText.textContent = `ℹ️ Đã dùng ${total} / 100 điểm (Còn dư ${100 - total} điểm quỹ dự trữ an sinh - Sẵn sàng mô phỏng)`;
          budgetStatusText.style.color = 'var(--color-warning)';
        }
      }
    }

    // Auto balance to exactly 100 points
    function autoBalance() {
      const current = getTotal();
      if (current === 0) {
        budgetAlloc = { yte: 20, vieclam: 20, giamngheo: 20, nguoigia: 20, treem: 20 };
      } else {
        const factor = 100 / current;
        const keys = Object.keys(budgetAlloc);
        let sum = 0;
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i];
          budgetAlloc[k] = Math.max(5, Math.min(45, Math.round(budgetAlloc[k] * factor)));
          sum += budgetAlloc[k];
        }
        // Last item absorbs difference to ensure sum is exactly 100
        budgetAlloc[keys[keys.length - 1]] = Math.max(0, 100 - sum);
      }
      syncInputs();
      updateBudgetUI();
      if (typeof window.playPopSound === 'function') window.playPopSound();
    }

    if (autoBalanceBtn) {
      autoBalanceBtn.addEventListener('click', autoBalance);
    }

    // Preset buttons
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.getAttribute('data-preset');
        if (PRESETS[presetKey]) {
          budgetAlloc = { ...PRESETS[presetKey] };
          syncInputs();
          updateBudgetUI();
          if (typeof window.playPopSound === 'function') window.playPopSound();
        }
      });
    });

    // Slider inputs
    Object.keys(sliders).forEach(key => {
      const el = sliders[key];
      if (el) {
        el.addEventListener('input', (e) => {
          budgetAlloc[key] = Number(e.target.value);
          if (valDisplays[key]) valDisplays[key].textContent = budgetAlloc[key];
          updateBudgetUI();
        });
      }
    });

    // Dynamic result calculation based on actual allocation
    function renderSimulationResults(isDisasterRecovered = false) {
      let effYte = budgetAlloc.yte;
      let effVieclam = budgetAlloc.vieclam;
      let effGiamngheo = budgetAlloc.giamngheo;
      let effNguoigia = budgetAlloc.nguoigia;
      let effTreem = budgetAlloc.treem;

      if (isDisasterRecovered) {
        // In disaster, initial yte & giamngheo were wiped out and saved by emergency reserve
        effYte = reserveAlloc.yte;
        effGiamngheo = reserveAlloc.giamngheo;

        if (resultBadge) {
          resultBadge.textContent = 'Phục Hồi Sau Siêu Bão Thiên Tai';
          resultBadge.style.background = 'rgba(239, 68, 68, 0.2)';
          resultBadge.style.color = '#f87171';
          resultBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        }
        if (resultTitle) {
          resultTitle.textContent = 'KẾT QUẢ: HỆ THỐNG AN SINH ĐÃ VƯỢT QUA SIÊU BÃO!';
        }
        if (resultDisasterAlert) {
          resultDisasterAlert.style.display = 'block';
          if (disasterResYte) disasterResYte.textContent = reserveAlloc.yte;
          if (disasterResGiamngheo) disasterResGiamngheo.textContent = reserveAlloc.giamngheo;
        }
      } else {
        if (resultBadge) {
          resultBadge.textContent = 'Kết Quả Vận Hành 1 Năm Bình Yên';
          resultBadge.style.background = 'rgba(16, 185, 129, 0.15)';
          resultBadge.style.color = 'var(--accent-emerald)';
          resultBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        }
        if (resultTitle) {
          resultTitle.textContent = 'ĐÁNH GIÁ CHỈ SỐ PHÁT TRIỂN XÃ HỘI';
        }
        if (resultDisasterAlert) {
          resultDisasterAlert.style.display = 'none';
        }
      }

      // 1. Y tế toàn dân
      const yteRate = Math.min(99.5, Math.max(62, 70 + effYte * 0.95)).toFixed(1);
      const isYteGood = effYte >= 18;
      if (valResultYte) {
        valResultYte.textContent = (isYteGood ? '↑ ' : '↓ ') + yteRate + '%';
        valResultYte.className = isYteGood ? 'arrow-up' : 'arrow-down';
      }
      if (descResultYte) {
        descResultYte.textContent = isYteGood ? 'BHYT bao phủ diện rộng' : 'Cảnh báo: Y tế tuyến cơ sở quá tải';
      }

      // 2. Thất nghiệp (Việc làm nhiều -> Thất nghiệp giảm)
      const unempRate = Math.max(1.5, Math.min(6.2, 4.8 - effVieclam * 0.13)).toFixed(1);
      const isVieclamGood = effVieclam >= 18;
      if (valResultVieclam) {
        valResultVieclam.textContent = (isVieclamGood ? '↓ ' : '↑ ') + unempRate + '%';
        valResultVieclam.className = isVieclamGood ? 'arrow-down' : 'arrow-up';
      }
      if (descResultVieclam) {
        descResultVieclam.textContent = isVieclamGood ? 'Thị trường việc làm khởi sắc' : 'Cảnh báo: Lao động mất việc tăng';
      }

      // 3. Giảm nghèo bền vững
      const povertyRate = Math.min(98.5, Math.max(50, 64 + effGiamngheo * 1.35)).toFixed(1);
      const isGiamngheoGood = effGiamngheo >= 18;
      if (valResultGiamngheo) {
        valResultGiamngheo.textContent = (isGiamngheoGood ? '↑ ' : '↓ ') + povertyRate + '%';
        valResultGiamngheo.className = isGiamngheoGood ? 'arrow-up' : 'arrow-down';
      }
      if (descResultGiamngheo) {
        descResultGiamngheo.textContent = isGiamngheoGood ? 'Sinh kế hộ nghèo vững vàng' : 'Cảnh báo: Nguy cơ tái nghèo cao';
      }

      // 4. Người cao tuổi
      const elderlyRate = Math.min(99, Math.max(55, 62 + effNguoigia * 1.4)).toFixed(1);
      const isNguoigiaGood = effNguoigia >= 18;
      if (valResultNguoigia) {
        valResultNguoigia.textContent = (isNguoigiaGood ? '↑ ' : '↓ ') + elderlyRate + '%';
        valResultNguoigia.className = isNguoigiaGood ? 'arrow-up' : 'arrow-down';
      }
      if (descResultNguoigia) {
        descResultNguoigia.textContent = isNguoigiaGood ? 'Trợ cấp 500k & chăm sóc định kỳ' : 'Cảnh báo: Thiếu kinh phí dưỡng lão';
      }

      // 5. Trẻ em
      const childRate = Math.min(99.9, Math.max(60, 68 + effTreem * 1.8)).toFixed(1);
      const isTreemGood = effTreem >= 15;
      if (valResultTreem) {
        valResultTreem.textContent = (isTreemGood ? '↑ ' : '↓ ') + childRate + '%';
        valResultTreem.className = isTreemGood ? 'arrow-up' : 'arrow-down';
      }
      if (descResultTreem) {
        descResultTreem.textContent = isTreemGood ? '100% trẻ dưới 6 tuổi tiêm chủng' : 'Cảnh báo: Thiếu hụt sữa học đường';
      }

      // Dynamic commentary
      if (resCommentary) {
        if (isDisasterRecovered) {
          resCommentary.innerHTML = `<strong>Đúc kết bài học (GDKT&PL 12):</strong> Khi thiên tai bất ngờ ập đến, sự linh hoạt của Nhà nước trong việc kích hoạt Quỹ Dự Phòng Khẩn Cấp (+${reserveAlloc.yte} điểm Y tế, +${reserveAlloc.giamngheo} điểm Giảm nghèo) đã giúp phục hồi ngay các trạm y tế và bảo vệ sinh kế người dân, khẳng định bản chất nhân văn ưu việt của chế độ ta!`;
        } else {
          const nameMap = { yte: 'Y tế Toàn dân', vieclam: 'Hỗ trợ Việc làm', giamngheo: 'Giảm nghèo Bền vững', nguoigia: 'Chăm sóc Người cao tuổi', treem: 'Bảo trợ Trẻ em khó khăn' };
          let highest = 'yte';
          let lowest = 'yte';
          Object.keys(budgetAlloc).forEach(k => {
            if (budgetAlloc[k] > budgetAlloc[highest]) highest = k;
            if (budgetAlloc[k] < budgetAlloc[lowest]) lowest = k;
          });

          const totalAlloc = getTotal();
          let budgetNote = '';
          if (totalAlloc < 100) {
            budgetNote = ` Bạn đang phân bổ <strong>${totalAlloc}/100 điểm</strong> (còn dư <strong>${100 - totalAlloc} điểm</strong> lưu giữ trong Quỹ dự phòng an sinh quốc gia).`;
          } else if (totalAlloc > 100) {
            budgetNote = ` Bạn đã huy động ngân sách và nguồn lực xã hội hóa đạt <strong>${totalAlloc}/100 điểm</strong> (+${totalAlloc - 100} điểm mở rộng).`;
          } else {
            budgetNote = ` Bạn đã phân bổ trọn vẹn và cân đối <strong>100/100 điểm</strong> ngân sách an sinh.`;
          }

          resCommentary.innerHTML = `<strong>Đúc kết bài học (GDKT&PL 12):</strong>${budgetNote} Trọng tâm ưu tiên cao nhất là <strong>${nameMap[highest]}</strong> (${budgetAlloc[highest]} điểm), giúp các chỉ số liên quan đạt hiệu quả tích cực. Trong điều hành kinh tế - xã hội vĩ mô, Nhà nước luôn kết hợp hài hòa cả <strong>${nameMap[lowest]}</strong> (${budgetAlloc[lowest]} điểm) để bảo đảm quyền an sinh bao trùm toàn dân, không ai bị bỏ lại phía sau!`;
        }
      }
    }

    // Start Simulation Button (Không chặn alert - mô phỏng trực tiếp với mọi số điểm)
    if (startSimBtn) {
      startSimBtn.addEventListener('click', () => {
        const total = getTotal();
        if (total === 0) {
          // Nếu tất cả các thanh đều ở mức 0, tự động đặt mức cân bằng tối thiểu để mô phỏng có ý nghĩa
          budgetAlloc = { yte: 20, vieclam: 20, giamngheo: 20, nguoigia: 20, treem: 20 };
          syncInputs();
          updateBudgetUI();
        }

        startSimBtn.disabled = true;
        startSimBtn.innerHTML = '⏳ Đang vận hành mô phỏng kinh tế vĩ mô...';

        setTimeout(() => {
          startSimBtn.disabled = false;
          startSimBtn.innerHTML = '⚡ Bắt Đầu Mô Phỏng Lại';

          // 30% Disaster probability
          const isDisaster = Math.random() < 0.3;

          if (isDisaster) {
            if (typeof window.playAlarmSound === 'function') {
              window.playAlarmSound();
            }
            if (disasterModal) {
              disasterModal.classList.add('open');
              document.body.style.overflow = 'hidden';
            }
            if (normalResultSec) normalResultSec.style.display = 'none';
          } else {
            if (typeof window.playSuccessSound === 'function') {
              window.playSuccessSound();
            }
            renderSimulationResults(false);
            if (normalResultSec) {
              normalResultSec.style.display = 'block';
              normalResultSec.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 800);
      });
    }

    // Disaster Emergency Reserve logic (total 30 points)
    function updateReserve(changedKey) {
      if (changedKey === 'yte') {
        reserveAlloc.yte = Number(resYte.value);
        reserveAlloc.giamngheo = 30 - reserveAlloc.yte;
        if (resGiamngheo) resGiamngheo.value = reserveAlloc.giamngheo;
      } else {
        reserveAlloc.giamngheo = Number(resGiamngheo.value);
        reserveAlloc.yte = 30 - reserveAlloc.giamngheo;
        if (resYte) resYte.value = reserveAlloc.yte;
      }

      if (resYteVal) resYteVal.textContent = reserveAlloc.yte;
      if (resGiamngheoVal) resGiamngheoVal.textContent = reserveAlloc.giamngheo;
      if (resTotal) resTotal.textContent = '30 / 30 điểm';
    }

    if (resYte) {
      resYte.addEventListener('input', () => updateReserve('yte'));
    }
    if (resGiamngheo) {
      resGiamngheo.addEventListener('input', () => updateReserve('giamngheo'));
    }

    if (confirmResBtn) {
      confirmResBtn.addEventListener('click', () => {
        if (typeof window.playSuccessSound === 'function') {
          window.playSuccessSound();
        }
        if (disasterModal) {
          disasterModal.classList.remove('open');
          document.body.style.overflow = '';
        }

        renderSimulationResults(true);
        if (normalResultSec) {
          normalResultSec.style.display = 'block';
          normalResultSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Initialize UI
    syncInputs();
    updateBudgetUI();
  });
})();
