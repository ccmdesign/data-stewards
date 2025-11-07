<script setup lang="ts">
interface ProgramCard {
  title: string
  description: string
  image: string
  to?: string
}

interface Props {
  cards: ProgramCard[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2
})

const columnsClass = computed(() => {
  const columnMap: Record<number, string> = {
    2: 'lg:columns-2',
    3: 'lg:columns-3',
    4: 'lg:columns-4'
  }
  return columnMap[props.columns] || 'lg:columns-2'
})
</script>

<template>
  <UPageColumns :class="columnsClass">
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :description="card.description"
      :to="card.to"
    >
      <template #header>
        <div class="relative aspect-video w-full overflow-hidden bg-muted rounded-t-lg">
          <img
            :src="card.image"
            :alt="card.title"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </template>
    </UPageCard>
  </UPageColumns>
</template>

