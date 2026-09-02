<script setup>
import CodeBlock from "../components/CodeBlock.vue";
import { codes } from "../codes.js";
import { messageKeys, t } from "../i18n.js";
</script>

<template>
  <article class="doc">
    <h1>{{ t.locale.title }}</h1>
    <p class="lead">{{ t.locale.intro }}</p>

    <h2>{{ t.locale.globalTitle }}</h2>
    <CodeBlock :code="codes.setLocale" />

    <h2>{{ t.locale.addTitle }}</h2>
    <p>{{ t.locale.addText }}</p>
    <CodeBlock :code="codes.addLocale" />

    <h2>{{ t.locale.formTitle }}</h2>
    <CodeBlock :code="codes.formLocale" />

    <h2>{{ t.locale.keysTitle }}</h2>
    <p class="key-list">
      <code v-for="key in messageKeys" :key="key">{{ key }}</code>
    </p>
  </article>
</template>
