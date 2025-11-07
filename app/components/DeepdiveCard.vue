<script setup lang="ts">
interface DeepdiveCardProps {
  title: string
  image: string
  to?: string
}

defineProps<DeepdiveCardProps>()
</script>

<template>
  <UPageCard
    :title="title"
    :to="to"
    :ui="{ header: 'p-0' }"
  >
    <template #header>
      <div class="relative aspect-video w-full overflow-hidden bg-muted rounded-t-lg">
        <img
          :src="image"
          :alt="title"
          class="h-full w-full object-cover object-center"
        />
      </div>
    </template>
  </UPageCard>
</template>

