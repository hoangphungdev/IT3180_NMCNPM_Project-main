const validatorMessage = {
  email: 'Email không hợp lệ, email hợp lệ phải bao gồm @ và tên miền\nVí dụ: example123@gmail.com',
  phone: 'Số điện thoại không hợp lệ, số điện thoại hợp lệ phải bắt đầu bằng số 0 và có đúng 10 chữ số\nVí dụ: 0123456789',
  blank: 'Không được để trống nội dung này hoặc bắt đầu bằng dấu cách',
  password: 'Mật khẩu phải có ít nhất 6 ký tự',
  confirmPassword: 'Mật khẩu không khớp',
  userName: 'Tên đăng nhập phải có ít nhất 6 ký tự, dài không quá 20 ký tự, không chứa ký tự đặc biệt, không bắt đầu và kết thúc bằng khoảng trắng',
  oldPassword: 'Mật khẩu cũ không đúng',
  amount: 'Giá trị phải lớn hơn 0\nBắt đầu bằng số 1-9\nKhông chứa ký tự đặc biệt',
  time: 'Thời gian phải là một ngày hợp lệ có định dạng dd/mm/yyyy. Ví dụ: 01/01/2021',
  ID_card_number: 'Số CCCD không hợp lệ, số CCCD phải có 12 chữ số',
  gender: 'Giới tính không hợp lệ, giới tính phải là Nam hoặc Nữ',
};

export default validatorMessage;
