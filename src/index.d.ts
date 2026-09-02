import type { Ref } from "vue";

export interface FormField<T = unknown> {
  value: T;
  errorMessage: string;
  hasInvalid: boolean;
}

export type FormFields<T extends Record<string, unknown>> = {
  [K in keyof T]: FormField<T[K]>;
} & {
  assign: (data: Partial<T>) => void;
};

export type FormRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: string;
};

export type LocaleCode = string;

export type LocaleMessages = {
  required?: string;
  required_if?: string;
  jalali_date?: string;
  mobile?: string;
  email?: string;
  uri?: string;
  integer?: string;
  formula?: string;
  national_code_ir?: string;
  nullable?: string;
  [rule: string]: string | undefined;
};

export interface ValidatorOptions {
  locale?: LocaleCode;
  messages?: Record<string, string | (() => string)>;
}

export interface ValidatorApi {
  hasValid: () => boolean | string;
  attachErrors: (errors: Record<string, string | string[]>, form: Ref<FormFields<any>>) => false | void;
  getFormData: (form: Record<string, any>, asFormData?: boolean) => Record<string, any> | FormData;
  clearFormData: (form: Ref<FormFields<any>> | FormFields<any>) => void;
}

export interface ValidatorRule {
  message: (lang?: LocaleCode) => string;
  validate: (...args: any[]) => unknown;
  canSkip?: boolean;
  checkIf?: boolean;
  formData?: any;
}

export declare const locale: Ref<LocaleCode>;

export declare function setLocale(lang: LocaleCode): void;
export declare function getLocale(): LocaleCode;
export declare function setFallbackLocale(lang: LocaleCode): void;
export declare function addLocale(lang: LocaleCode, dictionary: LocaleMessages): void;
export declare function getAvailableLocales(): LocaleCode[];

export declare function useForm<T extends Record<string, unknown>>(
  initialData: T
): Ref<FormFields<T>>;

export declare function useValidator<T extends Record<string, unknown>>(
  formData: FormFields<T>,
  rules: FormRules<T>,
  options?: ValidatorOptions
): ValidatorApi;

export declare const validators: {
  required: ValidatorRule;
  required_if: ValidatorRule;
  jalali_date: ValidatorRule;
  national_code_ir: ValidatorRule;
  mobile: ValidatorRule;
  email: ValidatorRule;
  uri: ValidatorRule;
  integer: ValidatorRule;
  formula: ValidatorRule;
  nullable: ValidatorRule;
};
