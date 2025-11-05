<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'

const { setPageHero } = usePageHero()

const heroLinks: ButtonProps[] = [
  { label: 'Browse Updates', to: '#news-feed', color: 'primary', size: 'lg' }
]

setPageHero({
  showHero: true,
  title: 'Latest stories, events, and media from Data Stewards Academy',
  subtitle: 'Newsroom',
  description: 'Track program launches, alumni spotlights, upcoming events, and recorded talks from across the community.',
  links: heroLinks
})

useSeoMeta({
  title: 'News',
  description: 'Track program launches, alumni spotlights, upcoming events, and recorded talks from across the community.'
})

const searchTerm = ref('')
const tabValue = ref<'all' | 'blog' | 'interviews' | 'videos' | 'events'>('all')

const filterDefinitions = [
  { value: 'blog', label: 'Blog Posts', icon: 'i-lucide-file-text' },
  { value: 'interviews', label: 'Interviews', icon: 'i-lucide-mic' },
  { value: 'videos', label: 'Videos', icon: 'i-lucide-video' },
  { value: 'events', label: 'Events', icon: 'i-lucide-calendar' }
] as const

const categoryLabels: Record<string, string> = {
  blog: 'Blog',
  interviews: 'Interview',
  videos: 'Video',
  events: 'Event'
}

const { data: postsData } = await useAsyncData('news-posts', () =>
  queryCollection('posts')
    .order('date', 'DESC')
    .all()
)

const posts = computed(() => postsData.value ?? [])

const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: 0 }

  for (const post of posts.value) {
    counts.all = (counts.all ?? 0) + 1
    const category = post.category ?? 'blog'
    counts[category] = (counts[category] ?? 0) + 1
  }

  return counts
})

const tabItems = computed(() => {
  const counts = categoryCounts.value

  return [
    {
      label: 'All',
      icon: 'i-lucide-layers',
      value: 'all',
      badge: counts.all,
      disabled: false
    },
    ...filterDefinitions.map(definition => ({
      label: definition.label,
      icon: definition.icon,
      value: definition.value,
      badge: counts[definition.value] ?? 0,
      disabled: (counts[definition.value] ?? 0) === 0
    }))
  ]
})

watchEffect(() => {
  if (!tabItems.value.some(item => item.value === tabValue.value && !item.disabled)) {
    tabValue.value = 'all'
  }
})

const activeCategory = computed(() => tabValue.value)

const normalizedSearch = computed(() => searchTerm.value.trim().toLowerCase())

const featuredPosts = computed(() => {
  const discovered = posts.value.filter(post => post.featured)
  const remainder = posts.value.filter(post => !post.featured)
  const pool = discovered.length >= 4 ? discovered : [...discovered, ...remainder]
  const unique: typeof pool = []
  const seen = new Set<string>()

  for (const post of pool) {
    const key = post.slug ?? post.path
    if (key && !seen.has(key)) {
      unique.push(post)
      seen.add(key)
    }
    if (unique.length === 4) {
      break
    }
  }

  return unique
})

const featuredSlugs = computed(() => new Set(featuredPosts.value.map(post => post.slug ?? post.path)))

