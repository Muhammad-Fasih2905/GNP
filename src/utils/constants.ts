export const pwd_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const email_regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const dob_regex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2}, \d{4}$/;

export const number_regex = /^\d+$/;
export const phoneNumberMinlength = 9;
export const phoneNumMinLenErrMsg = "minumum length should be 9";
export const phoneNumberMaxlength = 20;
export const phoneNumMaxLenErrMsg = 'exceeded max length';
export const OnlyNumbersAllowedErrMsg = 'Only numeric values are allowed';