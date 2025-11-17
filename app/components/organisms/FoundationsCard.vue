<script setup lang="ts">
interface FoundationsCardProps {
  title: string
  badge: string
  description: string
}

defineProps<FoundationsCardProps>()
</script>

<template>
  <UCard class="bg-white border min-w-[400px] flex-1">
    <div class="flex flex-col">
      <div class="flex flex-col h-[65px] px-6 py-4">
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
      </div>
      <div class="border-t border-b px-6 py-6">
        <p class="text-base text-muted-foreground">{{ description }}</p>
      </div>
    </div>
  </UCard>
</template>

