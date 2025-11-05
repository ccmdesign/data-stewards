<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'

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

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Blog', value: 'blog' },
  { label: 'Events', value: 'events' },
  { label: 'Interviews', value: 'interviews' },
  { label: 'Videos', value: 'videos' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Webinar', value: 'webinar' }
]

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

const formatDate = (input: string) => {
  const date = new Date(input)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

useSeoMeta({
  title: 'News & Updates',
  description: 'Stay updated with the latest news, events, interviews, and videos from our community.'
})
</script>

<template>
  <UContainer class="py-12">
    <!-- Filter Buttons -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="filter in filterOptions"
          :key="filter.value"
          :variant="activeFilter === filter.value ? 'solid' : 'outline'"
          :color="activeFilter === filter.value ? 'primary' : 'neutral'"
          size="sm"
          :label="filter.label"
          @click="activeFilter = filter.value"
        />
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="post in filteredPosts"
        :key="post.slug"
        class="transition-all duration-200 hover:shadow-lg"
        :ui="{ root: 'flex flex-col', body: 'flex-1' }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <UBadge
              :label="categoryLabels[post.category] || 'Post'"
              :color="post.category === 'events' ? 'primary' : post.category === 'videos' ? 'error' : 'neutral'"
              variant="soft"
            />
            <span class="text-sm text-muted-foreground">
              {{ formatDate(post.date) }}
            </span>
          </div>

          <h3 class="mt-3 text-lg font-semibold leading-tight">
            {{ post.title }}
          </h3>
        </template>

        <p class="text-sm text-muted-foreground line-clamp-3">
          {{ post.description }}
        </p>

        <template #footer>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <template v-if="post.author">
                <UIcon name="i-lucide-user" class="size-3" />
                <span>{{ post.author }}</span>
              </template>
              <template v-if="post.category === 'events' && post.location">
                <UIcon name="i-lucide-map-pin" class="size-3" />
                <span>{{ post.location }}</span>
              </template>
              <template v-if="post.category === 'videos' && post.duration">
                <UIcon name="i-lucide-clock" class="size-3" />
                <span>{{ post.duration }}</span>
              </template>
            </div>

            <UButton
              :to="`/news/${post.slug}`"
              label="Read More"
              variant="outline"
              color="primary"
              size="sm"
              icon="i-lucide-arrow-right"
            />
          </div>

          <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-1">
            <UBadge
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag"
              :label="tag"
              size="sm"
              variant="outline"
              color="neutral"
            />
            <UBadge
              v-if="post.tags.length > 3"
              :label="`+${post.tags.length - 3} more`"
              size="sm"
              variant="outline"
              color="neutral"
            />
          </div>

          <!-- Debug: Full post data -->
          <!-- <details class="mt-4 border-t border-default pt-3">
            <summary class="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              Debug: Post Data
            </summary>
            <pre class="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-48">{{ JSON.stringify(post, null, 2) }}</pre>
          </details> -->
        </template>
      </UCard>

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
