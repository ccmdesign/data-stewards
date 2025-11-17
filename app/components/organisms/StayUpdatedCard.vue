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
  <UCard
    variant="bordered"
    radius="2xl"
    :ui="{
      header: 'h-[65px] px-6 py-4 flex items-center',
      body: 'px-6 py-6',
      footer: 'px-6 py-4'
    }"
  >
    <template #header>
      <h3 class="text-2xl font-semibold">{{ title }}</h3>
    </template>
    <template #default>
      <p class="text-base text-muted-foreground text-center">{{ description }}</p>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center gap-4">
        <UButton
          v-if="primaryCta"
          v-bind="primaryCta"
          size="lg"
        />
        <UButton
          v-if="secondaryCta"
          v-bind="secondaryCta"
          variant="outline"
          size="lg"
        />
      </div>
    </template>
  </UCard>
</template>


