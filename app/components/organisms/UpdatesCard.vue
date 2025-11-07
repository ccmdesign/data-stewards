<script setup lang="ts">
type Post = {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author?: string
  location?: string
  duration?: string
  tags?: string[]
}

interface Props {
  post: Post
  categoryLabels?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  categoryLabels: () => ({
    blog: 'Blog',
    interviews: 'Interview',
    videos: 'Video',
    events: 'Event'
  })
})

const formatDate = (input: string) => {
  const date = new Date(input)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const badgeColor = computed(() => {
  const category = props.post.category
  if (category === 'events') {
    return 'primary'
  }
  if (category === 'videos') {
    return 'error'
  }
  return 'neutral'
})
</script>

<template>
  <UCard
    class="transition-all duration-200 hover:shadow-lg"
    :ui="{ root: 'flex flex-col', body: 'flex-1' }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <UBadge
          :label="categoryLabels[post.category] || 'Post'"
          :color="badgeColor"
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
    </template>
  </UCard>
</template>

