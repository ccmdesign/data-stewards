<script setup lang="ts">
interface ExchangeCardProps {
  title: string
  description: string
  icon?: string
}

const props = defineProps<ExchangeCardProps>()

const iconMap: Record<string, string> = {
  'Data Stewardship Slack Channel': '/images/icon-slack.svg',
  'Events & Salons': '/images/icon-users.svg',
  'Datathons': '/images/icon-target.svg',
  'Trends to Watch': '/images/icon-target.svg'
}

const getIcon = (title: string) => {
  return iconMap[title] || '/images/icon-target.svg'
}
</script>

<template>
  <div class="bg-[#f8fafc] border border-[#e2e8f0] flex flex-col gap-8 p-8">
    <div class="w-6 h-6">
      <img
        :src="icon || getIcon(title)"
        :alt="title"
        class="w-6 h-6"
      />
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-semibold leading-8">
        {{ title }}
      </h3>
      <p class="text-base text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </div>
</template>

