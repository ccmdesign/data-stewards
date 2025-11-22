<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface StayUpdatedItem {
  title: string
  description: string
  primaryCta?: ButtonProps
  secondaryCta?: ButtonProps
}

interface Props {
  cards: StayUpdatedItem[]
}

defineProps<Props>()
</script>

<template>
    <BaseSection
      id="stay-updated"
      :content="{
        title: 'Stay Updated',
        tagline: 'Curated briefings, resources, and updates from the frontlines of responsible data stewardship.'
      }"
      color="muted"
      size="l"
      no-margin
    >
    <div class="flex flex-col gap-16">
      <div class="flex gap-8">
        <ContentCard
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :description="card.description"
          class="flex-1"
        >
          <template #footer v-if="card.primaryCta || card.secondaryCta">
            <div class="flex gap-3">
              <UButton
                v-if="card.primaryCta"
                v-bind="card.primaryCta"
              />
              <UButton
                v-if="card.secondaryCta"
                v-bind="card.secondaryCta"
              />
            </div>
          </template>
        </ContentCard>
      </div>
      <div class="h-[684px] relative rounded-2xl overflow-hidden">
        <img
          alt=""
          class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-2xl size-full"
          src="/images/community-workshop-large.png"
        />
      </div>
    </div>
  </BaseSection>
</template>


