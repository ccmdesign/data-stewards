<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch all blog posts
const { data: allPosts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog').all()
)

// Find the specific post matching the slug
const post = computed(() => {
  if (!allPosts.value) return null
  return allPosts.value.find((p: any) => p.slug === slug)
})

// Handle 404
if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found'
  })
}

// Set SEO meta
useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Sidebar content
const categories = [
  { name: 'Productivity', count: 12 },
  { name: 'Tips & Tricks', count: 8 },
  { name: 'Analytics', count: 6 },
  { name: 'Team Collaboration', count: 4 }
]

// Recent posts
const recentPosts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.slice(0, 3) as any[]
})
</script>

<template>
  <div v-if="post">
    <UContainer>
      <!-- Back to Blog Link -->
      <div class="py-8">
        <UButton
          to="/blog"
          variant="link"
          icon="i-lucide-arrow-left"
          label="Back to Blog"
          class="p-0"
        />
      </div>

      <div class="pb-20">
        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Main Content Area -->
          <article class="lg:col-span-8">
            <!-- Article Header -->
            <div class="mb-8 space-y-4">
              <div class="flex items-center gap-3 text-sm text-muted-foreground">
                <UBadge :label="post.category" variant="subtle" />
                <span>{{ formatDate(post.date) }}</span>
                <span>•</span>
                <span>{{ post.author }}</span>
              </div>

              <h1 class="text-4xl lg:text-5xl font-bold">
                {{ post.title }}
              </h1>

              <p class="text-xl text-muted-foreground">
                {{ post.description }}
              </p>
            </div>

            <!-- Article Content -->
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <ContentRenderer :value="post" />
            </div>

            <!-- Share Section -->
            <div class="mt-12 pt-8 border-t border-default">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-sm text-muted-foreground">
                    Written by
                  </p>
                  <p class="font-semibold">
                    {{ post.author }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <UButton
                    icon="i-lucide-share-2"
                    variant="outline"
                    aria-label="Share"
                  />
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <div class="lg:col-span-4">
            <div class="space-y-6 lg:sticky lg:top-24">
              <!-- Search -->
              <UCard>
                <div class="space-y-3">
                  <h3 class="font-semibold text-lg">
                    Search
                  </h3>
                  <UInput
                    icon="i-lucide-search"
                    placeholder="Search articles..."
                  />
                </div>
              </UCard>

              <!-- Categories -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Categories
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="category in categories"
                      :key="category.name"
                      class="flex items-center justify-between hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{{ category.name }}</span>
                      <UBadge :label="String(category.count)" color="neutral" variant="subtle" />
                    </li>
                  </ul>
                </div>
              </UCard>

              <!-- Recent Posts -->
              <UCard v-if="recentPosts && recentPosts.length > 0">
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Recent Posts
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="recentPost in recentPosts"
                      :key="recentPost.slug"
                      class="space-y-1"
                    >
                      <NuxtLink
                        :to="`/blog/${recentPost.slug}`"
                        class="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {{ recentPost.title }}
                      </NuxtLink>
                      <p class="text-xs text-muted-foreground">
                        {{ formatDate(recentPost.date) }}
                      </p>
                    </li>
                  </ul>
                </div>
              </UCard>

              <!-- Newsletter -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Newsletter
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    Get the latest articles and insights delivered to your inbox.
                  </p>
                  <div class="space-y-2">
                    <UInput placeholder="Your email" type="email" />
                    <UButton label="Subscribe" block />
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

