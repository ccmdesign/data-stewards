<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'

const route = useRoute()
const slug = route.params.slug as string

const categoryLabels: Record<string, string> = {
  blog: 'Blog',
  interviews: 'Interview',
  videos: 'Video',
  events: 'Event'
}

const { setPageHero } = usePageHero()

const { data: postData } = await useAsyncData(`news-post-${slug}`, () =>
  queryCollection('posts')
    .where('slug', '=', slug)
    .first()
)

const post = computed(() => postData.value)

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Post not found'
  })
}

// Set hero data after post is loaded
const headline = computed(() => categoryLabels[post.value?.category ?? 'blog'] ?? 'News')
const heroLinks = [
  { label: 'Back to News', to: '/news', variant: 'outline', size: 'lg' },
  ...(post.value?.registrationLink ? [{ label: 'Register', to: post.value.registrationLink, target: '_blank', size: 'lg', color: 'primary' }] : [])
]

setPageHero({
  showHero: true,
  title: post.value.title,
  subtitle: headline.value,
  description: post.value.description,
  links: heroLinks
})

useSeoMeta({
  title: post.value.title,
  description: post.value.description
})

const formatDate = (input: string) => {
  const date = new Date(input)
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

const formatTimeRange = (start?: string, end?: string) => {
  if (!start) {
    return null
  }

  return end ? `${start} – ${end}` : start
}

const eventTime = computed(() => formatTimeRange(post.value?.startTime, post.value?.endTime))
</script>

<template>
  <UContainer class="py-12">
    <div class="mx-auto max-w-3xl space-y-10">
          <div v-if="post.category === 'events'" class="rounded-lg border border-default bg-muted/30 p-6">
            <div class="flex flex-col gap-4 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar" />
                <span>{{ formatDate(post.date) }}</span>
              </div>
              <div v-if="eventTime" class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" />
                <span>{{ eventTime }}</span>
              </div>
              <div v-if="post.location" class="flex items-center gap-2">
                <UIcon name="i-lucide-map-pin" />
                <span>{{ post.location }}</span>
              </div>
              <div v-if="post.registrationLink" class="pt-2">
                <UButton
                  :to="post.registrationLink"
                  target="_blank"
                  icon="i-lucide-external-link"
                  label="Register"
                />
              </div>
            </div>
          </div>

          <div class="prose max-w-none dark:prose-invert">
            <ContentRenderer :value="post" />
          </div>

      <div v-if="post.tags?.length" class="flex flex-wrap gap-2 text-sm text-muted-foreground border-t border-default pt-6">
        <UBadge
          v-for="tag in post.tags"
          :key="tag"
          variant="soft"
          color="neutral"
          :label="tag"
        />
      </div>
    </div>
  </UContainer>
</template>

