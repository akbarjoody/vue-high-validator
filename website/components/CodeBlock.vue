<script setup>
import { ref } from "vue";
import { t } from "../i18n.js";

const props = defineProps({
  code: { type: String, required: true },
});

const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1400);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <div class="code-block">
    <button class="copy-btn" type="button" @click="copy">
      {{ copied ? t.copied : t.copy }}
    </button>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>
