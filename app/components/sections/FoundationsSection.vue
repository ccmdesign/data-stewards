<script setup lang="ts">
interface FoundationsSectionProps {
  formats: Array<{
    title: string
    badge: string
    description: string
  }>
  outcomes: string[]
  primaryAction?: {
    label: string
    color?: string
    size?: string
    to?: string
  }
  secondaryAction?: {
    label: string
    variant?: string
    size?: string
    to?: string
  }
}

defineProps<FoundationsSectionProps>()
</script>

<template>
  <BaseSection
    id="foundations"
    :content="{
      title: 'Data Stewardship Foundations',
      tagline: 'Our flagship, hands-on program for leaders building data stewardship maturity. Learn to define purpose, design trust frameworks, and operationalize stewardship.'
    }"
    color="muted"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap gap-8">
        <FoundationsCard
          v-for="(format, index) in formats"
          :key="index"
          :title="format.title"
          :badge="format.badge"
          :description="format.description"
        />
      </div>

      <div class="h-[684px] relative rounded-2xl overflow-hidden">
        <img
          alt=""
          class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-2xl size-full"
          src="/images/foundations-workshop.png"
        />
      </div>
    </div>
  </BaseSection>
</template>

