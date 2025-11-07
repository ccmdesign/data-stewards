<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'
import type { FilterItem } from '~/components/FiltersMenu.vue'

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
  subtitle: 'Latest Posts',
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
    { label: 'Interviews', value: 'interviews', disabled: false },
    { label: 'Videos', value: 'videos', disabled: false },
    { label: 'Workshop', value: 'workshop', disabled: !allTags.has('Workshop') },
    { label: 'Webinar', value: 'webinar', disabled: !allTags.has('Webinar') }
  ]
})

const filteredPosts = computed(() => {
  if (activeFilter.value === 'all') {
    return posts.value
  }

  // Check if it's a category filter
  if (['blog', 'events', 'interviews', 'videos'].includes(activeFilter.value)) {
    return posts.value.filter(post => post.category === activeFilter.value)
  }

  // Check if it's a tag filter
  return posts.value.filter(post => post.tags?.includes(activeFilter.value))
})

useSeoMeta({
  title: 'News & Updates',
  description: 'Stay updated with the latest news, events, interviews, and videos from our community.'
})
</script>

<template>
  <UContainer class="py-12">
    <div class="mb-8">
      <FiltersMenu
        v-model="activeFilter"
        :items="filterOptions"
      />
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UpdatesCard
        v-for="post in filteredPosts"
        :key="post.slug"
        :post="post"
        :category-labels="categoryLabels"
      />

      <div v-if="filteredPosts.length === 0" class="col-span-full text-center py-12">
        <UIcon name="i-lucide-file-x" class="mx-auto size-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-medium text-muted-foreground mb-2">
          {{ activeFilter === 'all' ? 'No posts found' : `No ${activeFilter} posts found` }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ activeFilter === 'all' ? 'Check back later for new content.' : `Try selecting a different filter.` }}
        </p>
      </div>
    </div>
  </UContainer>
</template>
