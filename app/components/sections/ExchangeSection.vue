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
    <div class="flex gap-16 items-center">
      <!-- Left Image -->
      <div class="flex-1 h-full relative rounded-lg rounded-br-lg rounded-tr-lg overflow-hidden bg-muted border border-border">
        <img
          alt=""
          class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-lg size-full"
          src="/images/workshop-image-1.png"
        />
      </div>

      <!-- Right Content -->
      <div class="flex-1 flex flex-col gap-8">
        <div class="flex flex-col gap-8">
          <ExchangeCard
            v-for="(item, index) in items"
            :key="index"
            :title="item.title"
            :description="item.description"
            :icon="item.icon"
          />
        </div>
        <div v-if="primaryAction || secondaryAction" class="flex gap-6">
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
    </div>
  </BaseSection>
</template>

