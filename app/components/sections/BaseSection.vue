<script setup lang="ts">
interface SectionContent {
  brow?: string
  title?: string
  tagline?: string
}

interface Props {
  id?: string
  title?: string
  description?: string
  content?: SectionContent
  size?: 'm' | 'l'
  color?: 'default' | 'muted' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'm',
  color: 'default'
})

const sectionContent = computed(() => {
  if (props.content) {
    return props.content
  }
  return {
    brow: undefined,
    title: props.title,
    tagline: props.description
  }
})

const sectionClasses = computed(() => {
  const classes: string[] = []

  // Color variants
  if (props.color !== 'default') {
    classes.push(`color-${props.color}`)
  }

  // Size variants
  if (props.size !== 'm') {
    classes.push(`size-${props.size}`)
  }

  return classes.join(' ')
})
</script>

<template>
  <UPageSection
    :id="id"
    :class="sectionClasses"
  >
    <SectionHeader
      v-if="sectionContent.brow || sectionContent.title || sectionContent.tagline"
      :brow="sectionContent.brow"
      :title="sectionContent.title"
      :tagline="sectionContent.tagline"
    />
    <slot />
  </UPageSection>
</template>

<style scoped>
.color-muted {
  background-color: var(--ui-bg-muted);
}

.color-accent {
  background-color: var(--ui-bg-accented);
}

.size-l {
  padding: var(--spacing-12) var(--spacing-16) var(--spacing-24);
}

</style>