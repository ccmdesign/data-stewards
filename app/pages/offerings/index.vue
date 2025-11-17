<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'
import type { OfferingDocument, OfferingEntry } from '~/types/offerings'
import type { FilterItem } from '~/components/molecules/FiltersMenu.vue'

const { setPageHero } = usePageHero()

const heroLinks: ButtonProps[] = [
  { label: 'Explore Programs', to: '#upcoming', color: 'primary', size: 'lg', trailingIcon: 'i-lucide-arrow-right' },
  { label: 'View Past Offerings', to: '#past', variant: 'outline', size: 'lg' }
]

setPageHero({
  showHero: true,
  title: 'Programs & Training Offerings',
  badge: 'Advance Your Data Stewardship Skills',
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
    { label: 'Bootcamps', value: 'foundations', disabled: !hasFoundations },
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
      <!-- Upcoming Section -->
      <UPageSection id="upcoming" class="scroll-mt-20">
        <UContainer>
          <div class="flex flex-col gap-3 mb-8">
            <h2 class="text-5xl font-semibold leading-[48px] text-highlighted">
              Upcoming Offerings
            </h2>
            <p class="text-base leading-6 text-muted-foreground">
              Discover the next experiences launching soon.
            </p>
          </div>

          <div v-if="upcomingOfferings.length" class="space-y-6">
            <OfferingCard
              v-for="offering in upcomingOfferings"
              :key="offering._id || offering.slug || offering.title"
              :offering="offering"
              variant="upcoming"
            />
          </div>
          <UAlert v-else icon="i-lucide-info" title="No upcoming offerings" description="New programs will be announced soon." />
        </UContainer>
      </UPageSection>

      <!-- Past Offerings Section -->
      <UPageSection id="past" class="bg-bg-elevated scroll-mt-20">
        <UContainer>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
            <div>
              <h2 class="text-5xl font-semibold leading-[48px] text-highlighted">
                Explore past programs
              </h2>
            </div>
            <FiltersMenu
              v-model="programFilter"
              :items="programFilters"
            />
          </div>

          <div v-if="filteredPastOfferings.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <OfferingCard
              v-for="offering in filteredPastOfferings"
              :key="offering._id || offering.slug || offering.title"
              :offering="offering"
              variant="archived"
            />
          </div>
          <UAlert v-else icon="i-lucide-info" title="No offerings found" description="Try a different filter to see more programs." />
        </UContainer>
      </UPageSection>

      <!-- Workshop Image Section -->
      <UPageSection class="py-0">
        <UContainer>
          <div class="h-[684px] relative rounded-2xl overflow-hidden">
            <img
              src="/images/offerings-workshop.png"
              alt="Data stewardship workshop"
              class="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </UContainer>
      </UPageSection>

      <!-- Final CTA Section -->
      <FinalCTASection
        title="Ready to Transform Your Data Stewardship?"
        description="Join our next cohort and become part of a global community of responsible data leaders."
        :primary-action="{ label: 'Talk to Us', to: '/contact', color: 'primary', size: 'lg' }"
        :secondary-action="{ label: 'Explore Programs', to: '#upcoming', variant: 'outline', size: 'lg' }"
      />
    </UPageBody>
  </UPage>
</template>
