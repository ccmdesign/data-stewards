<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface Props {
  title: string
  tagline?: string
  imageSrc: string
  imageAlt: string
  primaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    :content="{
      title: title,
      tagline: tagline
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col items-center">
      <!-- Image Container -->
      <div class="w-full relative rounded-3xl overflow-hidden h-[500px] z-0">
        <img
          :alt="imageAlt"
          class="absolute inset-0 w-full h-full object-cover"
          :src="imageSrc"
        />
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <!-- Cards Container -->
      <div class="w-full max-w-7xl px-6 lg:px-8 relative z-10 -mt-32">
        <slot />
      </div>

      <!-- CTA Button -->
      <div v-if="primaryAction" class="mt-16 relative z-10">
        <UButton 
          v-bind="primaryAction"
          size="xl"
          class="px-8 font-semibold"
        />
      </div>
    </div>
  </BaseSection>
</template>
