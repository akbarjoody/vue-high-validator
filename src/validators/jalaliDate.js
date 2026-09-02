import { localeMessage } from "../locale/index.js";

const JALALI_DATE_PATTERN = /^\d{4}\/\d{2}\/\d{2}$/;

export default {
  message: localeMessage("jalali_date"),
  validate: (value) => {
    if (value == null) {
      return true;
    }
    if (!value) {
      return false;
    }
    return !!String(value).match(JALALI_DATE_PATTERN);
  },
};
