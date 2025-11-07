<script setup lang="ts">
interface QuoteCardProps {
  quote: string
  author?: string
  name?: string
  affiliation?: string
  cohort?: string
  avatar?: string
}

const props = defineProps<QuoteCardProps>()

const displayName = computed(() => props.name || props.author || 'Anonymous')
</script>

<template>
  <div class="bg-primary/5 rounded-xl p-8 border border-primary/10">
    <div class="flex items-start gap-4">
      <UIcon name="i-lucide-quote" class="h-8 w-8 text-primary shrink-0 mt-1" />
      <div class="space-y-4">
        <blockquote class="text-lg italic text-muted-foreground leading-relaxed">
          "{{ quote }}"
        </blockquote>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <UIcon
              v-if="!avatar"
              name="i-lucide-user"
              class="h-6 w-6 text-primary"
            />
            <img
              v-else
              :src="avatar"
              :alt="displayName"
              class="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <p class="font-semibold text-foreground">{{ displayName }}</p>
            <p v-if="affiliation" class="text-sm text-muted-foreground">{{ affiliation }}</p>
            <p v-if="cohort" class="text-xs text-muted-foreground">{{ cohort }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

