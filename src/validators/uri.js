import { localeMessage } from "../locale/index.js";

const URI_PATTERN = /^(\/[a-z0-9-:]+)+$/;

export default {
  message: localeMessage("uri"),
  validate: (value) =>
    value == null || value === ""
      ? true
      : String(value).toLowerCase().match(URI_PATTERN),
};
