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
      title: 'Recent Publications'
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        <PublicationCard
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
        />
      </div>
      
      <div class="flex justify-center">
        <UButton
          color="primary"
          size="xl"
          to="/news"
          class="px-8 rounded-lg font-medium"
        >
          View more
        </UButton>
      </div>
    </div>
  </BaseSection>
</template>

