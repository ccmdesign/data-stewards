<script setup lang="ts">
interface ExchangeCardProps {
  title: string
  description: string
}

defineProps<ExchangeCardProps>()
</script>

<template>
  <UPageCard
    :title="title"
    :description="description"
  />
</template>

