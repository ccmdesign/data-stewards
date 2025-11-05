<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { OfferingDocument, OfferingEntry, OfferingLevel } from '~/types/offerings'

const { data: offeringsData } = await useAsyncData<OfferingDocument[]>('offerings-collection', () =>
  queryCollection('offerings').all()
)

const entries = computed(() => offeringsData.value ?? [])

const offerings = computed(() =>
  entries.value.filter((entry): entry is OfferingEntry => (entry.meta?.documentType ?? 'offering') !== 'meta')
)

const upcomingOfferings = computed(() => offerings.value.filter(offering => offering.meta?.status === 'upcoming'))
const pastOfferings = computed(() => offerings.value.filter(offering => offering.meta?.status === 'past'))

type ProgramFilter = 'foundations' | 'deep-dives'

const programFilters: Array<{ label: string, value: ProgramFilter }> = [
  { label: 'Foundations', value: 'foundations' },
  { label: 'Deep Dives', value: 'deep-dives' }
]

const programFilter = ref<ProgramFilter>('foundations')

const filteredPastOfferings = computed(() =>
  pastOfferings.value.filter(offering => offering.meta?.program === programFilter.value)
)

watchEffect(() => {
  if (!pastOfferings.value.length) return
  const hasCurrentProgram = pastOfferings.value.some(offering => offering.meta?.program === programFilter.value)
  if (hasCurrentProgram) return
  const fallback = programFilters.find(filter => pastOfferings.value.some(offering => offering.meta?.program === filter.value))
  if (fallback) programFilter.value = fallback.value
})

const levelColors: Record<OfferingLevel, string> = {
  introductory: 'primary',
  intermediate: 'warning',
  advanced: 'rose',
  executive: 'info'
}

const formatLevelLabel = (level?: OfferingLevel) => {
  if (!level) return null
  return level.split('-').map(part => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}

const getLevelColor = (level?: OfferingLevel) => {
  if (!level) return 'neutral'
  return levelColors[level] ?? 'neutral'
}

useSeoMeta({
  title: 'Offerings | Data Stewardship Academy'
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer class="space-y-16">
        <section class="space-y-6">
          <header class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upcoming</p>
            <div>
              <h1 class="text-3xl font-semibold">Upcoming Offerings</h1>
              <p class="text-muted-foreground">Discover the next experiences launching soon.</p>
            </div>
          </header>

          <div v-if="upcomingOfferings.length" class="space-y-6">
            <UCard
              v-for="offering in upcomingOfferings"
              :key="offering._id || offering.slug || offering.title"
              class="w-full transition-shadow hover:shadow-lg flex flex-col"
            >
              <template #header>
                <div class="flex flex-wrap gap-2">
                  <UBadge variant="subtle" color="primary">{{ offering.meta?.program }}</UBadge>
                  <UBadge
                    v-if="offering.meta?.level"
                    variant="soft"
                    :color="getLevelColor(offering.meta?.level)"
                  >
                    {{ formatLevelLabel(offering.meta?.level) }}
                  </UBadge>
                </div>
              </template>

              <div class="">
                <div class="space-y-2">
                  <h2 class="text-2xl font-semibold tracking-tight">
                    {{ offering.title }}
                  </h2>
                  <p class="text-muted-foreground">
                    {{ offering.meta?.summary ?? offering.description }}
                  </p>
                </div>
                <dl class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-layers" class="h-4 w-4" />
                    <span>{{ offering.meta?.format }}</span>
                  </div>
                  <div v-if="offering.meta?.schedule?.duration" class="flex items-center gap-2">
                    <UIcon name="i-lucide-clock" class="h-4 w-4" />
                    <span>{{ offering.meta?.schedule?.duration }}</span>
                  </div>
                  <div v-if="offering.meta?.location" class="flex items-center gap-2">
                    <UIcon name="i-lucide-map-pin" class="h-4 w-4" />
                    <span>{{ [offering.meta?.location?.city, offering.meta?.location?.country].filter(Boolean).join(', ') }}</span>
                  </div>
                </dl>
              </div>

              <template #footer>
                <UButton
                  color="secondary"
                  variant="solid"
                  :to="offering.path ?? '/offerings'"
                  trailing-icon="i-lucide-arrow-up-right"
                >
                  View more
                </UButton>
              </template>
            </UCard>
          </div>
          <UAlert v-else icon="i-lucide-info" title="No upcoming offerings" description="New programs will be announced soon." />
        </section>

        <section class="space-y-6">
          <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Archive</p>
              <h2 class="text-3xl font-semibold">Explore past programs</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="filter in programFilters"
                :key="filter.value"
                :variant="programFilter === filter.value ? 'solid' : 'ghost'"
                color="primary"
                size="sm"
                @click="programFilter = filter.value"
              >
                {{ filter.label }}
              </UButton>
            </div>
          </header>

          <div v-if="filteredPastOfferings.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <UCard
              v-for="offering in filteredPastOfferings"
              :key="offering._id || offering.slug || offering.title"
              class="h-full transition-shadow hover:shadow-lg"
            >
              <template #header>
                <div class="flex flex-wrap gap-2">
                  <UBadge variant="subtle" color="primary">{{ offering.meta?.program }}</UBadge>
                  <UBadge
                    v-if="offering.meta?.level"
                    variant="soft"
                    :color="getLevelColor(offering.meta?.level)"
                  >
                    {{ formatLevelLabel(offering.meta?.level) }}
                  </UBadge>
                </div>
              </template>

              <div class="flex flex-col gap-4">
                <div class="space-y-2">
                  <h3 class="text-xl font-semibold tracking-tight">
                    {{ offering.title }}
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    {{ offering.meta?.summary ?? offering.description }}
                  </p>
                </div>
                <dl class="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-layers" class="h-4 w-4" />
                    <span>{{ offering.meta?.format }}</span>
                  </div>
                  <div v-if="offering.meta?.schedule?.duration" class="flex items-center gap-2">
                    <UIcon name="i-lucide-clock" class="h-4 w-4" />
                    <span>{{ offering.meta?.schedule?.duration }}</span>
                  </div>
                  <div v-if="offering.meta?.location" class="flex items-center gap-2">
                    <UIcon name="i-lucide-map-pin" class="h-4 w-4" />
                    <span>{{ [offering.meta?.location?.city, offering.meta?.location?.country].filter(Boolean).join(', ') }}</span>
                  </div>
                </dl>
              </div>

              <template #footer>
                <UButton
                  color="secondary"
                  variant="solid"
                  size="sm"
                  :to="offering.path ?? '/offerings'"
                  trailing-icon="i-lucide-arrow-up-right"
                >
                  View more
                </UButton>
              </template>
            </UCard>
          </div>
          <UAlert v-else icon="i-lucide-info" title="No offerings found" description="Try a different filter to see more programs." />
        </section>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
