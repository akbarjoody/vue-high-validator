import { getLocale } from "./locale/index.js";
import validators from "./validators/index.js";

function parseOptions(params) {
  const options = { canSkip: "false" };
  const optionsParam = params.find((param) => String(param).includes("options"));

  if (optionsParam) {
    optionsParam
      .substring(10, optionsParam.length - 1)
      .split(",")
      .forEach((item) => {
        const [key, value] = item.split("=");
        options[key] = value;
      });
  }

  return options;
}

function resolveMessage(ruleName, validator, locale, customMessages) {
  const override = customMessages[ruleName];

  if (typeof override === "function") {
    return override();
  }

  if (typeof override === "string") {
    return override;
  }

  return validator.message(locale);
}

export function useValidator(formData, rules, options = {}) {
  const customMessages = options.messages || {};

  const hasValid = () => {
    const locale = options.locale || getLocale();
    let isValid = true;
    let skipMessages = "";

    for (const [field, ruleString] of Object.entries(rules)) {
      const value = formData[field]?.value;
      const ruleParts = String(ruleString).split("|");

      for (const rule of ruleParts) {
        const [ruleName, ...params] = rule.split(":");
        const validator = validators[ruleName];

        if (!validator) {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(validator, "formData")) {
          validator.formData = formData;
        }

        const options = parseOptions(params);

        if (validator.validate(value, ...params)) {
          if (formData[field]) {
            formData[field].hasInvalid = false;
          }
          continue;
        }

        if (!formData[field]) {
          continue;
        }

        const errorMessage = resolveMessage(
          ruleName,
          validator,
          locale,
          customMessages
        );

        if (options.canSkip === "true") {
          skipMessages += errorMessage + ",";
          isValid = skipMessages;
        } else {
          formData[field].hasInvalid = true;
          formData[field].errorMessage = errorMessage;
          isValid = false;
        }
      }
    }

    return isValid;
  };

  const attachErrors = (errors, form) => {
    if (!errors.length) {
      return false;
    }

    for (let [key, messages] of Object.entries(errors)) {
      key = key.split(".")[0];
      if (form.value[key]) {
        form.value[key].hasInvalid = true;
        form.value[key].errorMessage = Array.isArray(messages)
          ? messages[0]
          : messages;
      }
    }
  };

  const getFormData = (form, asFormData = false) => {
    const result = asFormData ? new FormData() : {};

    for (const [key, field] of Object.entries(form)) {
      if (key === "assign") {
        continue;
      }

      if (typeof field === "object" && field !== null) {
        if (
          typeof field.value === "object" &&
          field.value !== null &&
          field.value.value != null
        ) {
          if (asFormData) {
            result.set(key, field.value.value);
          } else {
            result[key] = field.value.value;
          }
        } else if (Array.isArray(field.value)) {
          if (asFormData) {
            if (field.value[0] instanceof File) {
              field.value.forEach((file, index) => {
                if (file instanceof File) {
                  result.append(`${key}[${index}]`, file);
                }
              });
            } else {
              result.append(key, JSON.stringify(field.value));
            }
          } else {
            result[key] = field.value;
          }
        } else if (
          ("File" in window && field.value instanceof File) ||
          field.value ||
          field.value === 0
        ) {
          if (asFormData) {
            result.set(key, field.value);
          } else {
            result[key] = field.value;
          }
        }
      } else if (field) {
        if (asFormData) {
          result.set(key, field);
        } else {
          result[key] = field;
        }
      }
    }

    return result;
  };

  const clearFormData = (form) => {
    const data = form.value ? form.value : form;

    for (const [key, field] of Object.entries(data)) {
      if (key === "assign") {
        return;
      }

      data[key] = {
        value: Array.isArray(field.value) ? [] : null,
        errorMessage: "",
        hasInvalid: false,
      };
    }
  };

  return {
    hasValid,
    attachErrors,
    getFormData,
    clearFormData,
  };
}
