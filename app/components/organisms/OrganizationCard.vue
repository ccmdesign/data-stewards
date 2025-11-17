<script setup lang="ts">
interface OrganizationCardProps {
  title: string
  description: string
}

defineProps<OrganizationCardProps>()
</script>

<template>
  <UCard class="bg-muted border flex-1 relative">
    <div class="flex flex-col gap-8 p-8">
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-semibold leading-8">
          {{ title }}
        </h3>
        <p class="text-base text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="absolute top-2 right-2 w-3 h-3 text-muted-foreground"
      />
    </div>
  </UCard>
</template>

