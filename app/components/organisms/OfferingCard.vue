<script setup lang="ts">
import type { OfferingEntry, OfferingLevel } from '~/types/offerings'

interface Props {
  offering: OfferingEntry
  variant?: 'upcoming' | 'archived'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'archived'
})

const levelColors: Record<OfferingLevel, 'success' | 'warning' | 'error' | 'info'> = {
  introductory: 'success',
  intermediate: 'warning',
  advanced: 'error',
  executive: 'info'
}

const formatLevelLabel = (level?: OfferingLevel) => {
  if (!level) return null
  return level.split('-').map(part => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}

const getLevelColor = (level?: OfferingLevel): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
  if (!level) return 'neutral'
  return levelColors[level] ?? 'neutral'
}

const isUpcoming = computed(() => props.variant === 'upcoming')
const cardClasses = computed(() => {
  const base = 'transition-shadow shadow-md hover:shadow-lg ring-1 ring-transparent divide-y-0'
  if (isUpcoming.value) {
    return `w-full flex flex-col ${base}`
  }
  return `h-full ${base}`
})

const cardUi = computed(() => {
  if (isUpcoming.value) {
    return {}
  }
  return { root: 'flex flex-col h-full', body: 'flex-1' }
})

const titleClasses = computed(() => {
  return isUpcoming.value ? 'text-2xl font-semibold tracking-tight' : 'text-xl font-semibold tracking-tight'
})
</script>

<template>
  <UCard
    :class="cardClasses"
    :ui="cardUi"
    class="border-none"
  >
    <div :class="isUpcoming ? '' : 'flex flex-col gap-4'">
      <div class="space-y-2">
        <h3 :class="titleClasses">
          {{ offering.title }}
        </h3>
        <p :class="isUpcoming ? 'text-muted-foreground' : 'text-sm text-muted-foreground'">
          {{ offering.meta?.summary ?? offering.description }}
        </p>

        <dl class="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-layers" class="h-4 w-4" />
          <span>{{ offering.meta?.format }}</span>
        </div>
        <div v-if="offering.meta?.schedule?.duration" class="flex items-center gap-2">
          <UIcon name="i-lucide-clock" class="h-4 w-4" />
          <span>{{ offering.meta?.schedule?.duration }}</span>
        </div>
        <div v-if="offering.meta?.location" class="flex items-center gap-2">
          <UIcon name="i-lucide-map-pin" class="h-4 w-4" />
          <span>{{ [offering.meta?.location?.city, offering.meta?.location?.country].filter(Boolean).join(', ') }}</span>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2">
        <UBadge variant="subtle" color="primary">{{ offering.meta?.program }}</UBadge>
        <UBadge
          v-if="offering.meta?.level"
          variant="soft"
          :color="getLevelColor(offering.meta?.level)"
        >
          {{ formatLevelLabel(offering.meta?.level) }}
        </UBadge>
      </div>
    </div>
      
    </div>

    <template #footer>
      <div v-if="isUpcoming" class="flex gap-3">
        <UButton
          color="primary"
          :to="offering.path ?? '/offerings'"
        >
          Register
        </UButton>
        <UButton
          color="primary"
          variant="outline"
          :to="offering.path ?? '/offerings'"
        >
          View more
        </UButton>
      </div>
      <UButton
        v-else
        color="primary"
        variant="outline"
        size="sm"
        :to="offering.path ?? '/offerings'"
      >
        View more
      </UButton>
    </template>
  </UCard>
</template>

<style scoped>
h2 {
  color: var(--color-primary);
}
</style>