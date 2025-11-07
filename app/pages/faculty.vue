<script setup lang="ts">
import { computed, watchEffect } from 'vue'

definePageMeta({
  layout: 'default'
})

const { setPageHero } = usePageHero()

// Set page hero data
setPageHero({
  title: 'Faculty Directory',
  subtitle: 'Our Experts',
  description: 'Meet our world-class faculty of data stewardship experts, instructors, and guest lecturers.',
  showHero: true
})

type FacultyCard = {
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

const { data: rawFaculty } = await useAsyncData('faculty-directory', () =>
  queryCollection('faculty').all()
)

// Type assertion to access Nuxt Content's auto-generated properties
type FacultyItem = any

const tabValue = ref<'all' | 'instructor' | 'guest-faculty'>('all')
const isModalOpen = ref(false)
const selectedFaculty = ref<FacultyCard | null>(null)

const formatLabel = (value: string | null | undefined) => {
  if (!value) {
    return ''
  }

  return value
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const allFacultyMembers = computed<FacultyCard[]>(() => {
  const items = rawFaculty.value ?? []
  const fallbackImage = '/images/light/connect.svg' // Placeholder image - will be replaced with actual faculty photos

  return items
    .map((item: FacultyItem) => {
      const path = item.path || item._path || ''
      const fileName = path.split('/').pop()?.replace(/\.md$/, '') || item.name?.toLowerCase().replace(/\s+/g, '-') || ''
      const fallbackName = formatLabel(fileName)
      const name = item.name || item.title || fallbackName
      const category = item.category || ''
      const categoryLabel = formatLabel(category)
      const description = item.role || item.affiliation || categoryLabel
      const finalPath = path || (fileName ? `/faculty/${fileName}` : '/faculty')
      const avatarSrc = item.image || item.headshot || item.photo || fallbackImage

      return {
        id: item._id || fileName || name,
        path: finalPath,
        name,
        description,
        category,
        categoryLabel,
        avatar: {
          src: avatarSrc,
          alt: name ? `${name} headshot` : undefined
        }
      }
    })
    .filter(member => Boolean(member.name) && Boolean(member.path))
    .sort((a, b) => a.name.localeCompare(b.name))
})

const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: 0 }

  for (const member of allFacultyMembers.value) {
    counts.all = (counts.all ?? 0) + 1
    const category = member.category || ''
    if (category) {
      counts[category] = (counts[category] ?? 0) + 1
    }
  }

  return counts
})

const tabItems = computed(() => {
  const counts = categoryCounts.value

  return [
    {
      label: 'All',
      value: 'all',
      disabled: false
    },
    {
      label: 'Instructors',
      value: 'instructor',
      disabled: (counts.instructor ?? 0) === 0
    },
    {
      label: 'Guest Faculty',
      value: 'guest-faculty',
      disabled: (counts['guest-faculty'] ?? 0) === 0
    }
  ]
})

watchEffect(() => {
  if (!tabItems.value.some(item => item.value === tabValue.value && !item.disabled)) {
    tabValue.value = 'all'
  }
})

const facultyMembers = computed(() => {
  const category = tabValue.value

  if (category === 'all') {
    return allFacultyMembers.value
  }

  return allFacultyMembers.value.filter(member => member.category === category)
})

const openFacultyModal = (faculty: FacultyCard) => {
  selectedFaculty.value = faculty
  isModalOpen.value = true
}

const closeFacultyModal = () => {
  isModalOpen.value = false
  selectedFaculty.value = null
}
</script>

