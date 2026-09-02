import { localeMessage } from "../locale/index.js";

export default {
  message: localeMessage("integer"),
  validate: (value) => Number.isInteger(parseInt(value, 10)),
};
