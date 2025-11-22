<script setup lang="ts">
interface ContentCardProps {
  title: string
  description: string
  icon?: string
  badge?: string
  to?: string
}

const props = defineProps<ContentCardProps>()

const isInteractive = computed(() => !!props.to)
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    :to="to"
    class="flex flex-col h-full bg-white rounded-2xl p-8 shadow-lg transition-all duration-300"
    :class="{
      'hover:scale-[1.02] hover:shadow-xl cursor-pointer': isInteractive
    }"
  >
    <!-- Header Slot or Icon -->
    <div v-if="$slots.header || icon" class="mb-6">
      <slot name="header">
        <div v-if="icon" class="w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg text-primary-500">
          <UIcon :name="icon" class="w-6 h-6" />
        </div>
      </slot>
    </div>

    <div class="flex flex-col gap-4 flex-1">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-2xl font-bold text-gray-900">
          {{ title }}
        </h3>
        <UBadge v-if="badge" variant="subtle" color="primary" class="shrink-0">
          {{ badge }}
        </UBadge>
      </div>
      
      <p class="text-gray-600 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Footer Slot -->
    <div v-if="$slots.footer" class="mt-8 pt-4">
      <slot name="footer" />
    </div>
  </component>
</template>
