<script setup>
import { addLocale, locale, setLocale, useForm, useValidator } from "vue-high-validator";
import { ref, watch } from "vue";
import { t } from "../i18n.js";

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
  result.value = t.value.playground.invalid;
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

watch(
  () => t.value.playground.invalid,
  () => {
    if (resultOk.value === false) {
      result.value = t.value.playground.invalid;
    }
  }
);
</script>

<template>
  <article class="doc">
    <div class="demo-head">
      <div>
        <h1>{{ t.playground.title }}</h1>
        <p class="lead">{{ t.playground.subtitle }}</p>
      </div>
      <div class="lang-switch">
        <button type="button" :class="{ active: locale === 'fa' }" @click="changeLocale('fa')">فارسی</button>
        <button type="button" :class="{ active: locale === 'en' }" @click="changeLocale('en')">English</button>
        <button type="button" :class="{ active: locale === 'ar' }" @click="changeLocale('ar')">العربية</button>
      </div>
    </div>

    <form class="card" @submit.prevent="submit">
      <div class="grid">
        <div class="field">
          <label>{{ t.playground.name }}</label>
          <input
            v-model="form.name.value"
            :class="{ invalid: form.name.hasInvalid }"
            :placeholder="t.playground.namePlaceholder"
          />
          <span v-if="form.name.hasInvalid" class="error">{{ form.name.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.email }}</label>
          <input
            v-model="form.email.value"
            :class="{ invalid: form.email.hasInvalid }"
            placeholder="name@example.com"
          />
          <span v-if="form.email.hasInvalid" class="error">{{ form.email.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.mobile }}</label>
          <input
            v-model="form.mobile.value"
            :class="{ invalid: form.mobile.hasInvalid }"
            placeholder="09123456789"
          />
          <span v-if="form.mobile.hasInvalid" class="error">{{ form.mobile.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.nationalCode }}</label>
          <input
            v-model="form.national_code.value"
            :class="{ invalid: form.national_code.hasInvalid }"
            placeholder="0012345678"
          />
          <span v-if="form.national_code.hasInvalid" class="error">{{ form.national_code.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.birthday }}</label>
          <input
            v-model="form.birthday.value"
            :class="{ invalid: form.birthday.hasInvalid }"
            placeholder="1402/01/02"
          />
          <span v-if="form.birthday.hasInvalid" class="error">{{ form.birthday.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.path }}</label>
          <input
            v-model="form.path.value"
            :class="{ invalid: form.path.hasInvalid }"
            placeholder="/users/:id"
          />
          <span v-if="form.path.hasInvalid" class="error">{{ form.path.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.age }}</label>
          <input
            v-model="form.age.value"
            :class="{ invalid: form.age.hasInvalid }"
            placeholder="30"
          />
          <span v-if="form.age.hasInvalid" class="error">{{ form.age.errorMessage }}</span>
        </div>
        <div class="field">
          <label>{{ t.playground.formula }}</label>
          <input
            v-model="form.formula.value"
            :class="{ invalid: form.formula.hasInvalid }"
            placeholder="a+b"
          />
          <span v-if="form.formula.hasInvalid" class="error">{{ form.formula.errorMessage }}</span>
        </div>
        <div class="field full">
          <label>{{ t.playground.extra }}</label>
          <input v-model="form.extra.value" :placeholder="t.playground.extraPlaceholder" />
        </div>
      </div>
      <div class="actions">
        <button class="btn primary" type="submit">{{ t.playground.submit }}</button>
        <button class="btn ghost" type="button" @click="reset">{{ t.playground.reset }}</button>
      </div>
      <pre v-if="result" class="result" :class="{ ok: resultOk === true, fail: resultOk === false }">{{ result }}</pre>
    </form>
  </article>
</template>
