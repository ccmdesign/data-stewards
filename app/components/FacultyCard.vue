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
  <UCard
    as="article"
    class="h-full overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    :ui="{ header: 'p-0 sm:px-0', body: 'flex-1' }"
    @click="handleClick"
  >
    <template #header>
      <div class="relative aspect-square w-full overflow-hidden bg-muted rounded-t-lg">
        <img
          :src="faculty.avatar.src"
          :alt="faculty.avatar.alt || `${faculty.name} headshot`"
          class="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        >
      </div>
    </template>

    <template #default>
      <div class="space-y-3">
        <div>
          <h3 class="text-lg font-semibold">
            {{ faculty.name }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ faculty.description }}
          </p>
          <span
            v-if="faculty.categoryLabel"
            class="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
          >
            {{ faculty.categoryLabel }}
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>

