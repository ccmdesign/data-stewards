<script setup lang="ts">
import type { FacultyCard } from './FacultyCard.vue'

type FacultyItem = {
  name?: string
  role?: string
  affiliation?: string
  bio?: string
  topic?: string
  cohort?: string
  expertise?: string[]
  linkedin?: string
  website?: string
}

interface Props {
  faculty: FacultyCard | null
  rawFacultyData?: FacultyItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const isOpen = computed(() => Boolean(props.faculty))

const facultyDetails = computed(() => {
  if (!props.faculty || !props.rawFacultyData) {
    return null
  }

  return props.rawFacultyData.find(item => item.name === props.faculty?.name)
})

const handleClose = () => {
  emit('close')
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      handleClose()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<template>
  <UModal
    :open="isOpen"
    :title="faculty?.name"
    @close="handleClose"
    @update:open="(value) => !value && handleClose()"
    :dismissible="true"
    :ui="{ content: 'max-w-2xl' }"
    class="transition-all duration-300"
  >
    <template v-if="faculty" #body>
      <div class="space-y-6">
        <!-- Faculty Avatar -->
        <div class="flex justify-center">
          <div class="relative aspect-square w-32 overflow-hidden rounded-full bg-muted animate-in fade-in slide-in-from-bottom-4 duration-500">
            <img
              :src="faculty.avatar.src"
              :alt="faculty.avatar.alt || `${faculty.name} headshot`"
              class="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
            >
          </div>
        </div>

        <!-- Faculty Details -->
        <div class="space-y-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
          <div>
            <h3 class="text-xl font-semibold">{{ faculty.name }}</h3>
            <p class="text-muted-foreground">{{ faculty.description }}</p>
          </div>

          <div v-if="faculty.categoryLabel" class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
            {{ faculty.categoryLabel }}
          </div>
        </div>

        <!-- Additional faculty information from the raw data -->
        <div v-if="facultyDetails" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500">
          <!-- Role and Affiliation -->
          <div v-if="facultyDetails.role || facultyDetails.affiliation" class="space-y-2">
            <div v-if="facultyDetails.role" class="text-sm">
              <span class="font-semibold text-muted-foreground uppercase tracking-wide">Role:</span>
              <span class="ml-2">{{ facultyDetails.role }}</span>
            </div>
            <div v-if="facultyDetails.affiliation" class="text-sm">
              <span class="font-semibold text-muted-foreground uppercase tracking-wide">Affiliation:</span>
              <span class="ml-2">{{ facultyDetails.affiliation }}</span>
            </div>
          </div>

          <!-- Bio -->
          <div v-if="facultyDetails.bio" class="space-y-2">
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Bio</h4>
            <div class="prose prose-sm max-w-none text-sm">
              <MDC :value="facultyDetails.bio" />
            </div>
          </div>

          <!-- Topic (for guest faculty) -->
          <div v-if="facultyDetails.topic" class="space-y-2">
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Topic</h4>
            <p class="text-sm">{{ facultyDetails.topic }}</p>
          </div>

          <!-- Cohort (for guest faculty) -->
          <div v-if="facultyDetails.cohort" class="space-y-2">
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cohort</h4>
            <p class="text-sm">{{ facultyDetails.cohort }}</p>
          </div>

          <!-- Expertise -->
          <div v-if="facultyDetails.expertise && facultyDetails.expertise.length" class="space-y-2">
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expertise</h4>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="skill in facultyDetails.expertise" :key="skill" variant="subtle">
                {{ skill }}
              </UBadge>
            </div>
          </div>

          <!-- Connect Links -->
          <div v-if="facultyDetails.linkedin || facultyDetails.website" class="space-y-2">
            <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Connect</h4>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-if="facultyDetails.linkedin"
                :to="facultyDetails.linkedin"
                target="_blank"
                icon="i-lucide-linkedin"
                variant="outline"
                size="sm"
              >
                LinkedIn
              </UButton>
              <UButton
                v-if="facultyDetails.website"
                :to="facultyDetails.website"
                target="_blank"
                icon="i-lucide-external-link"
                variant="outline"
                size="sm"
              >
                Website
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

