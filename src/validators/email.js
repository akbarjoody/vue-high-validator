import { localeMessage } from "../locale/index.js";

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  message: localeMessage("email"),
  validate: (value) =>
    value == null || value === ""
      ? true
      : String(value).toLowerCase().match(EMAIL_PATTERN),
};
