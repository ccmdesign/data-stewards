<script setup lang="ts">
interface Props {
  brow?: string
  title?: string
  tagline?: string
}

defineProps<Props>()
</script>

<template>
  <header v-if="brow || title || tagline" class="mb-8 space-y-2 text-center">
    <p v-if="brow" class="text-sm font-semibold color-primary">
      {{ brow }}
    </p>
    <h2 v-if="title" class="text-4xl font-semibold">
      {{ title }}
    </h2>
    <p v-if="tagline" class="text-lg">
      {{ tagline }}
    </p>
  </header>
</template>

