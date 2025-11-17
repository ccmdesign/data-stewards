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
    variant="bordered"
    :ui="{
      root: 'min-w-[400px] flex-1',
      header: 'h-[65px] px-6 py-4',
      body: 'px-6 py-6'
    }"
  >
    <template #header>
      <div class="flex gap-2 items-center">
        <span class="flex-1 text-xl font-semibold leading-7">{{ title }}</span>
        <UBadge
          variant="subtle"
          color="primary"
          class="text-[10px] leading-3 px-1.5 py-1"
        >
          {{ badge }}
        </UBadge>
      </div>
    </template>
    <template #default>
      <p class="text-base text-muted-foreground">{{ description }}</p>
    </template>
  </UCard>
</template>

