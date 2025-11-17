<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface Props {
  title: string
  description: string
  primaryAction?: ButtonProps
  secondaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <UPageSection
    id="final-cta"
    class="bg-[#10193f] rounded-tl-[32px] rounded-tr-[32px]"
  >
    <div class="flex flex-col gap-8 items-center py-32 px-28">
      <div class="flex flex-col gap-6 items-center text-center">
        <h2 class="text-5xl font-semibold leading-[48px] text-white">
          {{ title }}
        </h2>
        <p class="text-base leading-6 text-[#90a1b9]">
          {{ description }}
        </p>
      </div>
      <div v-if="primaryAction || secondaryAction" class="flex gap-6 items-center">
        <UButton
          v-if="primaryAction"
          v-bind="primaryAction"
          size="lg"
        />
        <UButton
          v-if="secondaryAction"
          v-bind="secondaryAction"
          size="lg"
          variant="outline"
          class="bg-[#f8fafc] border-[#cad5e2] text-[#314158] hover:bg-[#f1f5f9]"
        />
      </div>
    </div>
  </UPageSection>
</template>

