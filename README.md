# Vue High Validator

A Vue 3 form validation plugin with multilingual messages and built-in rules like required, email, Jalali date, and national code.

## Features

- **Simple:** Intuitive and straightforward declarative validation
- **Versatile:** Supports field-level or form-level validation
- **Speedy:** Create forms quickly with a lightweight and easy-to-use API
- **Lightweight:** Focuses only on form logic, giving you full control over the UI
- **Multilingual:** Error messages in Persian, English, or any language you add

## Installation

```bash
npm install vue-high-validator
```

## Usage

```vue
<script setup>
import { useForm, useValidator } from 'vue-high-validator'

const form = useForm({
  name: '',
  email: '',
})

const { hasValid } = useValidator(form.value, {
  name: 'required',
  email: 'required|email',
})

function submit() {
  if (hasValid()) {
    console.log('Form is valid!')
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name.value" />
    <span v-if="form.name.hasInvalid">{{ form.name.errorMessage }}</span>

    <input v-model="form.email.value" />
    <span v-if="form.email.hasInvalid">{{ form.email.errorMessage }}</span>
  </form>
</template>
```

Chain multiple rules with `|`:

```js
useValidator(form.value, {
  email: 'required|email',
  mobile: 'required|mobile',
  reason: 'required_if:status:rejected',
})
```

Each field has `value`, `hasInvalid`, and `errorMessage`.

## Built-in rules

| Rule | Example | Description |
| --- | --- | --- |
| `required` | `required` | Field must not be empty |
| `required_if` | `required_if:status:rejected` | Required when another field equals a value |
| `email` | `email` | Valid email format |
| `mobile` | `mobile` | Iranian mobile number |
| `jalali_date` | `jalali_date` | Jalali date as `1402/01/02` |
| `national_code_ir` | `national_code_ir` | National ID with checksum |
| `uri` | `uri` | Path like `/users/:id` |
| `integer` | `integer` | Integer value |
| `formula` | `formula` | Valid formula structure |
| `nullable` | `nullable` | Always passes; use for optional fields |

## Locale

Error messages default to Persian (`fa`). Switch to English or add any other language:

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

Missing keys fall back to English. You can also set the locale or override messages for a single form:

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

## Helpers

```js
const { hasValid, getFormData, clearFormData, attachErrors } = useValidator(
  form.value,
  { name: 'required', email: 'required|email' }
)

if (hasValid()) {
  const payload = getFormData(form.value)
  const multipart = getFormData(form.value, true)
}

form.value.assign({ name: 'Akbar', email: 'a@b.com' })
clearFormData(form)
attachErrors(serverErrors, form)
```

## Documentation site

Run the docs and live demo locally:

```bash
npm install
npm run dev
```

Build a static site for hosting (GitHub Pages, Netlify, Cloudflare Pages, or any static host):

```bash
npm run docs:build
```

Upload the `docs-dist` folder to your host.

## Library build

```bash
npm run build
```
