<script setup lang="ts">
interface BlogPost {
  title: string
  description: string
  date: string
  author: string
  image?: string | null
  to?: string
}

interface Props {
  posts: BlogPost[]
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="publications"
    :content="{
      title: 'Recent Publication'
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-8">
      <div class="flex flex-wrap gap-8">
        <UCard
          v-for="(post, index) in posts"
          :key="index"
          class="flex flex-col overflow-hidden rounded-lg w-[384px]"
        >
          <div class="h-[216px] relative rounded-lg shadow-lg shrink-0 w-full bg-muted border border-border">
            <img
              v-if="post.image"
              :alt="post.title"
              class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-lg size-full"
              :src="post.image"
            />
          </div>
          <div class="flex flex-col items-start p-6 shrink-0 w-full">
            <div class="flex gap-2 items-center pb-2 pt-0 px-0">
              <p class="text-sm text-muted-foreground">
                {{ post.date }}
              </p>
            </div>
            <div class="flex flex-col gap-1 items-start">
              <h3 class="text-xl font-semibold leading-7">
                {{ post.title }}
              </h3>
              <p class="text-base text-muted-foreground">
                {{ post.description }}
              </p>
            </div>
            <div class="flex gap-2 items-center pb-0 pt-4 px-0">
              <div class="relative rounded-[24px] shrink-0 size-8 overflow-hidden">
                <img
                  v-if="post.author === 'Hannah Chafetz'"
                  :src="'/images/avatar-hannah-chafetz.png'"
                  :alt="post.author"
                  class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full"
                />
                <img
                  v-else-if="post.author === 'The GovLab'"
                  :src="'/images/avatar-govlab.png'"
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
        </UCard>
      </div>
      <div class="flex justify-center">
        <UButton
          color="primary"
          size="lg"
          to="/news"
        >
          View more
        </UButton>
      </div>
    </div>
  </BaseSection>
</template>

