<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  description: 'Read our latest articles and insights on developer productivity, coding tips, and workflow optimization.'
})

// Fetch all blog posts from Nuxt Content
const { data: allPosts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').all()
)

// Posts already have slug from frontmatter
const posts = computed(() => allPosts.value || [])

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
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UContainer>
      <div class="py-12 lg:py-20">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Blog & Insights
          </h1>
          <p class="text-lg text-muted-foreground">
            Expert tips, insights, and best practices for maximizing your developer productivity
          </p>
        </div>
      </div>
    </UContainer>

    <!-- Main Content with Sidebar -->
    <UContainer>
      <div class="pb-20">
        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Main Content Area -->
          <div class="lg:col-span-8">
            <div v-if="posts.length > 0" class="space-y-8">
              <UCard
                v-for="post in posts"
                :key="post.slug"
                class="hover:shadow-lg transition-shadow"
              >
                <div class="space-y-4">
                  <!-- Post Header -->
                  <div class="flex items-center gap-3 text-sm text-muted-foreground">
                    <UBadge :label="post.category" variant="subtle" />
                    <span>{{ formatDate(post.date) }}</span>
                    <span>•</span>
                    <span>{{ post.author }}</span>
                  </div>

                  <!-- Post Title -->
                  <h2 class="text-2xl font-bold hover:text-primary transition-colors">
                    <NuxtLink :to="`/blog/${post.slug}`">
                      {{ post.title }}
                    </NuxtLink>
                  </h2>

                  <!-- Post Excerpt -->
                  <p class="text-muted-foreground">
                    {{ post.description }}
                  </p>

                  <!-- Read More Link -->
                  <div>
                    <UButton
                      :to="`/blog/${post.slug}`"
                      variant="link"
                      label="Read more"
                      trailing-icon="i-lucide-arrow-right"
                      class="p-0"
                    />
                  </div>
                </div>
              </UCard>
            </div>

            <!-- Pagination -->
            <div class="mt-12 flex justify-center">
              <UPagination
                :total="30"
                :page-count="10"
                :model-value="1"
              />
            </div>
          </div>

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
              <UCard v-if="posts.length > 0">
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Recent Posts
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="post in posts.slice(0, 3)"
                      :key="post.slug"
                      class="space-y-1"
                    >
                      <NuxtLink
                        :to="`/blog/${post.slug}`"
                        class="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {{ post.title }}
                      </NuxtLink>
                      <p class="text-xs text-muted-foreground">
                        {{ formatDate(post.date) }}
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
