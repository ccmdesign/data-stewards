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
  <div class="bg-white rounded-2xl px-6 py-8 shadow-lg border border-gray-100 flex flex-col gap-6 relative group hover:shadow-xl transition-shadow duration-300 h-full">
    <div class="flex flex-col gap-4 flex-1">
      <h3 class="text-2xl font-bold text-gray-900">
        {{ title }}
      </h3>
      
      <p class="text-gray-600 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-4 mt-auto">
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
</template>


