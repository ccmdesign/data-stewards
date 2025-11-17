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
    <UCard
      v-for="(card, index) in cards"
      :key="index"
      variant="muted"
      :ui="{ body: 'flex flex-col gap-8 p-8' }"
    >
      <div class="flex flex-col gap-8">
        <UIcon
          :name="card.icon || getIcon(card.title)"
          class="w-6 h-6 text-primary"
        />
        <div class="flex flex-col gap-2">
          <h3 class="text-2xl font-semibold">
            {{ card.title }}
          </h3>
          <p class="text-[15px] text-muted-foreground">
            {{ card.description }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

