import { ref } from "vue";

export function useForm(initialData) {
  const form = ref({});

  const assign = (data) => {
    for (const [key, value] of Object.entries(data)) {
      form.value[key] = {
        value,
        errorMessage: "",
        hasInvalid: false,
      };
    }
  };

  assign(initialData);
  form.value.assign = assign;

  return form;
}
