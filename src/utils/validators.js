export const isValidEmail = (email = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidBangladeshPhone = (phone = "") =>
  /^(?:\+8801|01)[3-9]\d{8}$/.test(phone);

export const isRequired = (value) =>
  value !== null && value !== undefined && String(value).trim() !== "";