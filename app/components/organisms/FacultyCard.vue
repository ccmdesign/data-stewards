<script setup lang="ts">
export type FacultyCard = {
  id: string
  path: string
  name: string
  description: string
  category: string
  categoryLabel: string
  avatar: {
    src: string
    alt?: string
  }
}

interface Props {
  faculty: FacultyCard
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [faculty: FacultyCard]
}>()

const handleClick = () => {
  emit('click', props.faculty)
}
</script>

<template>
  <div
    class="group flex flex-col gap-4 cursor-pointer"
    @click="handleClick"
  >
    <!-- Image -->
    <div class="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-md">
      <img
        :src="faculty.avatar.src"
        :alt="faculty.avatar.alt || `${faculty.name} headshot`"
        class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      >
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-3 px-4">
      <!-- Name -->
      <h3 class="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
        {{ faculty.name }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 line-clamp-3 leading-relaxed">
        {{ faculty.description }}
      </p>

      <!-- Category -->
      <div v-if="faculty.categoryLabel">
        <span class="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {{ faculty.categoryLabel }}
        </span>
      </div>
    </div>
  </div>
</template>