const filteredPosts = computed(() => {
  const category = activeCategory.value
  const search = normalizedSearch.value

  return posts.value.filter(post => {
    if (featuredSlugs.value.has(post.slug ?? post.path)) {
      return false
    }

    if (category !== 'all' && post.category !== category) {
      return false
    }

    if (!search) {
      return true
    }

    const haystack = [post.title, post.description, ...(post.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return haystack.includes(search)
  })
})

const formatDate = (input: string) => {
  const date = new Date(input)
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

const resolvePostLink = (post: any) => {
  const slug = post.slug ?? post.path
  return `/news/${slug}`
}

const emptyStateCopy = computed(() => {
  if (normalizedSearch.value) {
    return 'No posts match your search. Try another keyword.'
  }

  if (activeCategory.value !== 'all') {
    return 'Nothing published yet in this category. Check back soon.'
  }

  return 'No posts available right now.'
})

const getCategoryColor = (category: string | undefined): 'primary' | 'secondary' | 'success' | 'warning' => {
  const categoryMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning'> = {
    blog: 'primary',
    interviews: 'secondary',
    videos: 'success',
    events: 'warning'
  }
  return categoryMap[category ?? 'blog'] ?? 'primary'
}
</script>

<template>
  <div class="relative">
    <UPage>
      <UPageBody>
        <!-- Featured Posts Section -->
        <UPageSection
          v-if="featuredPosts.length > 0"
          id="featured-posts"
           class="py-0 my-0"
        >
          <UCarousel
            v-slot="{ item }"
            :items="featuredPosts"
            arrows
            slides-to-scroll="auto"
            :ui="{ 
              viewport: 'py-4 px-3 mx-auto border-r border-l border-gray-200 dark:border-gray-800',
              item: 'max-w-[80vw]'
            }"
          >
            <UCard
              :key="item.slug ?? item.path"
              :ui="{ root: 'flex flex-col h-full', body: 'flex-1' }"
            >
              <template #header>
                <div class="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <UBadge :label="categoryLabels[item.category] ?? 'Post'" variant="subtle" :color="getCategoryColor(item.category)" />
                  <span class="ml-auto whitespace-nowrap">{{ formatDate(item.date) }}</span>
                </div>
              </template>

              <template #default>
                <div class="space-y-3">
                  <NuxtLink :to="resolvePostLink(item)" class="block">
                    <span class="text-lg font-semibold leading-tight line-clamp-2">
                      {{ item.title }}
                    </span>
                  </NuxtLink>
                  <p class="text-sm text-muted-foreground line-clamp-3">
                    {{ item.description }}
                  </p>
                </div>
              </template>

              <template #footer>
                <div class="flex items-center justify-between gap-3">
                  <div v-if="item.category === 'events'" class="flex items-center gap-2 text-sm text-muted-foreground truncate">
                    <UIcon name="i-lucide-map-pin" class="h-4 w-4" />
                    <span class="truncate">{{ item.location }}</span>
                  </div>

                  <UButton
                    :to="resolvePostLink(item)"
                    variant="link"
                    size="sm"
                    trailing-icon="i-lucide-arrow-right"
                    label="Read more"
                  />
                </div>
              </template>
            </UCard>
          </UCarousel>
        </UPageSection>

        <UPageSection id="news-feed" class="py-0 my-0">
          <template #title>
            <div class="flex flex-col gap-6">
              <div>
                <h2 class="text-3xl font-semibold tracking-tight">Updates</h2>
                <p class="mt-2 text-sm text-muted-foreground tracking-normal">
                  Browse the newsroom archive and filter by format.
                </p>
              </div>
              <UInput
                v-model="searchTerm"
                size="lg"
                icon="i-lucide-search"
                placeholder="Search posts, events, and videos..."
                aria-label="Search newsroom"
                class="w-full shadow-sm tracking-normal"
              />
            </div>
          </template>

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

          <template v-if="filteredPosts.length > 0">
            <UPageGrid class="gap-6 md:grid-cols-2 xl:grid-cols-3">
              <UCard
                v-for="post in filteredPosts"
                :key="post.slug ?? post.path"
                :ui="{ root: 'flex flex-col h-full', body: 'flex-1' }"
              >
                <template #header>
                  <div class="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                    <UBadge :label="categoryLabels[post.category] ?? 'Post'" variant="subtle" />
                    <span class="ml-auto whitespace-nowrap">{{ formatDate(post.date) }}</span>
                  </div>
                </template>

                <template #default>
                  <NuxtLink :to="resolvePostLink(post)" class="block space-y-3">
                    <span class="text-lg font-semibold leading-tight line-clamp-2">
                      {{ post.title }}
                    </span>
                  </NuxtLink>
                  <p class="text-sm text-muted-foreground line-clamp-3">
                    {{ post.description }}
                  </p>

                  <div v-if="post.tags?.length" class="flex flex-wrap gap-2 pt-2">
                    <UBadge
                      v-for="tag in post.tags"
                      :key="tag"
                      variant="subtle"
                      :label="tag"
                    />
                  </div>
                </template>

                <template #footer>
                  <div class="flex items-center justify-between gap-3">
                    <div v-if="post.category === 'events'" class="flex items-center gap-2 text-sm text-muted-foreground truncate">
                      <UIcon name="i-lucide-map-pin" class="h-4 w-4" />
                      <span class="truncate">{{ post.location }}</span>
                    </div>

                    <UButton
                      :to="resolvePostLink(post)"
                      variant="link"
                      size="sm"
                      trailing-icon="i-lucide-arrow-right"
                      label="Read more"
                    />
                  </div>
                </template>
              </UCard>
            </UPageGrid>
          </template>

          <div v-else class="rounded-lg border border-dashed border-gray-200 p-10 text-center text-muted-foreground dark:border-gray-800">
            {{ emptyStateCopy }}
          </div>
        </UPageSection>
      </UPageBody>
    </UPage>
  </div>
</template>



