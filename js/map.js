/**
 * AN SINH 360 - VIỆT NAM | MAP INTERACTION & OFFICIAL 2024 TIMELINE SCRIPT
 * Dữ liệu nguồn chính thức từ Bảo hiểm Xã hội Việt Nam và Cục Thống kê (Tổng cục Thống kê)
 */

(function () {
  'use strict';

  const YEARLY_DATA = {
    '2015': {
      scope: 'Số liệu toàn quốc năm 2015 (Thời kỳ 63 tỉnh/thành cũ)',
      bhyt: '70,5 triệu',
      bhytSub: 'Tỷ lệ bao phủ: khoảng 76,5% dân số',
      bhxh: '12,3 triệu',
      bhxhSub: 'Khoảng 23,8% lực lượng lao động',
      bhtn: '10,3 triệu',
      bhtnSub: 'Giai đoạn đầu mở rộng chính sách BHTN',
      thatnghiep: '2,33%',
      thatnghiepSub: 'Trong độ tuổi lao động (Cục Thống kê)',
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Schoolchildren_Nam_Yen_Quang_Nam.jpg',
      caption: 'Năm 2015: Bắt đầu lộ trình BHYT toàn dân theo Luật sửa đổi, ngân sách hỗ trợ 100% người nghèo & trẻ em dưới 6 tuổi.'
    },
    '2018': {
      scope: 'Số liệu toàn quốc năm 2018 (Thời kỳ 63 tỉnh/thành cũ)',
      bhyt: '83,5 triệu',
      bhytSub: 'Tỷ lệ bao phủ: khoảng 87,7% dân số',
      bhxh: '14,7 triệu',
      bhxhSub: 'Khoảng 30,4% lực lượng lao động',
      bhtn: '12,6 triệu',
      bhtnSub: 'Mở rộng diện tham gia trong doanh nghiệp',
      thatnghiep: '2,21%',
      thatnghiepSub: 'Thị trường việc làm khởi sắc',
      img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Rice_Farmer_in_Hoi_An%2C_Vietnam.jpg',
      caption: 'Năm 2018: Ban hành Nghị quyết số 28-NQ/TW về cải cách chính sách BHXH, tạo bước ngoặt phát triển BHXH tự nguyện cho nông dân & lao động tự do.'
    },
    '2021': {
      scope: 'Số liệu toàn quốc năm 2021 (Thời kỳ 63 tỉnh/thành cũ)',
      bhyt: '88,8 triệu',
      bhytSub: 'Tỷ lệ bao phủ: khoảng 91,01% dân số',
      bhxh: '16,5 triệu',
      bhxhSub: 'Khoảng 36,5% lực lượng lao động',
      bhtn: '13,4 triệu',
      bhtnSub: 'Chi trả trợ cấp khẩn cấp đại dịch',
      thatnghiep: '3,22%',
      thatnghiepSub: 'Ảnh hưởng bởi các đợt giãn cách Covid-19',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Mercedes-Benz-Vietnam_factory_workers_management.jpg',
      caption: 'Năm 2021: Đỉnh dịch Covid-19, các gói an sinh xã hội hàng chục nghìn tỷ đồng từ Quỹ BHTN được giải ngân trực tiếp đến hàng triệu người lao động.'
    },
    '2024': {
      scope: 'Số liệu toàn quốc năm 2024 (Nguồn: BHXH Việt Nam & Cục Thống kê)',
      bhyt: '95,523 triệu',
      bhytSub: 'Tỷ lệ bao phủ: khoảng 94,2% dân số',
      bhxh: '20,11 triệu',
      bhxhSub: 'Khoảng 42,71% lực lượng lao động trong độ tuổi',
      bhtn: '16,093 triệu',
      bhtnSub: 'Khoảng 34,18% lực lượng lao động trong độ tuổi',
      thatnghiep: '2,24%',
      thatnghiepSub: 'Lực lượng LĐ: khoảng 53,0 triệu người',
      img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Old_Vietnamese_Woman.jpg',
      caption: 'Năm 2024: Toàn quốc ghi nhận 95,523 triệu người tham gia BHYT (đạt 94,2% dân số) và 20,11 triệu người tham gia BHXH (Bảo hiểm Xã hội Việt Nam).'
    }
  };

  const PROVINCE_INFO = {
    'hanoi': 'Hà Nội - Thủ đô: Đô thị hạt nhân của Vùng Thủ đô trong hệ thống 34 đơn vị hành chính mới. Đạt tỷ lệ bao phủ BHYT cao, dẫn đầu trong chuyển đổi số an sinh xã hội và thanh toán qua CCCD gắn chip.',
    'hcm': 'TP. Hồ Chí Minh: Thành phố đầu tàu kinh tế phía Nam, đóng góp tỷ trọng lớn nhất vào Quỹ BHXH và BHTN quốc gia, mạng lưới an sinh đô thị bao phủ hàng triệu lao động nhập cư.',
    'danang': 'Đà Nẵng: Thành phố trực thuộc Trung ương trọng điểm miền Trung, nổi tiếng với các chương trình an sinh nhân văn "3 có, 4 an", bảo đảm an toàn xã hội cho mọi người dân.',
    'haiphong': 'Hải Phòng: Đô thị cảng biển công nghiệp lớn, áp dụng chính sách hỗ trợ 100% học phí cho học sinh và tỷ lệ bao phủ BHYT công nhân viên chức đạt mức cao.',
    'quangninh': 'Quảng Ninh: Đô thị phát triển năng động, đi đầu với mức chuẩn trợ giúp xã hội cao hơn chuẩn chung của cả nước theo các nghị quyết của HĐND tỉnh.',
    'cantho': 'Cần Thơ: Trung tâm kinh tế - y tế của vùng Đồng bằng sông Cửu Long, mạng lưới y tế cơ sở chăm sóc sức khỏe người dân vùng sông nước phát triển toàn diện.',
    'nghean': 'Nghệ An: Địa bàn rộng lớn, tích cực tuyên truyền và vận động người dân nông thôn, ngư dân tham gia BHXH tự nguyện và BHYT hộ gia đình.',
    'daklak': 'Đắk Lắk: Trung tâm vùng Tây Nguyên, ưu tiên các chính sách an sinh hỗ trợ đồng bào dân tộc thiểu số, cấp thẻ BHYT miễn phí cho người nghèo và cận nghèo.',
    'khanhhoa': 'Khánh Hòa (Quần đảo Trường Sa): Quần đảo Trường Sa thuộc tỉnh Khánh Hòa được bảo đảm chăm sóc y tế với hệ thống bệnh xá kết nối Telemedicine hiện đại với đất liền.',
    'hoangsa': 'Quần đảo Hoàng Sa (TP. Đà Nẵng): Vùng biển đảo thiêng liêng thuộc chủ quyền Việt Nam, cán bộ và chiến sĩ hải quân làm nhiệm vụ bảo vệ biển đảo được hưởng đầy đủ chế độ đãi ngộ an sinh.',
    'truongsa': 'Quần đảo Trường Sa (T. Khánh Hòa): Huyện đảo tiền tiêu của Tổ quốc, quân và dân trên các điểm đảo được chăm lo y tế, giáo dục và chế độ bảo trợ xã hội vững chắc.'
  };

  function updateTimelineView(year) {
    const data = YEARLY_DATA[year];
    if (!data) return;

    const elScope = document.getElementById('stat-scope-badge');
    if (elScope) elScope.textContent = data.scope;

    const elBhytNum = document.getElementById('stat-bhyt-num');
    const elBhytSub = document.getElementById('stat-bhyt-sub');
    if (elBhytNum) elBhytNum.textContent = data.bhyt;
    if (elBhytSub) elBhytSub.textContent = data.bhytSub;

    const elBhxhNum = document.getElementById('stat-bhxh-num');
    const elBhxhSub = document.getElementById('stat-bhxh-sub');
    if (elBhxhNum) elBhxhNum.textContent = data.bhxh;
    if (elBhxhSub) elBhxhSub.textContent = data.bhxhSub;

    const elBhtnNum = document.getElementById('stat-bhtn-num');
    const elBhtnSub = document.getElementById('stat-bhtn-sub');
    if (elBhtnNum) elBhtnNum.textContent = data.bhtn;
    if (elBhtnSub) elBhtnSub.textContent = data.bhtnSub;

    const elThatnghiepNum = document.getElementById('stat-thatnghiep-num');
    const elThatnghiepSub = document.getElementById('stat-thatnghiep-sub');
    if (elThatnghiepNum) elThatnghiepNum.textContent = data.thatnghiep;
    if (elThatnghiepSub) elThatnghiepSub.textContent = data.thatnghiepSub;

    const heroImg = document.getElementById('stat-hero-img');
    const heroCaption = document.getElementById('stat-hero-caption');
    if (heroImg) heroImg.src = data.img;
    if (heroCaption) heroCaption.textContent = data.caption;

    document.querySelectorAll('.timeline-year-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-year') === year);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const pins = document.querySelectorAll('.map-pin');
    const provinceNote = document.getElementById('province-note');

    pins.forEach(pin => {
      const pId = pin.getAttribute('data-id');
      const pName = pin.getAttribute('data-name');

      pin.addEventListener('click', () => {
        pins.forEach(p => p.classList.remove('active'));
        pin.classList.add('active');

        if (provinceNote) {
          provinceNote.innerHTML = `<strong>${pName}:</strong> ${PROVINCE_INFO[pId] || 'Đang triển khai các chính sách an sinh toàn diện theo hệ thống 34 đơn vị hành chính mới.'}`;
        }

        // Tự động load số liệu năm 2024
        updateTimelineView('2024');
      });
    });

    document.querySelectorAll('.timeline-year-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const year = btn.getAttribute('data-year');
        updateTimelineView(year);
      });
    });

    // Mặc định hiển thị dữ liệu năm 2024
    updateTimelineView('2024');
  });
})();
