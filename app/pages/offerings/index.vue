<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ButtonProps } from '#ui/types'
import type { OfferingDocument, OfferingEntry, OfferingsMeta } from '~/types/offerings'


const { data: offeringsData } = await useAsyncData<OfferingDocument[]>('offerings-collection', () =>
  queryCollection('offerings').all()
)

const entries = computed(() => offeringsData.value ?? [])

/**
 * Filters out meta documents, keeping only actual offering entries.
 */
const offerings = computed(() => entries.value.filter((entry): entry is OfferingEntry => (entry.documentType ?? 'offering') !== 'meta'))

const metaEntry = computed(() => entries.value.find((entry): entry is OfferingsMeta => entry.documentType === 'meta') as OfferingsMeta | undefined)

const { data: testimonialsCollection } = await useAsyncData('offerings-testimonials', () =>
  queryCollection('testimonials').all()
)

/**
 * SEO title from meta document or default fallback.
 */
const seoTitle = computed(() => metaEntry.value?.hero?.title ?? 'Offerings')

/**
 * SEO description from meta document or default fallback.
 */
const seoDescription = computed(
  () =>
    metaEntry.value?.hero?.description ??
    'Browse upcoming and past programs from the Data Stewardship Academy to find the right offering for your team.'
)

useSeoMeta({
  title: seoTitle,
  description: seoDescription
})

/**
 * Filters testimonials by tags specified in meta document.
 * Returns up to 6 testimonials matching the desired tags.
 */
const testimonials = computed(() => {
  const tags = metaEntry.value?.testimonials?.tags ?? ['offerings']
  const desired = new Set(tags)
  return (testimonialsCollection.value ?? [])
    .filter(testimonial => (testimonial.tags ?? []).some(tag => desired.has(tag)))
    .slice(0, 6)
})

/**
 * Transforms meta document CTA links into ButtonProps format for UI components.
 */
const heroLinks = computed<ButtonProps[]>(() =>
  (metaEntry.value?.hero?.ctas ?? []).map(cta => ({
    label: cta.label,
    to: cta.to,
    color: cta.color ?? 'primary',
    variant: cta.variant ?? 'solid',
    size: cta.size ?? 'lg'
  }))
)

/**
 * Hero section description from meta document or default fallback.
 */
const heroDescription = computed(
  () => metaEntry.value?.hero?.description ?? 'Explore upcoming and past cohorts across our offerings catalog.'
)

/**
 * Hero section title from meta document or default fallback.
 */
const heroTitle = computed(() => metaEntry.value?.hero?.title ?? 'Offerings')

/**
 * Hero section eyebrow text from meta document or default fallback.
 */
const heroEyebrow = computed(() => metaEntry.value?.hero?.eyebrow ?? 'Offerings')

/**
 * Selected program filter for filtering courses (null = all, 'deep-dives' = deep dives only, 'foundations' = foundations only).
 */
const selectedProgramFilter = ref<'deep-dives' | 'foundations' | null>(null)

/**
 * Filters offerings by selected program filter.
 * Uses meta.program if available, otherwise falls back to offering.program
 */
const filteredOfferings = computed(() => {
  if (!selectedProgramFilter.value) {
    return offerings.value
  }
  const filtered = offerings.value.filter(offering => {
    const program = (offering as any).meta?.program ?? offering.program
    return program === selectedProgramFilter.value
  })
  return filtered
})

</script>

