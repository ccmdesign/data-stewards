<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface OrganizationOffer {
  title: string
  description: string
}

interface Props {
  offers: OrganizationOffer[]
  primaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="organizations"
    :content="{
      title: 'For Organizations',
      tagline: 'Tailored offerings to institutionalize data stewardship across your organization.'
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-8">
      <div class="flex gap-8">
        <OrganizationCard
          v-for="(offer, index) in offers"
          :key="index"
          :title="offer.title"
          :description="offer.description"
        />
      </div>
      <div v-if="primaryAction" class="flex justify-center">
        <UButton v-bind="primaryAction" />
      </div>
      <div class="h-[684px] relative rounded-2xl overflow-hidden bg-muted border border-border">
        <img
          alt=""
          class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-2xl size-full"
          src="/images/organization-workshop.png"
        />
      </div>
    </div>
  </BaseSection>
</template>

