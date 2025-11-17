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
  <UCard
    variant="muted"
    :ui="{ root: 'flex-1 relative', body: 'flex flex-col gap-8 p-8' }"
  >
    <UIcon
      :name="icon || getIcon(title)"
      class="w-6 h-6 text-primary"
    />
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-semibold">
        {{ title }}
      </h3>
    </div>
    <UIcon
      name="i-lucide-arrow-up-right"
      class="absolute top-2 right-2 w-3 h-3 text-muted-foreground"
    />
  </UCard>
</template>

