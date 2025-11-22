<script setup lang="ts">
interface ProgramCard {
  title: string
  description: string
  image?: string
  icon?: string
  to?: string
}

interface Props {
  cards: ProgramCard[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2
})

const iconMap: Record<string, string> = {
  Foundations: 'i-lucide-graduation-cap',
  'Deep Dives': 'i-lucide-users-round',
  Exchange: 'i-lucide-lightbulb',
  'For Your Organization': 'i-lucide-building-2'
}

const getIcon = (title: string) => {
  return iconMap[title] || 'i-lucide-circle'
}
</script>

<template>
  <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
    <FeatureCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      :icon="card.icon || getIcon(card.title)"
      variant="image-bg"
    />
  </div>
</template>

