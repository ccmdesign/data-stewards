<script setup lang="ts">
interface DeepdiveCardProps {
  title: string
  image?: string
  icon?: string
  to?: string
}

const props = defineProps<DeepdiveCardProps>()

const iconMap: Record<string, string> = {
  'Social License & Digital Self-Determination': 'i-lucide-shield',
  'Legal & Ethical Readiness': 'i-lucide-book-open',
  'Designing Data Spaces & Interoperability': 'i-lucide-file-text',
  'Data Contracts & Governance Agreements': 'i-lucide-target',
  'Evaluation, KPIs & Value Realization': 'i-lucide-database',
  'Synthetic Data & Privacy-Enhancing Technologies': 'i-lucide-dna'
}

const getIcon = (title: string) => {
  return iconMap[title] || 'i-lucide-circle'
}
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 transition-all duration-300 hover:border-primary-500/50 hover:shadow-2xl hover:-translate-y-1"
  >
    <!-- Hover Gradient Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div class="relative z-10 flex flex-col h-full p-8 gap-6">
      <!-- Icon Box -->
      <div class="p-3 bg-neutral-800/50 rounded-lg w-fit group-hover:bg-primary-500/20 transition-colors duration-300">
        <UIcon
          :name="icon || getIcon(title)"
          class="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors"
        />
      </div>
      
      <h3 class="text-xl font-bold text-white leading-snug group-hover:text-primary-50 transition-colors">
        {{ title }}
      </h3>

      <!-- Arrow (Visual Indicator) -->
      <div class="mt-auto pt-4 flex items-center text-primary-400 font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span>Explore Topic</span>
        <UIcon name="i-lucide-arrow-right" class="ml-2 w-4 h-4" />
      </div>
    </div>
  </NuxtLink>
</template>

