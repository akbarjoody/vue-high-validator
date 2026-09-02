import { localeMessage } from "../locale/index.js";

const FORMULA_PATTERN = /^[^+\-\/^*].+[^+\-\/^*]$/;

export default {
  message: localeMessage("formula"),
  validate: (value) =>
    value == null || value === ""
      ? true
      : String(value).toLowerCase().match(FORMULA_PATTERN),
};
