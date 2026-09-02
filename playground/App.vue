<script setup>
import { computed, ref, watch } from "vue";
import { addLocale, locale, setLocale, useForm, useValidator } from "vue-high-validator";

addLocale("ar", {
  required: "هذا الحقل مطلوب",
  required_if: "هذا الحقل مطلوب",
  jalali_date: "تاريخ هجري شمسي غير صالح، مثال 1402/01/02",
  mobile: "رقم الجوال غير صالح",
  email: "البريد الإلكتروني غير صالح",
  uri: "المسار غير صالح، مثال (/x1/:y2/...)",
  integer: "يجب أن تكون القيمة عدداً صحيحاً",
  formula: "صيغة المعادلة غير صحيحة",
  national_code_ir: "الرقم الوطني غير صالح",
  nullable: "",
});

const texts = {
  fa: {
    title: "Vue High Validator",
    subtitle: "محیط توسعه و تست پیام‌های چندزبانه",
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
  en: {
    title: "Vue High Validator",
    subtitle: "Playground for multilingual validation messages",
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
  ar: {
    title: "Vue High Validator",
    subtitle: "بيئة تجريب الرسائل متعددة اللغات",
    name: "الاسم",
    email: "البريد الإلكتروني",
    mobile: "الجوال",
    nationalCode: "الرقم الوطني",
    birthday: "تاريخ الميلاد الهجري الشمسي",
    path: "مسار URI",
    age: "العمر",
    formula: "المعادلة",
    extra: "ملاحظة (nullable)",
    namePlaceholder: "مثلاً أكبر",
    extraPlaceholder: "اختياري",
    submit: "تحقق",
    reset: "مسح",
    invalid: "النموذج غير صالح. راجع أخطاء الحقول.",
  },
};

const ui = computed(() => texts[locale.value] || texts.en);
const isRtl = computed(() => ["fa", "ar"].includes(locale.value));

watch(
  isRtl,
  (rtl) => {
    document.documentElement.lang = locale.value;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  },
  { immediate: true }
);

const form = useForm({
  name: "",
  email: "",
  mobile: "",
  national_code: "",
  birthday: "",
  path: "",
  age: "",
  formula: "",
  extra: "",
});

const { hasValid, getFormData, clearFormData } = useValidator(form.value, {
  name: "required",
  email: "required|email",
  mobile: "required|mobile",
  national_code: "required|national_code_ir",
  birthday: "required|jalali_date",
  path: "required|uri",
  age: "required|integer",
  formula: "formula",
  extra: "nullable",
});

const result = ref("");
const resultOk = ref(null);

function submit() {
  const valid = hasValid();

  if (valid === true) {
    resultOk.value = true;
    result.value = JSON.stringify(getFormData(form.value), null, 2);
    return;
  }

  resultOk.value = false;
  result.value = ui.value.invalid;
}

function reset() {
  clearFormData(form);
  result.value = "";
  resultOk.value = null;
}

function changeLocale(lang) {
  setLocale(lang);
  if (resultOk.value !== null) {
    submit();
  }
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <div>
        <h1>{{ ui.title }}</h1>
        <p>{{ ui.subtitle }}</p>
      </div>
      <div class="lang-switch">
        <button
          type="button"
          :class="{ active: locale === 'fa' }"
          @click="changeLocale('fa')"
        >
          فارسی
        </button>
        <button
          type="button"
          :class="{ active: locale === 'en' }"
          @click="changeLocale('en')"
        >
          English
        </button>
        <button
          type="button"
          :class="{ active: locale === 'ar' }"
          @click="changeLocale('ar')"
        >
          العربية
        </button>
      </div>
    </header>

    <form class="card" @submit.prevent="submit">
      <div class="grid">
        <div class="field">
          <label>{{ ui.name }}</label>
          <input
            v-model="form.name.value"
            :class="{ invalid: form.name.hasInvalid }"
            :placeholder="ui.namePlaceholder"
          />
          <span class="error" v-if="form.name.hasInvalid">{{ form.name.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.email }}</label>
          <input
            v-model="form.email.value"
            :class="{ invalid: form.email.hasInvalid }"
            placeholder="name@example.com"
          />
          <span class="error" v-if="form.email.hasInvalid">{{ form.email.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.mobile }}</label>
          <input
            v-model="form.mobile.value"
            :class="{ invalid: form.mobile.hasInvalid }"
            placeholder="09123456789"
          />
          <span class="error" v-if="form.mobile.hasInvalid">{{ form.mobile.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.nationalCode }}</label>
          <input
            v-model="form.national_code.value"
            :class="{ invalid: form.national_code.hasInvalid }"
            placeholder="0012345678"
          />
          <span class="error" v-if="form.national_code.hasInvalid">{{ form.national_code.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.birthday }}</label>
          <input
            v-model="form.birthday.value"
            :class="{ invalid: form.birthday.hasInvalid }"
            placeholder="1402/01/02"
          />
          <span class="error" v-if="form.birthday.hasInvalid">{{ form.birthday.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.path }}</label>
          <input
            v-model="form.path.value"
            :class="{ invalid: form.path.hasInvalid }"
            placeholder="/users/:id"
          />
          <span class="error" v-if="form.path.hasInvalid">{{ form.path.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.age }}</label>
          <input
            v-model="form.age.value"
            :class="{ invalid: form.age.hasInvalid }"
            placeholder="30"
          />
          <span class="error" v-if="form.age.hasInvalid">{{ form.age.errorMessage }}</span>
        </div>

        <div class="field">
          <label>{{ ui.formula }}</label>
          <input
            v-model="form.formula.value"
            :class="{ invalid: form.formula.hasInvalid }"
            placeholder="a+b"
          />
          <span class="error" v-if="form.formula.hasInvalid">{{ form.formula.errorMessage }}</span>
        </div>

        <div class="field full">
          <label>{{ ui.extra }}</label>
          <input v-model="form.extra.value" :placeholder="ui.extraPlaceholder" />
        </div>
      </div>

      <div class="actions">
        <button class="primary" type="submit">{{ ui.submit }}</button>
        <button class="ghost" type="button" @click="reset">{{ ui.reset }}</button>
      </div>

      <pre
        v-if="result"
        class="result"
        :class="{ ok: resultOk === true, fail: resultOk === false }"
      >{{ result }}</pre>
    </form>
  </div>
</template>
