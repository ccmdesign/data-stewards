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
    <div class="relative">
      <!-- Background Image Container -->
      <div class="h-[500px] relative rounded-2xl overflow-hidden">
        <img
          alt=""
          class="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/images/foundations-workshop.png"
        />
        <!-- Overlay to ensure text readability if needed, though design shows clean image -->
        <div class="absolute inset-0 bg-black/10" />
      </div>

      <!-- Cards Container - Overlapping -->
      <div class="relative -mt-32 px-8 pb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FoundationsCard
            v-for="(format, index) in formats"
            :key="index"
            :title="format.title"
            :badge="format.badge"
            :description="format.description"
            class="bg-white"
          />
        </div>
      </div>
    </div>
  </BaseSection>
</template>

