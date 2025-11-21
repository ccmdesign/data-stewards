<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'
import type { FilterItem } from '~/components/molecules/FiltersMenu.vue'

const categoryLabels: Record<string, string> = {
  blog: 'Blog',
  interviews: 'Interview',
  videos: 'Video',
  events: 'Event'
}

const { setPageHero } = usePageHero()

const heroLinks = [
  { label: 'Subscribe', to: '#subscribe', color: 'primary' as const, size: 'lg' as const },
  { label: 'Contact Us', to: '/contact', variant: 'outline' as const, size: 'lg' as const }
]

setPageHero({
  showHero: true,
  title: 'News & Updates',
  badge: 'Latest Posts',
  description: 'Stay updated with the latest news, events, interviews, and videos from our community.',
  links: heroLinks
})

const { data: postsData } = await useAsyncData('news-posts', () =>
  queryCollection('posts').all()
)

const posts = computed(() =>
  (postsData.value || []).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const activeFilter = ref<string>('all')

const filterOptions = computed<FilterItem[]>(() => {
  const allTags = new Set<string>()
  posts.value.forEach((post: any) => {
    post.tags?.forEach((tag: string) => allTags.add(tag))
  })

  return [
    { label: 'All', value: 'all', disabled: false },
    { label: 'Blog', value: 'blog', disabled: false },
    { label: 'Events', value: 'events', disabled: false },
    { label: 'Videos', value: 'videos', disabled: false },
    { label: 'Research', value: 'research', disabled: false }
  ]
})

const filteredPosts = computed(() => {
  if (activeFilter.value === 'all') {
    return posts.value
  }

  // Check if it's a category filter
  if (['blog', 'events', 'interviews', 'videos', 'research'].includes(activeFilter.value)) {
    return posts.value.filter(post => post.category === activeFilter.value)
  }

  // Check if it's a tag filter
  return posts.value.filter(post => post.tags?.includes(activeFilter.value))
})

useSeoMeta({
  title: 'News & Updates',
  description: 'Stay updated with the latest news, events, interviews, and videos from our community.'
})

const formatDate = (input: string) => {
  const date = new Date(input)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>

<template>
  <div>
    <!-- Filters Section -->
    <div class="px-4 sm:px-7 md:px-14 lg:px-28 pb-20 pt-32">
      <FiltersMenu
        v-model="activeFilter"
        :items="filterOptions"
      />
    </div>

    <!-- Posts Grid Section -->
    <div class="px-4 sm:px-7 md:px-14 lg:px-28 pb-32">
      <div class="flex flex-wrap gap-8 justify-center lg:justify-start">
        <PublicationCard
          v-for="post in filteredPosts"
          :key="post.slug"
          :title="post.title"
          :description="post.description"
          :date="formatDate(post.date)"
          :author="post.author || ''"
          :image="Array.isArray(post.image) ? post.image[0] : post.image"
          :to="`/news/${post.slug}`"
          class="w-full sm:w-[calc(50%-16px)] lg:w-[384px]"
        />

        <div v-if="filteredPosts.length === 0" class="w-full text-center py-12">
          <UIcon name="i-lucide-file-x" class="mx-auto size-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium text-muted-foreground mb-2">
            {{ activeFilter === 'all' ? 'No posts found' : `No ${activeFilter} posts found` }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ activeFilter === 'all' ? 'Check back later for new content.' : `Try selecting a different filter.` }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
