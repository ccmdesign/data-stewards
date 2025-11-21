<script setup lang="ts">
interface Props {
  title: string
  description: string
  date: string
  author: string
  image?: string | null
  to?: string
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="to" class="group flex flex-col gap-4 cursor-pointer">
    <!-- Image -->
    <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-md">
      <img
        :src="image || '/images/news-fallback.svg'"
        :alt="title"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-3 px-4">
      <!-- Date -->
      <p class="text-sm text-gray-500 font-medium">
        {{ date }}
      </p>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-gray-600 line-clamp-3 leading-relaxed">
        {{ description }}
      </p>

      <!-- Author -->
      <div class="flex items-center gap-3 mt-2">
        <div class="h-8 w-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <img
            v-if="author === 'Hannah Chafetz'"
            src="/images/avatar-hannah-chafetz.png"
            :alt="author"
            class="h-full w-full object-cover"
          />
          <img
            v-else-if="author === 'The GovLab'"
            src="/images/avatar-govlab.png"
            :alt="author"
            class="h-full w-full object-cover"
          />
          <img
            v-else-if="author === 'Adam Zable' || author === 'A Zahuranec'"
            src="/images/avatar-adam-zable.png"
            :alt="author"
            class="h-full w-full object-cover"
          />
          <UIcon
            v-else
            name="i-lucide-user"
            class="h-full w-full p-1.5 text-gray-400"
          />
        </div>
        <span class="text-sm font-medium text-gray-900">
          {{ author }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
