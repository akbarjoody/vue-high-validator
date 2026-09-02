# Vue High Validator

A Vue 3 form validation plugin with multilingual messages and built-in rules like required, email, Jalali date, and national code.

## Installation


## Features
- **🌟 Simple:** Intuitive and straightforward declarative validation  
- **🧘‍♀️ Versatile:** Supports synchronous, asynchronous, field-level, or form-level validation  
- **⚡️ Speedy:** Create forms quickly with a lightweight and easy-to-use API  
- **🎯 Lightweight:** Focuses only on complex form logic, giving you full control over the rest

```bash
npm install vue-high-validator
```

## Documentation

سایت مستندات همراه دمو:

```bash
npm run dev
```

خروجی استاتیک برای انتشار روی اینترنت:

```bash
npm run docs:build
```

پوشه `docs-dist` را روی GitHub Pages، Netlify، Cloudflare Pages یا هر هاست استاتیک آپلود کن.

## Development

```bash
npm install
npm run dev
```

Playground روی `http://localhost:5173` اجرا می‌شود. برای ساخت خروجی کتابخانه:

```bash
npm run build
```

```vue
<script setup>
import { useValidator, useForm, validators } from 'vue-high-validator';

const form = useForm({
  name: '',
  email: '',
});

const { hasValid } = useValidator(form.value, {
  name: 'required',
  email: 'required|email',
});

if (hasValid()) {
  console.log('Form is valid!');
}
</script>
<template>
  <div>
    <input v-model="form.name.value" />
    <span v-if="form.name.hasInvalid">{{ form.name.errorMessage }}</span>
  </div>
</template>
```

## Locale

پیام‌های خطا به‌صورت پیش‌فرض فارسی هستند. برای انگلیسی یا هر زبان دیگر:

```js
import { setLocale, addLocale, useValidator } from 'vue-high-validator'

setLocale('en')

addLocale('de', {
  required: 'Dieses Feld ist erforderlich',
  email: 'Ungültige E-Mail-Adresse',
  mobile: 'Ungültige Mobilnummer',
})

setLocale('de')
```

یا فقط برای یک فرم:

```js
useValidator(form.value, {
  name: 'required',
  email: 'required|email',
}, {
  locale: 'en',
  messages: {
    required: 'Please fill this field',
    email: 'Enter a valid email',
  },
})
```