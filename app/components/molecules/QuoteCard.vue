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
  <UCard
    variant="muted"
    :ui="{ root: 'flex flex-col', body: 'gap-4 p-6' }"
  >
    <div class="flex flex-col gap-8">
      <img
        alt=""
        src="/images/quote-icon.svg"
        class="w-4 h-4 shrink-0"
      />
      <div class="flex flex-col gap-1">
        <p class="text-[15px] text-muted-foreground">
          "{{ quote }}"
        </p>
      </div>
    </div>
    <div class="flex gap-2.5 items-center">
      <div class="relative rounded-full shrink-0 size-9">
        <img
          v-if="avatar"
          :src="avatar"
          :alt="displayName"
          class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-full size-full"
        />
        <div
          v-else
          class="absolute inset-0 bg-muted-foreground/20 rounded-full"
        />
      </div>
      <div class="flex flex-col leading-5 text-sm">
        <p class="font-medium text-foreground">
          {{ displayName }}
        </p>
        <p v-if="affiliation" class="text-muted-foreground">
          {{ affiliation }}
        </p>
      </div>
    </div>
  </UCard>
</template>

