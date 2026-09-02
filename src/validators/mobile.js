import { localeMessage } from "../locale/index.js";

const IRAN_MOBILE_PATTERN = /^(\+98|0)?9\d{9}$/;

export default {
  message: localeMessage("mobile"),
  validate: (value) =>
    value == null || value === "" ? true : IRAN_MOBILE_PATTERN.test(value),
};
