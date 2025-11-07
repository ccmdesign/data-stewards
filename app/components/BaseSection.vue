<script setup lang="ts">
interface Props {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'muted' | 'primary'
  padding?: 'default' | 'large'
  noMargin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'default',
  noMargin: false
})

const sectionClasses = computed(() => {
  const classes: string[] = []

  // Background variants
  if (props.variant === 'muted') {
    classes.push('bg-gray-50')
  } else if (props.variant === 'primary') {
    classes.push('bg-primary/10')
  }

  // Padding variants
  if (props.padding === 'large') {
    classes.push('!py-12 sm:!py-16 lg:!py-24')
  }

  // Margin
  if (props.noMargin) {
    classes.push('mb-0')
  }

  return classes.join(' ')
})
</script>

<template>
  <UPageSection
    :id="id"
    :title="title"
    :description="description"
    :class="sectionClasses"
    class="base-section"
  >
    <slot />
  </UPageSection>
</template>

<style scoped>
.base-section {
}
</style>