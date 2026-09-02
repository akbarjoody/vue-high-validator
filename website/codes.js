export const codes = {
  install: `npm install vue-high-validator`,
  basic: `<script setup>
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
    console.log('Form is valid')
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
</template>`,
  useForm: `import { useForm } from 'vue-high-validator'

const form = useForm({
  name: '',
  email: '',
  age: 0,
})

form.value.name.value = 'Akbar'`,
  rules: `const { hasValid } = useValidator(form.value, {
  name: 'required',
  email: 'required|email',
  mobile: 'required|mobile',
  birthday: 'jalali_date',
})`,
  requiredIf: `const form = useForm({
  status: '',
  reason: '',
})

const { hasValid } = useValidator(form.value, {
  status: 'required',
  reason: 'required_if:status:rejected',
})`,
  helpers: `const { hasValid, getFormData, clearFormData, attachErrors } = useValidator(
  form.value,
  { name: 'required', email: 'required|email' }
)

if (hasValid()) {
  const payload = getFormData(form.value)
  const multipart = getFormData(form.value, true)
}

form.value.assign({ name: 'Akbar', email: 'a@b.com' })
clearFormData(form)`,
  attachErrors: `try {
  await api.post('/users', getFormData(form.value))
} catch (error) {
  attachErrors(error.response.data.errors, form)
}`,
  setLocale: `import { setLocale } from 'vue-high-validator'

setLocale('en')
setLocale('fa')`,
  addLocale: `import { addLocale, setLocale } from 'vue-high-validator'

addLocale('de', {
  required: 'Dieses Feld ist erforderlich',
  email: 'Ungültige E-Mail-Adresse',
  mobile: 'Ungültige Mobilnummer',
  jalali_date: 'Ungültiges Jalali-Datum, Beispiel 1402/01/02',
  national_code_ir: 'Ungültige nationale ID',
  uri: 'Ungültiger Pfad, Beispiel (/x1/:y2/...)',
  integer: 'Der Wert muss eine ganze Zahl sein',
  formula: 'Ungültige Formelstruktur',
  required_if: 'Dieses Feld ist erforderlich',
  nullable: '',
})

setLocale('de')`,
  formLocale: `useValidator(form.value, {
  name: 'required',
  email: 'required|email',
}, {
  locale: 'en',
  messages: {
    required: 'Please fill this field',
    email: 'Enter a valid email',
  },
})`,
};
