<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface Props {
  title: string
  description: string
  links?: ButtonProps[]
  variant?: 'default' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const sectionClass = computed(() => {
  return props.variant === 'primary' ? 'bg-primary/10' : ''
})
</script>

<template>
  <section :class="sectionClass">
    <UContainer class="py-12 sm:py-16 lg:py-24">
      <UPageCTA
        :title="title"
        :description="description"
        :links="links"
        variant="naked"
        class="rounded-none"
      />
    </UContainer>
  </section>
</template>

