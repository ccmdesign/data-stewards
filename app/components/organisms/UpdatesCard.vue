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
  image?: string | string[] | null
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
    day: 'numeric'
  }).format(date)
}

const getAuthorAvatar = (author?: string) => {
  if (author === 'Hannah Chafetz') {
    return '/images/avatar-hannah-chafetz.png'
  }
  if (author === 'The GovLab') {
    return '/images/avatar-govlab.png'
  }
  if (author === 'Adam Zable' || author === 'A Zahuranec') {
    return '/images/avatar-adam-zable.png'
  }
  return null
}
</script>

<template>
  <NuxtLink
    :to="`/news/${post.slug}`"
    class="flex flex-col items-start overflow-hidden rounded-2xl transition-all duration-200 hover:shadow-lg w-full"
  >
    <div class="h-[216px] relative rounded-2xl shadow-lg shrink-0 w-full bg-muted border border-border overflow-hidden">
      <img
        v-if="post.image"
        :alt="post.title"
        class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-2xl size-full"
        :src="Array.isArray(post.image) ? post.image[0] : post.image"
      />
    </div>
    <div class="flex flex-col items-start p-6 shrink-0 w-full">
      <div class="flex gap-2 items-center pb-2 pt-0 px-0">
        <p class="text-sm text-muted-foreground">
          {{ formatDate(post.date) }}
        </p>
      </div>
      <div class="flex flex-col gap-1 items-start">
        <h3 class="text-xl font-semibold leading-7 line-clamp-2">
          {{ post.title }}
        </h3>
        <p class="text-base text-muted-foreground line-clamp-3">
          {{ post.description }}
        </p>
      </div>
      <div class="flex gap-2 items-center pb-0 pt-4 px-0">
        <div class="relative rounded-[24px] shrink-0 size-8 overflow-hidden">
          <img
            v-if="getAuthorAvatar(post.author)"
            :src="getAuthorAvatar(post.author)"
            :alt="post.author"
            class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full"
          />
          <div
            v-else
            class="absolute inset-0 bg-muted-foreground/20 rounded-[24px]"
          />
        </div>
        <p class="text-sm font-medium text-foreground">
          {{ post.author }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

