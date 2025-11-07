<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'
import type { OfferingDocument, OfferingEntry } from '~/types/offerings'
import type { FilterItem } from '~/components/molecules/FiltersMenu.vue'

const { setPageHero } = usePageHero()

const heroLinks: ButtonProps[] = [
  { label: 'Explore Programs', to: '#upcoming', color: 'primary', size: 'lg' },
  { label: 'View Past Offerings', to: '#past', variant: 'outline', size: 'lg' }
]

setPageHero({
  showHero: true,
  title: 'Programs & Training Offerings',
  subtitle: 'Advance Your Data Stewardship Skills',
  description: 'Discover comprehensive training programs designed to build expertise in responsible data management, from foundational bootcamps to specialized deep dives.',
  links: heroLinks
})

const { data: offeringsData } = await useAsyncData<OfferingDocument[]>('offerings-collection', () =>
  queryCollection('offerings').all()
)

const entries = computed(() => offeringsData.value ?? [])

const offerings = computed(() =>
  entries.value.filter((entry): entry is OfferingEntry => (entry.meta?.documentType ?? 'offering') !== 'meta')
)

const upcomingOfferings = computed(() => offerings.value.filter(offering => offering.meta?.status === 'upcoming'))
const pastOfferings = computed(() => offerings.value.filter(offering => offering.meta?.status === 'past'))

type ProgramFilter = 'all' | 'foundations' | 'deep-dives'

const programFilter = ref<ProgramFilter>('all')

const programFilters = computed<FilterItem[]>(() => {
  const hasFoundations = pastOfferings.value.some(offering => offering.meta?.program === 'foundations')
  const hasDeepDives = pastOfferings.value.some(offering => offering.meta?.program === 'deep-dives')

  return [
    { label: 'All', value: 'all', disabled: false },
    { label: 'Foundations', value: 'foundations', disabled: !hasFoundations },
    { label: 'Deep Dives', value: 'deep-dives', disabled: !hasDeepDives }
  ]
})

const filteredPastOfferings = computed(() =>
  programFilter.value === 'all'
    ? pastOfferings.value
    : pastOfferings.value.filter(offering => offering.meta?.program === programFilter.value)
)

watchEffect(() => {
  if (!pastOfferings.value.length) return
  // 'all' filter is always valid
  if (programFilter.value === 'all') return
  const hasCurrentProgram = pastOfferings.value.some(offering => offering.meta?.program === programFilter.value)
  if (hasCurrentProgram) return
  const fallback = programFilters.value.find(filter => pastOfferings.value.some(offering => offering.meta?.program === filter.value))
  if (fallback) programFilter.value = fallback.value as ProgramFilter
})

useSeoMeta({
  title: 'Programs & Offerings | Data Stewardship Academy',
  description: 'Discover our comprehensive data stewardship programs and training offerings designed to advance skills and practices in responsible data management.'
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer class="space-y-16">
        <!-- Upcoming Section -->
        <section id="upcoming" class="space-y-6 scroll-mt-20">
          <header class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upcoming</p>
            <div>
              <h2 class="text-3xl font-semibold">Upcoming Offerings</h2>
              <p class="text-muted-foreground">Discover the next experiences launching soon.</p>
            </div>
          </header>

          <div v-if="upcomingOfferings.length" class="space-y-6">
            <OfferingCard
              v-for="offering in upcomingOfferings"
              :key="offering._id || offering.slug || offering.title"
              :offering="offering"
              variant="upcoming"
            />
          </div>
          <UAlert v-else icon="i-lucide-info" title="No upcoming offerings" description="New programs will be announced soon." />
        </section>

        <section id="past" class="space-y-6 scroll-mt-20">
          <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Archive</p>
              <h2 class="text-3xl font-semibold">Explore past programs</h2>
            </div>
            <FiltersMenu
              v-model="programFilter"
              :items="programFilters"
            />
          </header>

          <div v-if="filteredPastOfferings.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <OfferingCard
              v-for="offering in filteredPastOfferings"
              :key="offering._id || offering.slug || offering.title"
              :offering="offering"
              variant="archived"
            />
          </div>
          <UAlert v-else icon="i-lucide-info" title="No offerings found" description="Try a different filter to see more programs." />
        </section>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
