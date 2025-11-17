<script setup lang="ts">
interface CollaborationCardProps {
  title: string
  body: string
}

defineProps<CollaborationCardProps>()
</script>

<template>
  <div class="bg-white border border-[#e2e8f0] rounded-2xl flex flex-col h-full">
    <!-- Header -->
    <div class="px-6 py-4">
      <h3 class="text-2xl font-semibold">{{ title }}</h3>
    </div>
    <!-- Body -->
    <div class="border-t border-b border-[#e2e8f0] px-6 py-6 flex-1">
      <p class="text-base text-muted-foreground text-center">{{ body }}</p>
    </div>
    <!-- Footer -->
    <div class="px-6 py-4">
      <UButton
        label="Contact Us"
        to="/contact"
        color="primary"
        size="lg"
      />
    </div>
  </div>
</template>


