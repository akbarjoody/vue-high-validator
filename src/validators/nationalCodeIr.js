import { localeMessage } from "../locale/index.js";

export default {
  message: localeMessage("national_code_ir"),
  validate: (value) => {
    if (value == null || value == "") {
      return false;
    }

    let code = String(value);
    const length = code.length;

    if (length < 8 || parseInt(code, 10) == 0) {
      return false;
    }

    code = ("0000" + code).substr(length + 4 - 10);

    if (parseInt(code.substr(3, 6), 10) == 0) {
      return false;
    }

    const checkDigit = parseInt(code.substr(9, 1), 10);
    let sum = 0;

    for (let i = 0; i < 9; i++) {
      sum += parseInt(code.substr(i, 1), 10) * (10 - i);
    }

    sum = sum % 11;
    return (sum < 2 && checkDigit == sum) || (sum >= 2 && checkDigit == 11 - sum);
  },
};
