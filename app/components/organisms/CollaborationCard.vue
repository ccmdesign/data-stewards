<script setup lang="ts">
interface CollaborationCardProps {
  title: string
  body: string
}

defineProps<CollaborationCardProps>()
</script>

<template>
  <UCard
    class="h-full"
    :ui="{ root: 'flex flex-col', body: 'flex-1' }"
  >
    <template #header>
      <h3 class="text-xl font-semibold">{{ title }}</h3>
    </template>
    <p class="text-muted">{{ body }}</p>
    <template #footer>
      <UButton
        label="Contact us"
        to="/contact"
        color="primary"
        variant="outline"
        size="lg"
      />
    </template>
  </UCard>
</template>


