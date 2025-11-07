<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import type { FacultyCard } from '~/components/organisms/FacultyCard.vue'
import type { FilterItem } from '~/components/molecules/FiltersMenu.vue'

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

const { data: rawFaculty } = await useAsyncData('faculty-directory', () =>
  queryCollection('faculty').all()
)

// Type assertion to access Nuxt Content's auto-generated properties
type FacultyItem = any

const tabValue = ref<'all' | 'instructor' | 'guest-faculty'>('all')
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

const tabItems = computed<FilterItem[]>(() => {
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
}

const closeFacultyModal = () => {
  selectedFaculty.value = null
}
</script>

<template>
  <div class="relative">
    <BaseSection id="faculty-directory">
      <FiltersMenu
        v-model="tabValue"
        :items="tabItems"
      />
      <template v-if="facultyMembers.length">
        <UPageGrid class="gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <FacultyCard
            v-for="person in facultyMembers"
            :key="person.id"
            :faculty="person"
            @click="openFacultyModal"
          />
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
    </BaseSection>

    <FacultyModal
      :faculty="selectedFaculty"
      :raw-faculty-data="rawFaculty"
      @close="closeFacultyModal"
    />
  </div>
</template>