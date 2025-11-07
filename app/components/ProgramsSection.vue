<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

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
</script>

<template>
  <BaseSection
    id="programs"
    title="Our Programs"
    description="From foundational bootcamps to deep dives, we offer comprehensive training for every stage of your data stewardship journey."
    variant="muted"
    no-margin
  >
    <ProgramCards :cards="cards" :columns="columns" />
  </BaseSection>
</template>

