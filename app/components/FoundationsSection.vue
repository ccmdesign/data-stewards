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
    title="Data Stewardship Foundations"
    description="Our flagship, hands-on program for leaders building data stewardship maturity. Learn to define purpose, design trust frameworks, and operationalize stewardship."
    padding="large"
    no-margin
  >
    <div class="space-y-6">
      <div class="grid gap-4 lg:grid-cols-2">
        <FoundationsCard
          v-for="(format, index) in formats"
          :key="index"
          :title="format.title"
          :badge="format.badge"
          :description="format.description"
        />
      </div>

      <OutcomesCard
        :outcomes="outcomes"
        :primary-action="primaryAction"
        :secondary-action="secondaryAction"
      />
    </div>
  </BaseSection>
</template>