<template>
  <div class="relative">
    <UPageSection id="faculty-directory">
      <div class="flex flex-wrap gap-2 justify-center">
          <UButton
            v-for="item in tabItems"
            :key="item.value"
            :variant="tabValue === item.value ? 'solid' : 'outline'"
            :disabled="item.disabled"
            :size="'md'"
            @click="tabValue = item.value as typeof tabValue"
          >
            {{ item.label }}
          </UButton>
        </div>
          <template v-if="facultyMembers.length">
            <UPageGrid class="gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <UCard
                v-for="person in facultyMembers"
                :key="person.id"
                as="article"
                class="h-full overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                :ui="{ header: 'p-0 sm:px-0', body: 'flex-1' }"
                @click="openFacultyModal(person)"
              >
                <template #header>
                  <div class="relative aspect-square w-full overflow-hidden bg-muted rounded-t-lg">
                    <img
                      :src="person.avatar.src"
                      :alt="person.avatar.alt || `${person.name} headshot`"
                      class="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    >
                  </div>
                </template>

                <template #default>
                  <div class="space-y-3">
                    <div>
                      <h3 class="text-lg font-semibold">
                        {{ person.name }}
                      </h3>
                      <p class="text-sm text-muted-foreground">
                        {{ person.description }}
                      </p>
                      <span
                        v-if="person.categoryLabel"
                        class="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
                      >
                        {{ person.categoryLabel }}
                      </span>
                    </div>
                  </div>
                </template>
              </UCard>
            </UPageGrid>
          </template>

          <template v-else>
            <div class="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              <p v-if="tabValue !== 'all'">
                No faculty members found in this category.
              </p>
              <p v-else>
                Faculty profiles will appear here once added to the collection.
              </p>
            </div>
          </template>
    </UPageSection>

    <UModal
      v-model:open="isModalOpen"
      :title="selectedFaculty?.name"
      @close="closeFacultyModal"
      :ui="{ content: 'max-w-2xl' }"
      class="transition-all duration-300"
    >
      <template v-if="selectedFaculty" #body>
        <div class="space-y-6">
          <!-- Faculty Avatar -->
          <div class="flex justify-center">
            <div class="relative aspect-square w-32 overflow-hidden rounded-full bg-muted animate-in fade-in slide-in-from-bottom-4 duration-500">
              <img
                :src="selectedFaculty.avatar.src"
                :alt="selectedFaculty.avatar.alt || `${selectedFaculty.name} headshot`"
                class="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              >
            </div>
          </div>

          <!-- Faculty Details -->
          <div class="space-y-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
            <div>
              <h3 class="text-xl font-semibold">{{ selectedFaculty.name }}</h3>
              <p class="text-muted-foreground">{{ selectedFaculty.description }}</p>
            </div>

            <div v-if="selectedFaculty.categoryLabel" class="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300">
              {{ selectedFaculty.categoryLabel }}
            </div>
          </div>

          <!-- Additional faculty information from the raw data -->
          <div v-if="selectedFaculty" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500">
            <div v-for="item in rawFaculty" :key="(item as any)._id">
              <div v-if="item.name === selectedFaculty.name" class="space-y-4">
                <!-- Role and Affiliation -->
                <div v-if="(item as any).role || (item as any).affiliation" class="space-y-2">
                  <div v-if="(item as any).role" class="text-sm">
                    <span class="font-semibold text-muted-foreground uppercase tracking-wide">Role:</span>
                    <span class="ml-2">{{ (item as any).role }}</span>
                  </div>
                  <div v-if="(item as any).affiliation" class="text-sm">
                    <span class="font-semibold text-muted-foreground uppercase tracking-wide">Affiliation:</span>
                    <span class="ml-2">{{ (item as any).affiliation }}</span>
                  </div>
                </div>

                <!-- Bio -->
                <div v-if="(item as any).bio" class="space-y-2">
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Bio</h4>
                  <div class="prose prose-sm max-w-none text-sm">
                    <MDC :value="(item as any).bio" />
                  </div>
                </div>

                <!-- Topic (for guest faculty) -->
                <div v-if="(item as any).topic" class="space-y-2">
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Topic</h4>
                  <p class="text-sm">{{ (item as any).topic }}</p>
                </div>

                <!-- Cohort (for guest faculty) -->
                <div v-if="(item as any).cohort" class="space-y-2">
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cohort</h4>
                  <p class="text-sm">{{ (item as any).cohort }}</p>
                </div>

                <!-- Expertise -->
                <div v-if="(item as any).expertise && (item as any).expertise.length" class="space-y-2">
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expertise</h4>
                  <div class="flex flex-wrap gap-2">
                    <UBadge v-for="skill in (item as any).expertise" :key="skill" variant="subtle">
                      {{ skill }}
                    </UBadge>
                  </div>
                </div>

                <!-- Connect Links -->
                <div v-if="(item as any).linkedin || (item as any).website" class="space-y-2">
                  <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Connect</h4>
                  <div class="flex flex-wrap gap-2">
                    <UButton
                      v-if="(item as any).linkedin"
                      :to="(item as any).linkedin"
                      target="_blank"
                      icon="i-lucide-linkedin"
                      variant="outline"
                      size="sm"
                    >
                      LinkedIn
                    </UButton>
                    <UButton
                      v-if="(item as any).website"
                      :to="(item as any).website"
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
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>