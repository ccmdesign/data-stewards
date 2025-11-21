<script setup lang="ts">
interface OrganizationCardProps {
  title: string
  description: string
}

defineProps<OrganizationCardProps>()
</script>

<template>
  <div class="bg-white rounded-2xl px-6 py-8 shadow-lg border border-gray-100 flex flex-col gap-4 relative group hover:shadow-xl transition-shadow duration-300 h-full">
    <!-- Arrow Icon -->
    <div class="absolute top-8 right-8 text-gray-300 group-hover:text-[#38BDF8] transition-colors duration-300">
      <UIcon name="i-lucide-arrow-up-right" class="w-6 h-6" />
    </div>

    <h3 class="text-2xl font-bold text-gray-900 pr-8">
      {{ title }}
    </h3>
    
    <p class="text-gray-600 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
