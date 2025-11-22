<script setup lang="ts">
interface QuoteCardProps {
  quote: string
  author?: string
  name?: string
  affiliation?: string
  avatar?: string
}

const props = defineProps<QuoteCardProps>()

const displayName = computed(() => props.name || props.author || 'Anonymous')
</script>

<template>
  <div class="relative w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <!-- Blue Left Border -->
    <div class="absolute left-0 top-0 bottom-0 w-2 bg-[#0EA5E9]" />

    <div class="p-8 md:p-12 flex flex-col gap-8">
      <!-- Quote -->
      <blockquote class="text-xl md:text-2xl font-medium italic text-gray-900 leading-relaxed">
        "{{ quote }}"
      </blockquote>

      <!-- Author Info -->
      <div class="flex items-center gap-4">
        <!-- Avatar -->
        <div class="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <img
            v-if="avatar"
            :src="avatar"
            :alt="displayName"
            class="h-full w-full object-cover"
          />
          <UIcon
            v-else
            name="i-lucide-user"
            class="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <!-- Text -->
        <div class="flex flex-col">
          <cite class="not-italic font-bold text-gray-900 text-base">
            {{ displayName }}
          </cite>
          <span v-if="affiliation" class="text-sm text-gray-500">
            {{ affiliation }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

