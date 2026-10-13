/**
 * AN SINH 360 - VIỆT NAM | BENEFICIARY GROUPS INTERACTION SCRIPT
 */

(function () {
  'use strict';

  const GROUPS_DATA = {
    'elderly': {
      emoji: '👴',
      name: 'Người Cao Tuổi',
      tag: 'Tuổi Vàng An Nhiên',
      img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Old_Vietnamese_Woman.jpg',
      title: 'Chính Sách Chăm Sóc Người Cao Tuổi Việt Nam',
      benefits: [
        'Trợ cấp xã hội hằng tháng: Theo Nghị định 76/2024/NĐ-CP (áp dụng từ 1/7/2024), chuẩn trợ cấp tăng lên 500.000đ/tháng cho người từ đủ 80 tuổi không có lương hưu.',
        'Cấp thẻ BHYT miễn phí 100% kinh phí khám chữa bệnh suốt đời.',
        'Tổ chức chúc thọ, mừng thọ định kỳ và ưu tiên khám chữa bệnh không phải xếp hàng chờ.',
        'Hệ thống trạm y tế cơ sở theo dõi sức khỏe định kỳ tại gia đình.'
      ],
      quote: 'Kính lão đắc thọ - Chăm lo người cao tuổi là truyền thống đạo lý nhân văn sâu sắc của dân tộc Việt Nam.',
      sourceUrl: 'https://vanban.chinhphu.vn/?pageid=27160&docid=210541',
      sourceText: 'Văn bản Nghị định 76/2024/NĐ-CP (Cổng TTĐT Chính phủ) ↗'
    },
    'disabled': {
      emoji: '♿',
      name: 'Người Khuyết Tật',
      tag: 'Hòa Nhập Toàn Diện',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/USAID_assists_persons_with_disabilities_in_Vietnam_%285070814699%29.jpg',
      title: 'Chính Sách Cho Người Khuyết Tật & Yếu Thế',
      benefits: [
        'Trợ cấp bảo trợ xã hội hàng tháng theo mức độ khuyết tật nặng và đặc biệt nặng.',
        'Cấp thẻ BHYT miễn phí, hỗ trợ phẫu thuật chỉnh hình và phục hồi chức năng.',
        'Vay vốn ưu đãi 0% từ Ngân hàng Chính sách Xã hội để học nghề, mở cơ sở sản xuất kinh doanh.',
        'Doanh nghiệp tiếp nhận người khuyết tật được miễn giảm thuế và hỗ trợ cải tạo nơi làm việc.'
      ],
      quote: 'Không ai bị bỏ lại phía sau - Tạo sinh kế hòa nhập bình đẳng cho người yếu thế.',
      sourceUrl: 'https://molisa.gov.vn',
      sourceText: 'Chính sách Trợ cấp & Bảo trợ xã hội (Bộ LĐ-TB&XH) ↗'
    },
    'children': {
      emoji: '👶',
      name: 'Trẻ Em Dưới 6 Tuổi',
      tag: 'Mầm Non Đất Nước',
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Schoolchildren_Nam_Yen_Quang_Nam.jpg',
      title: 'Chính Sách Bảo Vệ Quyền Trẻ Em',
      benefits: [
        '100% trẻ em dưới 6 tuổi được Nhà nước cấp thẻ BHYT hoàn toàn miễn phí.',
        'Tiêm chủng mở rộng miễn phí phòng ngừa hơn 10 bệnh truyền nhiễm nguy hiểm.',
        'Phổ cập giáo dục mầm non 5 tuổi và miễn học phí cấp tiểu học toàn quốc.',
        'Chương trình sữa học đường và dinh dưỡng học đường cho học sinh vùng khó khăn.'
      ],
      quote: 'Trẻ em hôm nay, thế giới ngày mai - Đầu tư cho trẻ em là đầu tư cho tương lai đất nước.',
      sourceUrl: 'https://moh.gov.vn',
      sourceText: 'Chính sách BHYT miễn phí cho trẻ dưới 6 tuổi (Bộ Y tế) ↗'
    },
    'farmer': {
      emoji: '👨‍🌾',
      name: 'Nông Dân & Ngư Dân',
      tag: 'Bệ Đỡ Tam Nông',
      img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Rice_Farmer_in_Hoi_An%2C_Vietnam.jpg',
      title: 'An Sinh Nông Nghiệp, Nông Dân, Nông Thôn',
      benefits: [
        'Nhà nước hỗ trợ 30% - 70% mức đóng BHYT hộ gia đình làm nông - lâm - ngư nghiệp có mức sống trung bình.',
        'Chính sách hỗ trợ tiền đóng BHXH tự nguyện từ 10% đến 30% đối với hộ nghèo, cận nghèo.',
        'Bảo hiểm nông nghiệp hỗ trợ bồi thường thiệt hại thiên tai, dịch bệnh cho cây trồng vật nuôi.',
        'Tín dụng chính sách phục vụ sản xuất xóa đói giảm nghèo bền vững.'
      ],
      quote: 'Nông nghiệp là trụ đỡ nền kinh tế - Giữ vững tấm lưới an sinh che chở người sản xuất.',
      sourceUrl: 'https://baohiemxahoi.gov.vn',
      sourceText: 'Chính sách BHYT & BHXH tự nguyện (BHXH Việt Nam) ↗'
    },
    'worker': {
      emoji: '👩‍💼',
      name: 'Người Lao Động',
      tag: 'Lực Lượng Nòng Cốt',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Mercedes-Benz-Vietnam_factory_workers_management.jpg',
      title: 'Hệ Thống BHXH 5 Chế Độ Bắt Buộc',
      benefits: [
        'Chế độ ốm đau: Nhận 75% mức tiền lương đóng BHXH khi phải nghỉ điều trị bệnh.',
        'Chế độ thai sản: Nghỉ 6 tháng trọn vẹn hưởng 100% lương bình quân đóng BHXH.',
        'Bảo hiểm tai nạn lao động & bệnh nghề nghiệp: Điều trị và chi trả trợ cấp thương tật.',
        'Chế độ hưu trí và tử tuất: Đảm bảo độc lập tài chính khi hết tuổi lao động.'
      ],
      quote: 'Lao động được bảo hộ an sinh là nền tảng của nền kinh tế thị trường định hướng XHCN.',
      sourceUrl: 'https://baohiemxahoi.gov.vn',
      sourceText: 'Quy định 5 chế độ BHXH bắt buộc (BHXH Việt Nam) ↗'
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.people-avatar-card');
    const modalEmoji = document.getElementById('modal-emoji');
    const modalTag = document.getElementById('modal-tag');
    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalBenefits = document.getElementById('modal-benefits');
    const modalQuote = document.getElementById('modal-quote');
    const modalSourceBtn = document.getElementById('modal-source-btn');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const data = GROUPS_DATA[id];
        if (!data) return;

        if (modalEmoji) modalEmoji.textContent = data.emoji;
        if (modalTag) modalTag.textContent = data.tag;
        if (modalName) modalName.textContent = data.name;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalImg) {
          modalImg.src = data.img;
          modalImg.alt = data.name;
        }

        if (modalBenefits) {
          modalBenefits.innerHTML = data.benefits
            .map(b => `
              <div style="display: flex; gap: 10px; align-items: flex-start; padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.05); margin-bottom: 8px;">
                <span style="color: var(--accent-emerald); font-weight: 900; line-height: 1.2;">✓</span>
                <span style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.45;">${b}</span>
              </div>
            `)
            .join('');
        }

        if (modalQuote) modalQuote.textContent = `"${data.quote}"`;

        if (modalSourceBtn) {
          modalSourceBtn.href = data.sourceUrl || 'sources.html';
          modalSourceBtn.textContent = data.sourceText || 'Xem văn bản chính sách chính thức ↗';
        }

        if (typeof window.openModal === 'function') {
          window.openModal('people-modal');
        }
      });
    });
  });
})();
