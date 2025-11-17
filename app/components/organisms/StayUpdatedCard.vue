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
  <div class="bg-white border border-[#e2e8f0] rounded-2xl flex flex-col">
    <!-- Header -->
    <div class="h-[65px] px-6 py-4 flex items-center">
      <h3 class="text-2xl font-semibold">{{ title }}</h3>
    </div>
    <!-- Body -->
    <div class="border-t border-b border-[#e2e8f0] px-6 py-6">
      <p class="text-base text-muted-foreground text-center">{{ description }}</p>
    </div>
    <!-- Footer -->
    <div class="px-6 py-4">
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
    </div>
  </div>
</template>


