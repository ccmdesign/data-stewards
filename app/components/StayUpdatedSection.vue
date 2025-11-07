<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface StayUpdatedItem {
  title: string
  description: string
  primaryCta?: ButtonProps
  secondaryCta?: ButtonProps
}

interface Props {
  cards: StayUpdatedItem[]
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="stay-updated"
    title="Stay Updated"
    description="Curated briefings, resources, and updates from the frontlines of responsible data stewardship."
    padding="large"
    no-margin
  >
    <div class="grid gap-8 lg:grid-cols-2">
      <StayUpdatedCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :description="card.description"
        :primary-cta="card.primaryCta"
        :secondary-cta="card.secondaryCta"
      />
    </div>
  </BaseSection>
</template>

