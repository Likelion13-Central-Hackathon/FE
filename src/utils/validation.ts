// ----- Email 유효성 검사
export const checkEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ----- Password 유효성 검사
export type PasswordCheck = {
  lengthOK: boolean;
  hasDigit: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  criteriaCount: number; // 충족 개수
  isValid: boolean; // 최종 유효 여부
};

export const checkPassword = (password: string): PasswordCheck => {
  const lengthOK = password.length >= 8;
  const hasDigit = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const criteriaCount = [hasDigit, hasUpper, hasLower, hasSpecial].filter(
    Boolean
  ).length;
  const isValid = lengthOK && criteriaCount >= 2;
  return {
    lengthOK,
    hasDigit,
    hasUpper,
    hasLower,
    hasSpecial,
    criteriaCount,
    isValid,
  };
};
