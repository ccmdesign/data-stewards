<script setup lang="ts">
import type { OfferingDocument, OfferingEntry } from '~/types/offerings'

const route = useRoute()

const { data: offering } = await useAsyncData<OfferingEntry | null>(
  `offering-${route.path}`,
  async () => {
    const doc = await queryCollection('offerings').path(route.path).first<OfferingDocument>()
    if (!doc || (doc.meta?.documentType ?? 'offering') === 'meta') {
      return null
    }
    return doc as OfferingEntry
  }
)

if (!offering.value) {
  throw createError({ statusCode: 404, message: 'Offering not found' })
}

useSeoMeta({
  title: `${offering.value.title} | Data Stewardship Academy`
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <pre>{{ JSON.stringify(offering, null, 2) }}</pre>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
