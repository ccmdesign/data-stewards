<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface DeepdiveCard {
  title: string
  image: string
  to?: string
}

interface Props {
  topics: DeepdiveCard[]
  primaryAction?: ButtonProps
  secondaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="deep-dives"
    title="Deep Dives"
    description="Focused 1-hour masterclasses for experienced stewards who want to specialize in specific topics."
    variant="muted"
    padding="large"
    no-margin
  >
    <UPageColumns class="lg:columns-3">
      <DeepdiveCard
        v-for="(topic, index) in topics"
        :key="index"
        :title="topic.title"
        :image="topic.image"
        :to="topic.to"
      />
    </UPageColumns>
    <div v-if="primaryAction || secondaryAction" class="mt-6 flex justify-center gap-3">
      <UButton
        v-if="primaryAction"
        v-bind="primaryAction"
      />
      <UButton
        v-if="secondaryAction"
        v-bind="secondaryAction"
      />
    </div>
  </BaseSection>
</template>

