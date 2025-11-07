<script setup lang="ts">
interface FoundationsCardProps {
  title: string
  badge: string
  description: string
}

defineProps<FoundationsCardProps>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <span class="font-semibold">{{ title }}</span>
        <UBadge variant="subtle">{{ badge }}</UBadge>
      </div>
    </template>
    <p class="text-muted">{{ description }}</p>
  </UCard>
</template>

