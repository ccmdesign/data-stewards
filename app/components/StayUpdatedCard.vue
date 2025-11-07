<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface StayUpdatedCardProps {
  title: string
  description: string
  primaryCta?: ButtonProps
  secondaryCta?: ButtonProps
}

defineProps<StayUpdatedCardProps>()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-xl font-semibold">{{ title }}</h3>
    </template>
    <p class="text-muted">{{ description }}</p>
    <template #footer>
      <div class="flex flex-wrap items-center gap-3">
        <UButton
          v-if="primaryCta"
          v-bind="primaryCta"
        />
        <UButton
          v-if="secondaryCta"
          v-bind="secondaryCta"
        />
      </div>
    </template>
  </UCard>
</template>

