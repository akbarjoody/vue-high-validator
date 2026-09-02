<script setup>
import CodeBlock from "../components/CodeBlock.vue";
import { codes } from "../codes.js";
import { t, validatorMeta } from "../i18n.js";
</script>

<template>
  <article class="doc">
    <h1>{{ t.validators.title }}</h1>
    <p class="lead">{{ t.validators.intro }}</p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{{ t.validators.name }}</th>
            <th>{{ t.validators.sample }}</th>
            <th>{{ t.validators.meaning }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in validatorMeta" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td><code>{{ row.sample }}</code></td>
            <td>{{ t.validators.items[row.name] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>{{ t.validators.combineTitle }}</h2>
    <CodeBlock :code="codes.rules" />

    <h2>{{ t.validators.conditionalTitle }}</h2>
    <CodeBlock :code="codes.requiredIf" />
  </article>
</template>
