<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface ExchangeItem {
  title: string
  description: string
}

interface Props {
  items: ExchangeItem[]
  primaryAction?: ButtonProps
  secondaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="exchange"
    :content="{
      title: 'Exchange',
      tagline: 'A vibrant network for practitioners, alumni, and partners to stay engaged and share knowledge.'
    }"
    size="l"
    no-margin
  >
    <UPageColumns class="lg:columns-2">
      <ExchangeCard
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :description="item.description"
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

