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
    title="For Organizations"
    description="Tailored offerings to institutionalize data stewardship across your organization."
    variant="muted"
    padding="large"
    no-margin
  >
    <UPageColumns class="lg:columns-3">
      <OrganizationCard
        v-for="(offer, index) in offers"
        :key="index"
        :title="offer.title"
        :description="offer.description"
      />
    </UPageColumns>
    <div v-if="primaryAction" class="mt-6 flex justify-center">
      <UButton v-bind="primaryAction" />
    </div>
  </BaseSection>
</template>

