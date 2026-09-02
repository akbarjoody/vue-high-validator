<script setup>
import CodeBlock from "../components/CodeBlock.vue";
import { codes } from "../codes.js";
import { t } from "../i18n.js";
</script>

<template>
  <article class="doc">
    <h1>{{ t.guide.title }}</h1>
    <p class="lead">{{ t.guide.intro }}</p>

    <h2>{{ t.guide.install }}</h2>
    <CodeBlock :code="codes.install" />

    <h2>{{ t.guide.formTitle }}</h2>
    <p>{{ t.guide.formText }}</p>
    <CodeBlock :code="codes.useForm" />

    <h2>{{ t.guide.rulesTitle }}</h2>
    <p>{{ t.guide.rulesText }}</p>
    <CodeBlock :code="codes.basic" />

    <h2>{{ t.guide.helpersTitle }}</h2>
    <p>{{ t.guide.helpersText }}</p>
    <CodeBlock :code="codes.helpers" />
    <CodeBlock :code="codes.attachErrors" />
  </article>
</template>
