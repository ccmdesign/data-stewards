<script setup lang="ts">
interface OrganizationCardProps {
  title: string
  description: string
}

defineProps<OrganizationCardProps>()
</script>

<template>
  <UPageCard
    :title="title"
    :description="description"
  />
</template>

