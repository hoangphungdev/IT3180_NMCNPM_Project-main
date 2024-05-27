export const checkValidatorPassoword = password => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

export const checkValidatorConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

export const checkValidatorEmail = email => {
  if (email.length === 0) {
    return false;
  }
  const regex = /\S+@\S+\.\S+/;
  return regex.test (email);
};

export const checkValidatorUserName = userName => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (userName.length < 6 || userName.length > 20) {
    return false;
  } else if (!regex.test (userName)) {
    return false;
  }
  return true;
};

export const checkValidatorPassword = password => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

export const checkOldPassword = (oldPassword, password) => {
  if (oldPassword !== password) {
    return false;
  }
  return true;
};

/**
 * 
 * @param {*} value value need check
 * @returns True if value is blank
 */
export const checkBlank = value => {
  return !(!!value.trim () || !value.startsWith (' '));
};

export const isEmpty = value => {
  return value.length === 0;
};

export const checkValidatorAmount = amount => {
  if (amount.length === 0) {
    return false;
  }
  const regex = /^[1-9][0-9]*$/;
  return regex.test (amount);
};

export const checkValidatorPhone = phone => {
  if (phone.length === 0) {
    return false;
  }
  const regex = /^0[0-9]{9}$/;
  return regex.test (phone);
};

import moment from 'moment';

export const checkTime = (timeStart, timeEnd) => {
  // Tạo đối tượng moment với định dạng 'DD/MM/YYYY'
  const momentDate1 = moment (timeStart, 'DD/MM/YYYY');
  const momentDate2 = moment (timeEnd, 'DD/MM/YYYY');

  // So sánh thời gian
  if (momentDate1.isBefore (momentDate2)) {
    return true; // date1 sớm hơn date2
  } else if (momentDate1.isAfter (momentDate2)) {
    return false; // date1 muộn hơn date2
  } else {
    return false; // date1 bằng date2
  }
};

export const checkValidatorTime = time => {
  if (time.length === 0) {
    return false;
  }

  // Biểu thức chính quy cho định dạng ngày tháng "DD/MM/YYYY"
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!regex.test (time)) {
    return false; // Không đúng định dạng chung
  }

  // Tách ngày, tháng, năm từ chuỗi
  const [day, month, year] = time.split ('/').map (Number);

  // Kiểm tra số ngày của mỗi tháng
  const daysInMonth = new Date (year, month, 0).getDate ();

  // Kiểm tra xem ngày và tháng có hợp lệ không
  return day <= daysInMonth;
};

export const checkValidatorCCCD = cccdNumber => {
  const regex = /^[0-9]{12}$/;
  return regex.test(cccdNumber);
};

export const checkValidatorGender = gender =>  {
  return gender === "Nam" || gender === "Nữ";
}