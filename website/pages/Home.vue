<script setup>
import CodeBlock from "../components/CodeBlock.vue";
import { codes } from "../codes.js";
import { t } from "../i18n.js";
</script>

<template>
  <section class="hero-page">
    <p class="kicker">{{ t.home.kicker }}</p>
    <h1>{{ t.home.title }}</h1>
    <p class="lead">{{ t.home.subtitle }}</p>
    <div class="hero-actions">
      <router-link class="btn primary" to="/guide">{{ t.home.installCta }}</router-link>
      <router-link class="btn ghost" to="/playground">{{ t.home.demoCta }}</router-link>
    </div>
    <CodeBlock :code="codes.install" />
    <div class="feature-grid">
      <article v-for="item in t.home.features" :key="item.title" class="feature-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
    <h2>{{ t.home.exampleTitle }}</h2>
    <CodeBlock :code="codes.basic" />
  </section>
</template>
