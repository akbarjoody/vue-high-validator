import { localeMessage } from "../locale/index.js";

export default {
  message: localeMessage("required"),
  canSkip: true,
  validate: (value) => value != null && value !== null && value !== "",
};
