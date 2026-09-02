import { computed, ref, watch } from "vue";
import { setLocale } from "vue-high-validator";

const saved = typeof localStorage !== "undefined" ? localStorage.getItem("vhv-docs-lang") : null;

export const docsLang = ref(saved === "en" ? "en" : "fa");

export const isRtl = computed(() => docsLang.value === "fa");

export function setDocsLang(lang) {
  docsLang.value = lang === "en" ? "en" : "fa";
}

watch(
  docsLang,
  (lang) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("vhv-docs-lang", lang);
    }
    setLocale(lang);
  },
  { immediate: true }
);

const copy = {
  fa: {
    brand: "vue-high-validator",
    version: "1.1.0",
    nav: {
      home: "خانه",
      guide: "شروع کار",
      validators: "قوانین",
      locale: "زبان پیام‌ها",
      api: "API",
      playground: "دمو",
    },
    footer: "اعتبارسنجی فرم Vue 3 با پیام‌های چندزبانه",
    npm: "npm",
    copy: "کپی",
    copied: "کپی شد",
    home: {
      kicker: "Vue 3 · Form Validation",
      title: "اعتبارسنجی فرم، ساده و چندزبانه",
      subtitle:
        "قوانین اعلانی مثل required و email، تاریخ شمسی، کد ملی، موبایل — و پیام خطا به فارسی، انگلیسی یا هر زبان دیگری که خودت اضافه کنی.",
      installCta: "شروع نصب",
      demoCta: "دموی زنده",
      features: [
        { title: "اعلانی", text: "قوانین را با رشته می‌نویسی: required|email" },
        { title: "چندزبانه", text: "پیام‌ها را با setLocale عوض کن یا زبان جدید بساز" },
        { title: "سبک", text: "فقط منطق فرم؛ UI کاملاً دست خودت است" },
        { title: "آمادهٔ ایران", text: "موبایل، کد ملی و تاریخ شمسی از قبل داخل پکیج است" },
      ],
      exampleTitle: "حداقل کد لازم",
    },
    guide: {
      title: "شروع کار",
      intro: "پکیج را نصب کن، فرم بساز، قوانین را بده، بعد hasValid را صدا بزن.",
      install: "نصب",
      formTitle: "ساخت فرم با useForm",
      formText:
        "هر فیلد یک آبجکت می‌شود با value، errorMessage و hasInvalid. برای مقداردهی دوباره از assign استفاده کن.",
      rulesTitle: "قوانین با useValidator",
      rulesText:
        "چند قانون را با | پشت هم بنویس. اولین خطای هر فیلد روی errorMessage می‌نشیند.",
      helpersTitle: "ارسال و پاک کردن داده",
      helpersText:
        "getFormData مقدار خام فیلدها را برمی‌گرداند. آرگومان دوم true یعنی خروجی FormData است. attachErrors برای خطاهای سرور است.",
    },
    validators: {
      title: "قوانین آماده",
      intro: "این قانون‌ها داخل پکیج هستند. می‌توانی چندتایشان را با | ترکیب کنی.",
      name: "قانون",
      sample: "نمونه",
      meaning: "توضیح",
      items: {
        required: "فیلد خالی نباشد",
        required_if: "اگر فیلد دیگر برابر مقدار مشخص باشد، این فیلد اجباری است",
        email: "فرمت ایمیل معتبر",
        mobile: "شماره موبایل ایران، مثل 09123456789",
        jalali_date: "تاریخ شمسی به شکل 1402/01/02",
        national_code_ir: "کد ملی با رقم کنترل",
        uri: "مسیر مثل /users/:id",
        integer: "عدد صحیح",
        formula: "ساختار فرمول معتبر",
        nullable: "همیشه قبول می‌شود؛ برای فیلد اختیاری",
      },
      combineTitle: "ترکیب قوانین",
      conditionalTitle: "قانون شرطی",
    },
    locale: {
      title: "زبان پیام‌ها",
      intro:
        "پیام خطا پیش‌فرض فارسی است. می‌توانی انگلیسی را انتخاب کنی، زبان تازه اضافه کنی، یا فقط برای یک فرم پیام سفارشی بدهی.",
      globalTitle: "تغییر زبان کل برنامه",
      addTitle: "اضافه کردن زبان جدید",
      addText:
        "اگر کلیدی را ننویسی، همان پیام انگلیسی نشان داده می‌شود. بعد setLocale را با کد همان زبان صدا بزن.",
      formTitle: "فقط برای یک فرم",
      keysTitle: "کلیدهای پیام",
    },
    api: {
      title: "مرجع API",
      intro: "خروجی‌های اصلی پکیج.",
      items: [
        {
          name: "useForm(initialData)",
          text: "یک ref از فیلدها برمی‌گرداند. هر فیلد value، errorMessage و hasInvalid دارد. form.value.assign(data) فیلدها را دوباره می‌سازد.",
        },
        {
          name: "useValidator(formData, rules, options?)",
          text: "options.locale و options.messages اختیاری‌اند. خروجی: hasValid، getFormData، clearFormData، attachErrors.",
        },
        {
          name: "hasValid()",
          text: "اگر همه قوانین پاس شوند true برمی‌گرداند و در غیر این صورت خطا را روی فیلد می‌گذارد.",
        },
        {
          name: "getFormData(form, asFormData?)",
          text: "آبجکت ساده یا FormData از مقدار فیلدها می‌سازد. فایل‌ها را هم پشتیبانی می‌کند.",
        },
        {
          name: "clearFormData(form)",
          text: "مقدار فیلدها را خالی و خطاها را پاک می‌کند.",
        },
        {
          name: "attachErrors(errors, form)",
          text: "خطاهای سرور را به فیلدها وصل می‌کند. کلید می‌تواند user.name باشد؛ بخش اول نام فیلد است.",
        },
        {
          name: "setLocale(lang) / getLocale()",
          text: "زبان سراسری پیام‌ها را عوض یا می‌خواند. مقدار پیش‌فرض fa است.",
        },
        {
          name: "addLocale(lang, dictionary)",
          text: "یک زبان تازه ثبت می‌کند یا پیام‌های یک زبان موجود را کامل می‌کند.",
        },
        {
          name: "setFallbackLocale(lang)",
          text: "اگر کلیدی در زبان فعلی نباشد، از این زبان استفاده می‌شود. پیش‌فرض en است.",
        },
        {
          name: "validators",
          text: "آبجکت قانون‌های داخلی؛ اگر بخواهی قانون سفارشی به همین شکل بسازی الگوی آن اینجاست.",
        },
      ],
    },
    playground: {
      title: "دموی زنده",
      subtitle: "قوانین را روی فرم واقعی تست کن. زبان پیام‌های اعتبارسنجی را از اینجا عوض کن.",
      name: "نام",
      email: "ایمیل",
      mobile: "موبایل",
      nationalCode: "کد ملی",
      birthday: "تاریخ تولد شمسی",
      path: "مسیر URI",
      age: "سن",
      formula: "فرمول",
      extra: "یادداشت (nullable)",
      namePlaceholder: "مثلاً اکبر",
      extraPlaceholder: "اختیاری",
      submit: "اعتبارسنجی",
      reset: "پاک کردن",
      invalid: "فرم معتبر نیست. خطاهای هر فیلد را بررسی کنید.",
    },
  },
  en: {
    brand: "vue-high-validator",
    version: "1.1.0",
    nav: {
      home: "Home",
      guide: "Get started",
      validators: "Rules",
      locale: "Locale",
      api: "API",
      playground: "Demo",
    },
    footer: "Vue 3 form validation with multilingual messages",
    npm: "npm",
    copy: "Copy",
    copied: "Copied",
    home: {
      kicker: "Vue 3 · Form Validation",
      title: "Form validation, simple and multilingual",
      subtitle:
        "Declarative rules like required and email, Jalali date, national ID, mobile — and error messages in Persian, English, or any language you add.",
      installCta: "Get started",
      demoCta: "Live demo",
      features: [
        { title: "Declarative", text: "Write rules as strings: required|email" },
        { title: "Multilingual", text: "Switch with setLocale or register a new language" },
        { title: "Lightweight", text: "Only form logic; you keep full control of the UI" },
        { title: "Ready-made rules", text: "Mobile, national ID, and Jalali date ship with the package" },
      ],
      exampleTitle: "Minimal example",
    },
    guide: {
      title: "Get started",
      intro: "Install the package, create a form, pass rules, then call hasValid.",
      install: "Install",
      formTitle: "Create a form with useForm",
      formText:
        "Each field becomes an object with value, errorMessage, and hasInvalid. Use assign to fill the form again.",
      rulesTitle: "Rules with useValidator",
      rulesText:
        "Chain rules with |. The first failing rule for a field is written to errorMessage.",
      helpersTitle: "Submit and reset",
      helpersText:
        "getFormData returns raw field values. Pass true as the second argument to get FormData. attachErrors maps server errors onto fields.",
    },
    validators: {
      title: "Built-in rules",
      intro: "These rules ship with the package. Combine them with |.",
      name: "Rule",
      sample: "Example",
      meaning: "What it checks",
      items: {
        required: "Field must not be empty",
        required_if: "Required when another field equals a given value",
        email: "Valid email format",
        mobile: "Iranian mobile number, e.g. 09123456789",
        jalali_date: "Jalali date as 1402/01/02",
        national_code_ir: "National ID with checksum",
        uri: "Path like /users/:id",
        integer: "Integer value",
        formula: "Valid formula structure",
        nullable: "Always passes; use for optional fields",
      },
      combineTitle: "Combining rules",
      conditionalTitle: "Conditional rule",
    },
    locale: {
      title: "Message locale",
      intro:
        "Error messages default to Persian. Switch to English, add another language, or override messages for a single form.",
      globalTitle: "Change locale globally",
      addTitle: "Add a new language",
      addText:
        "Missing keys fall back to English. Then call setLocale with that language code.",
      formTitle: "Per-form locale",
      keysTitle: "Message keys",
    },
    api: {
      title: "API reference",
      intro: "The main exports of the package.",
      items: [
        {
          name: "useForm(initialData)",
          text: "Returns a ref of fields. Each field has value, errorMessage, and hasInvalid. form.value.assign(data) rebuilds fields.",
        },
        {
          name: "useValidator(formData, rules, options?)",
          text: "options.locale and options.messages are optional. Returns hasValid, getFormData, clearFormData, and attachErrors.",
        },
        {
          name: "hasValid()",
          text: "Returns true when every rule passes; otherwise writes the error onto the field.",
        },
        {
          name: "getFormData(form, asFormData?)",
          text: "Builds a plain object or FormData from field values, including files.",
        },
        {
          name: "clearFormData(form)",
          text: "Clears field values and errors.",
        },
        {
          name: "attachErrors(errors, form)",
          text: "Maps server errors onto fields. A key like user.name uses the first segment as the field name.",
        },
        {
          name: "setLocale(lang) / getLocale()",
          text: "Sets or reads the global message locale. Default is fa.",
        },
        {
          name: "addLocale(lang, dictionary)",
          text: "Registers a new language or extends an existing dictionary.",
        },
        {
          name: "setFallbackLocale(lang)",
          text: "Used when a key is missing in the current locale. Default is en.",
        },
        {
          name: "validators",
          text: "The built-in rule objects; a template if you want to follow the same shape.",
        },
      ],
    },
    playground: {
      title: "Live demo",
      subtitle: "Try the rules on a real form. Change validation message language here.",
      name: "Name",
      email: "Email",
      mobile: "Mobile",
      nationalCode: "National ID",
      birthday: "Jalali birthday",
      path: "URI path",
      age: "Age",
      formula: "Formula",
      extra: "Note (nullable)",
      namePlaceholder: "e.g. Akbar",
      extraPlaceholder: "Optional",
      submit: "Validate",
      reset: "Clear",
      invalid: "The form is invalid. Check the field errors.",
    },
  },
};

export const t = computed(() => copy[docsLang.value]);

export const validatorMeta = [
  { name: "required", sample: "required" },
  { name: "required_if", sample: "required_if:status:rejected" },
  { name: "email", sample: "email" },
  { name: "mobile", sample: "mobile" },
  { name: "jalali_date", sample: "jalali_date" },
  { name: "national_code_ir", sample: "national_code_ir" },
  { name: "uri", sample: "uri" },
  { name: "integer", sample: "integer" },
  { name: "formula", sample: "formula" },
  { name: "nullable", sample: "nullable" },
];

export const messageKeys = [
  "required",
  "required_if",
  "email",
  "mobile",
  "jalali_date",
  "national_code_ir",
  "uri",
  "integer",
  "formula",
  "nullable",
];
