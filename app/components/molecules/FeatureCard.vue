<script setup lang="ts">
interface FeatureCardProps {
  title: string
  description?: string
  image?: string
  icon?: string
  to?: string
  variant?: 'image-bg' | 'solid'
}

const props = withDefaults(defineProps<FeatureCardProps>(), {
  variant: 'solid'
})

const isInteractive = computed(() => !!props.to)
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    :to="to"
    class="group relative flex flex-col overflow-hidden rounded-xl transition-all duration-300"
    :class="[
      variant === 'image-bg' ? 'h-[400px]' : 'bg-neutral-900 border border-neutral-800',
      isInteractive ? 'hover:scale-[1.02] hover:shadow-xl cursor-pointer' : ''
    ]"
  >
    <!-- Image Background Variant -->
    <template v-if="variant === 'image-bg'">
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
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
    </template>

    <!-- Solid Variant Hover Effect -->
    <template v-else>
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </template>

    <!-- Content -->
    <div 
      class="relative flex flex-col gap-4 p-8 h-full"
      :class="variant === 'image-bg' ? 'justify-end mt-auto' : ''"
    >
      <!-- Icon (Solid Variant) -->
      <div 
        v-if="variant === 'solid' && icon" 
        class="p-3 bg-neutral-800/50 rounded-lg w-fit group-hover:bg-primary-500/20 transition-colors duration-300 mb-2"
      >
        <UIcon
          :name="icon"
          class="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors"
        />
      </div>

      <!-- Icon (Image Variant) -->
      <UIcon
        v-if="variant === 'image-bg' && icon"
        :name="icon"
        class="h-10 w-10 text-primary-400 mb-2"
      />
      
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-bold text-white leading-tight">
          {{ title }}
        </h3>
        <p 
          v-if="description"
          class="text-lg font-medium leading-snug max-w-[90%]"
          :class="variant === 'image-bg' ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'"
        >
          {{ description }}
        </p>
      </div>

      <!-- Arrow Indicator (Solid Variant) -->
      <div 
        v-if="variant === 'solid' && isInteractive"
        class="mt-auto pt-4 flex items-center text-primary-400 font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      >
        <span>Explore</span>
        <UIcon name="i-lucide-arrow-right" class="ml-2 w-4 h-4" />
      </div>
    </div>
  </component>
</template>
