<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { docsLang, setDocsLang, t } from "../i18n.js";

const route = useRoute();
const showSidebar = computed(() => route.path !== "/");
const links = computed(() => [
  { to: "/guide", label: t.value.nav.guide },
  { to: "/validators", label: t.value.nav.validators },
  { to: "/locale", label: t.value.nav.locale },
  { to: "/api", label: t.value.nav.api },
  { to: "/playground", label: t.value.nav.playground },
]);
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="wrap topbar-inner">
        <router-link class="brand" to="/">
          <span class="brand-mark">V</span>
          <span>{{ t.brand }}</span>
        </router-link>
        <nav class="nav">
          <router-link to="/guide">{{ t.nav.guide }}</router-link>
          <router-link to="/validators">{{ t.nav.validators }}</router-link>
          <router-link to="/locale">{{ t.nav.locale }}</router-link>
          <router-link to="/api">{{ t.nav.api }}</router-link>
          <router-link class="nav-demo" to="/playground">{{ t.nav.playground }}</router-link>
        </nav>
        <div class="top-actions">
          <div class="lang-switch">
            <button type="button" :class="{ active: docsLang === 'fa' }" @click="setDocsLang('fa')">
              فا
            </button>
            <button type="button" :class="{ active: docsLang === 'en' }" @click="setDocsLang('en')">
              EN
            </button>
          </div>
          <a
            class="npm-link"
            href="https://www.npmjs.com/package/vue-high-validator"
            target="_blank"
            rel="noreferrer"
          >
            {{ t.npm }}
          </a>
        </div>
      </div>
    </header>

    <div class="wrap" :class="{ 'has-sidebar': showSidebar }">
      <aside v-if="showSidebar" class="sidebar">
        <router-link
          to="/"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <a :href="href" :class="{ 'router-link-active': isExactActive }" @click="navigate">
            {{ t.nav.home }}
          </a>
        </router-link>
        <router-link v-for="link in links" :key="link.to" :to="link.to">
          {{ link.label }}
        </router-link>
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>

    <footer class="footer">
      <div class="wrap">{{ t.footer }} · v{{ t.version }}</div>
    </footer>
  </div>
</template>
