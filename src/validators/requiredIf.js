import { localeMessage } from "../locale/index.js";

export default {
  message: localeMessage("required_if"),
  checkIf: true,
  formData: [],
  validate: function (value, otherField, expectedValue) {
    if (value != null && value !== "") {
      return true;
    }

    const other = this.formData[otherField];
    if (typeof other?.value === "object" && other.value?.value == expectedValue) {
      return false;
    }

    return other?.value != expectedValue;
  },
};
