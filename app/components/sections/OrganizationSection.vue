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
  <OverlaySection
    id="organizations"
    title="For Organizations"
    tagline="Tailored offerings to institutionalize data stewardship across your organization."
    image-src="/images/organization-workshop.png"
    image-alt="Organization Workshop"
    :primary-action="primaryAction"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ContentCard
        v-for="(offer, index) in offers"
        :key="index"
        :title="offer.title"
        :description="offer.description"
      />
    </div>
  </OverlaySection>
</template>