<template>
  <div class="relative">
    <section class="relative isolate overflow-hidden border border-primary/20 bg-gradient-to-b from-primary/10 via-transparent to-transparent py-16 sm:py-20">
      <HeroBackground class="absolute inset-0 opacity-40" />
      <UContainer class="relative z-10 space-y-10">
        <UPageHero :description="heroDescription" class="mx-auto max-w-4xl text-left" :links="heroLinks">
          <template #title>
            <div class="space-y-4">
              <span class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{{ heroEyebrow }}</span>
              <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ heroTitle }}</h1>
            </div>
          </template>
        </UPageHero>
      </UContainer>
    </section>

    <UContainer class="space-y-6 py-12">
      <header class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold tracking-tight">Featured Courses</h2>
      </header>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="offering in offerings" :key="offering.slug || (offering as { _id?: string })._id || offering.title" :ui="{ root: 'flex h-full flex-col', body: 'flex-1' }">
          <template #header>
            <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <UBadge variant="subtle" color="primary">{{ offering.format }}</UBadge>
              <UBadge variant="outline">{{ offering.level || 'All Levels' }}</UBadge>
            </div>
          </template>

          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ offering.title }}</h3>
            <p class="mt-2 line-clamp-3 text-sm text-muted-foreground">{{ offering.summary }}</p>
            <!-- <pre class="mt-4 overflow-x-auto rounded-md bg-muted/30 p-3 text-xs">{{ JSON.stringify(offering, null, 2) }}</pre> -->
          </div>

          <template #footer>
            <div class="flex flex-wrap gap-3">
              <UButton :to="(offering as { _path?: string })._path || `/offerings/${offering.slug || (offering as { _id?: string })._id?.replace(/^offerings:/, '').replace(/\.md$/, '') || offering.title}`" label="View detail" size="sm" />
              <UButton
                v-if="offering.registration?.url"
                :to="offering.registration.url"
                :label="offering.registration.label"
                variant="ghost"
                size="sm"
              />
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>

    <UContainer class="space-y-6 py-12">
      <header class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold tracking-tight">All Courses</h2>
        <div class="flex gap-2">
          <UButton
            :variant="selectedProgramFilter === null ? 'solid' : 'outline'"
            @click="selectedProgramFilter = null"
          >
            All
          </UButton>
          <UButton
            :variant="selectedProgramFilter === 'deep-dives' ? 'solid' : 'outline'"
            @click="selectedProgramFilter = 'deep-dives'"
          >
            Deep Dives
          </UButton>
          <UButton
            :variant="selectedProgramFilter === 'foundations' ? 'solid' : 'outline'"
            @click="selectedProgramFilter = 'foundations'"
          >
            Foundations
          </UButton>
        </div>
        <div class="text-sm text-muted-foreground">
          Showing {{ filteredOfferings.length }} of {{ offerings.length }} courses
          <span v-if="selectedProgramFilter">(filtered by {{ selectedProgramFilter }})</span>
        </div>
      </header>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="offering in filteredOfferings" :key="offering.slug || (offering as { _id?: string })._id || offering.title" :ui="{ root: 'flex h-full flex-col', body: 'flex-1' }">
          <template #header>
            <div class="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <UBadge variant="subtle" color="primary">{{ offering.format }}</UBadge>
              <UBadge variant="outline">{{ offering.level || 'All Levels' }}</UBadge>
            </div>
          </template>

          <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ offering.title }}</h3>
            <p class="mt-2 line-clamp-3 text-sm text-muted-foreground">{{ offering.summary }}</p>
            <!-- <pre class="mt-4 overflow-x-auto rounded-md bg-muted/30 p-3 text-xs">{{ JSON.stringify(offering, null, 2) }}</pre> -->
          </div>

          <template #footer>
            <div class="flex flex-wrap gap-3">
              <UButton :to="(offering as { _path?: string })._path || `/offerings/${offering.slug || (offering as { _id?: string })._id?.replace(/^offerings:/, '').replace(/\.md$/, '') || offering.title}`" label="View detail" size="sm" />
              <UButton
                v-if="offering.registration?.url"
                :to="offering.registration.url"
                :label="offering.registration.label"
                variant="ghost"
                size="sm"
              />
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>

    <UContainer class="space-y-14 py-12 sm:py-16">
      <section v-if="testimonials.length > 0" class="space-y-6">
        <header class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold tracking-tight">What participants say</h2>
          <p class="text-sm text-muted-foreground">Testimonials from alumni and partners across our offerings.</p>
        </header>

        <UCarousel
          v-slot="{ item: testimonial }"
          arrows
          :items="testimonials"
          :ui="{ item: 'basis-[80%]', container: 'h-full', viewport: 'py-4 px-4 border-r-1 border-l-1 border-primary/30' }"
          class="w-full"
        >
          <UCard :ui="{ root: 'flex h-full flex-col', body: 'flex-1' }">
            <div class="flex-1">
              <ContentRenderer :value="testimonial">
                <template #empty>
                  <p class="text-muted-foreground">{{ testimonial.quote }}</p>
                </template>
              </ContentRenderer>
            </div>
            <template #footer>
              <div>
                <p class="font-semibold">{{ testimonial.name }}</p>
                <p class="text-sm text-muted-foreground">{{ testimonial.affiliation ?? testimonial.cohort }}</p>
              </div>
            </template>
          </UCard>
        </UCarousel>
      </section>
    </UContainer>
  </div>
</template>
