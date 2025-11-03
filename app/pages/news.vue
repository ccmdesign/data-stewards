<script setup lang="ts">
const heroHeadline = 'Newsroom'
const heroTitle = 'Latest stories, events, and media from Data Stewards Academy'
const heroDescription = 'Track program launches, alumni spotlights, upcoming events, and recorded talks from across the community.'

useSeoMeta({
  title: 'News',
  description: heroDescription
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

const tagColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'] as const

const getTagColor = (tag: string) => {
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return tagColors[hash % tagColors.length]
}
</script>

<template>
  <div class="relative">
    <section class="relative isolate overflow-hidden border border-primary/30 bg-gradient-to-b from-primary/15 via-transparent to-transparent py-16 sm:py-24">
      <HeroBackground class="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" />
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />

      <UContainer class="relative z-10">
        <UPageHero
          :headline="heroHeadline"
          :description="heroDescription"
          class="mx-auto max-w-3xl text-center"
        >
          <template #title>
            <h1 class="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {{ heroTitle }}
            </h1>
          </template>

        </UPageHero>

        <div
          v-if="featuredPosts.length > 0"
          id="featured-posts"
          class="mx-auto mt-12 max-w-5xl"
        >
          <h2 class="mb-4 text-left text-sm font-semibold uppercase tracking-[0.25em] text-primary">Featured</h2>
          <UPageGrid class="gap-6 md:grid-cols-2 xl:grid-cols-4">
            <UCard
              v-for="post in featuredPosts"
              :key="post.slug ?? post.path"
              class="h-full"
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
        </div>
      </UContainer>
    </section>

    <UPage class="py-16">
      <UPageBody class="space-y-16">
        <UPageSection id="news-feed">
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
                class="h-full"
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
                      variant="soft"
                      :color="getTagColor(tag)"
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



