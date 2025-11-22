<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface DeepdiveCard {
  title: string
  image?: string
  icon?: string
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
    :content="{
      title: 'Deep Dives',
      tagline: 'Focused 1-hour masterclasses for experienced stewards who want to specialize in specific topics.'
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          v-for="(topic, index) in topics"
          :key="index"
          :title="topic.title"
          :icon="topic.icon"
          :to="topic.to"
          variant="solid"
        />
      </div>
      <div v-if="primaryAction || secondaryAction" class="flex justify-center gap-6">
        <UButton
          v-if="primaryAction"
          v-bind="primaryAction"
        />
        <UButton
          v-if="secondaryAction"
          v-bind="secondaryAction"
        />
      </div>
    </div>
  </BaseSection>
</template>

