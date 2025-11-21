<script setup lang="ts">
interface FoundationsCardProps {
  title: string
  badge: string
  description: string
}

defineProps<FoundationsCardProps>()
</script>

<template>
  <UCard
    :ui="{
      root: 'flex-1 shadow-lg border-0 ring-0',
      body: 'flex flex-col gap-4 p-6'
    }"
  >
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-gray-900">
        {{ title }}
      </h3>
      <div>
        <UBadge
          variant="subtle"
          class="bg-blue-50 text-blue-500 font-medium px-2.5 py-0.5 text-xs rounded-full"
        >
          {{ badge }}
        </UBadge>
      </div>
    </div>
    <p class="text-sm text-gray-500 leading-relaxed">
      {{ description }}
    </p>
  </UCard>
</template>

