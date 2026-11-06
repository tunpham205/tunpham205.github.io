const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

const initialData = {
  taiKhoan: [
    { maTK: "TK01", tenDangNhap: "admin", matKhau: "123456", vaiTro: "QuanLy", maNV: "NV01" },
    { maTK: "TK02", tenDangNhap: "banhang", matKhau: "123456", vaiTro: "BanHang", maNV: "NV02" },
    { maTK: "TK03", tenDangNhap: "kho", matKhau: "123456", vaiTro: "Kho", maNV: "NV03" }
  ],
  nhanVien: [
    { maNV: "NV01", hoTen: "Nguyễn Văn Quản Lý", soDienThoai: "0901234567", chucVu: "Chủ cửa hàng" },
    { maNV: "NV02", hoTen: "Trần Thị Thu Ngân", soDienThoai: "0912345678", chucVu: "Nhân viên bán hàng" },
    { maNV: "NV03", hoTen: "Lê Văn Thủ Kho", soDienThoai: "0923456789", chucVu: "Nhân viên kho" }
  ],
  loaiSanPham: [
    { maLoai: "L01", tenLoai: "Mì ăn liền & Đồ khô", moTa: "Các loại thực phẩm ăn liền, bún, miến, phở" },
    { maLoai: "L02", tenLoai: "Nước giải khát & Sữa", moTa: "Nước ngọt có ga, nước khoáng, trà sữa đóng chai" },
    { maLoai: "L03", tenLoai: "Bánh kẹo & Snack", moTa: "Bánh quy, kẹo ngọt, khoai tây sấy" },
    { maLoai: "L04", tenLoai: "Gia vị & Hàng thiết yếu", moTa: "Mắm, muối, đường, dầu ăn" }
  ],
  sanPham: [
    { maSP: "SP001", tenSP: "Mì Hảo Hảo Tôm Chua Cay", maLoai: "L01", donViTinh: "Gói", giaNhap: 3500, giaBan: 5000, soLuongTon: 120, mucTonToiThieu: 20 },
    { maSP: "SP002", tenSP: "Nước Ngọt Coca Cola 330ml", maLoai: "L02", donViTinh: "Lon", giaNhap: 7500, giaBan: 10000, soLuongTon: 65, mucTonToiThieu: 15 },
    { maSP: "SP003", tenSP: "Bánh Quy Danisa 454g", maLoai: "L03", donViTinh: "Hộp", giaNhap: 85000, giaBan: 110000, soLuongTon: 8, mucTonToiThieu: 10 },
    { maSP: "SP004", tenSP: "Dầu Ăn Neptune Light 1L", maLoai: "L04", donViTinh: "Chai", giaNhap: 45000, giaBan: 56000, soLuongTon: 25, mucTonToiThieu: 10 },
    { maSP: "SP005", tenSP: "Nước Tương Nam Dương 500ml", maLoai: "L04", donViTinh: "Chai", giaNhap: 15000, giaBan: 21000, soLuongTon: 4, mucTonToiThieu: 10 }
  ],
  nhaCungCap: [
    { maNCC: "NCC01", tenNCC: "Công ty Cổ phần Acecook Việt Nam", soDienThoai: "02838154064", diaChi: "KCN Tân Bình, TP.HCM", email: "info@acecookvietnam.vn" },
    { maNCC: "NCC02", tenNCC: "Công ty Nước Giải Khát Coca-Cola", soDienThoai: "02838961000", diaChi: "Xa lộ Hà Nội, Thủ Đức", email: "contact@cocacola.vn" },
    { maNCC: "NCC03", tenNCC: "Công ty Phân Phối Tiêu Dùng Hà Nội", soDienThoai: "02439876543", diaChi: "Hoàng Mai, Hà Nội", email: "pptieudung@gmail.com" }
  ],
  khachHang: [
    { maKH: "KH001", hoTen: "Phạm Hải Đăng", soDienThoai: "0988112233", diaChi: "Quận 10, TP.HCM", diemTichLuy: 120 },
    { maKH: "KH002", hoTen: "Nguyễn Thu Trang", soDienThoai: "0977223344", diaChi: "Quận Cầu Giấy, Hà Nội", diemTichLuy: 85 }
  ],
  phieuNhap: [
    {
      maPN: "PN001",
      ngayNhap: "2026-11-01 09:30:00",
      maNCC: "NCC01",
      maNV: "NV03",
      tongTien: 700000,
      chiTiet: [
        { maSP: "SP001", soLuong: 200, donGiaNhap: 3500, thanhTien: 700000 }
      ]
    }
  ],
  hoaDon: [
    {
      maHD: "HD001",
      ngayBan: "2026-11-05 14:15:20",
      maNV: "NV02",
      maKH: "KH001",
      tongTien: 69000,
      giamGia: 0,
      thanhToanThucTe: 69000,
      chiTiet: [
        { maSP: "SP001", tenSP: "Mì Hảo Hảo Tôm Chua Cay", soLuong: 5, donGiaBan: 5000, thanhTien: 25000 },
        { maSP: "SP002", tenSP: "Nước Ngọt Coca Cola 330ml", soLuong: 2, donGiaBan: 10000, thanhTien: 20000 },
        { maSP: "SP003", tenSP: "Bánh Quy Danisa 454g", soLuong: 3, donGiaBan: 8000, thanhTien: 24000 }
      ]
    }
  ]
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return initialData;
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  readDb,
  writeDb
};
