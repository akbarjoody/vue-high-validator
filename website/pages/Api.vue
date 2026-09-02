<script setup>
import { t } from "../i18n.js";
</script>

<template>
  <article class="doc">
    <h1>{{ t.api.title }}</h1>
    <p class="lead">{{ t.api.intro }}</p>
    <section v-for="item in t.api.items" :key="item.name" class="api-item">
      <h2><code>{{ item.name }}</code></h2>
      <p>{{ item.text }}</p>
    </section>
  </article>
</template>
