<script setup lang="ts">
interface Props {
  title: string
  description: string
  image?: string
  icon?: string
  to?: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group relative flex flex-col overflow-hidden rounded-xl h-[400px] w-full transition-transform duration-300 hover:scale-[1.02]"
  >
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div v-else class="h-full w-full bg-gray-200 dark:bg-gray-800" />
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-neutral-500 to-white mix-blend-multiply opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

    <!-- Content -->
    <div class="relative mt-auto flex flex-col gap-4 p-8">
      <UIcon
        v-if="icon"
        :name="icon"
        class="h-10 w-10 text-primary-400"
      />
      
      <div class="flex flex-col gap-2">
        <h3 class="text-3xl font-bold text-white">
          {{ title }}
        </h3>
        <p class="text-lg text-gray-200 font-medium leading-snug max-w-[90%]">
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
