<script setup lang="ts">
import { computed, watchEffect } from 'vue'

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

const tabValue = ref<'all' | 'instructor' | 'guest-faculty'>('all')

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
    .map((item: any) => {
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
      icon: 'i-lucide-users',
      value: 'all',
      badge: counts.all,
      disabled: false
    },
    {
      label: 'Instructors',
      icon: 'i-lucide-graduation-cap',
      value: 'instructor',
      badge: counts.instructor ?? 0,
      disabled: (counts.instructor ?? 0) === 0
    },
    {
      label: 'Guest Faculty',
      icon: 'i-lucide-user-plus',
      value: 'guest-faculty',
      badge: counts['guest-faculty'] ?? 0,
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
</script>

<template>
  <div class="relative">
    <section
      class="relative isolate overflow-hidden border border-primary/20 bg-primary/10 py-16 sm:py-24"
    >
      <HeroBackground />

      <div class="px-6 sm:px-12">
        <UPageHero
          class="relative z-10 mx-auto max-w-4xl text-left"
          description="Explore the instructors, advisors, and guest experts who shape our curriculum and support every cohort."
        >
          <template #title>
            <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span class="mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Our Faculty
              </span>
              Meet the leaders guiding the Data Stewards Academy
            </h1>
          </template>
        </UPageHero>
      </div>
    </section>

    <UPage>
      <UPageBody class="py-0 sm:py-0 md:py-0 lg:py-0 xl:py-0">
        <UPageSection id="faculty-directory">
          <template #links>
            <div class="w-full overflow-x-auto">
              <UTabs
                v-model="tabValue"
                :items="tabItems"
                :content="false"
                size="md"
                variant="pill"
              />
            </div>
          </template>

          <template v-if="facultyMembers.length">
            <UPageGrid class="gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <UCard
                v-for="person in facultyMembers"
                :key="person.id"
                as="article"
                class="h-full overflow-hidden flex flex-col"
                :ui="{ header: 'p-0 sm:px-0', body: 'flex-1' }"
              >
                <template #header>
                  <div class="relative aspect-square w-full overflow-hidden bg-muted rounded-t-lg">
                    <img
                      :src="person.avatar.src"
                      :alt="person.avatar.alt || `${person.name} headshot`"
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                </template>

                <template #default>
                  <div class="space-y-3">
                    <div>
                      <h3 class="text-lg font-semibold">{{ person.name }}</h3>
                      <p class="text-sm text-muted-foreground">{{ person.description }}</p>
                    </div>
                  </div>
                </template>

                <template #footer>
                  <div class="flex items-center justify-between text-sm">
                    <span v-if="person.categoryLabel" class="text-muted-foreground">{{ person.categoryLabel }}</span>
                    <NuxtLink
                      :to="person.path"
                      class="font-medium text-primary hover:underline"
                    >
                      View profile
                    </NuxtLink>
                  </div>
                </template>
              </UCard>
            </UPageGrid>
          </template>

          <template v-else>
            <div class="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
              <p v-if="tabValue !== 'all'">No faculty members found in this category.</p>
              <p v-else>Faculty profiles will appear here once added to the collection.</p>
            </div>
          </template>
        </UPageSection>
      </UPageBody>
    </UPage>
  </div>
</template>

