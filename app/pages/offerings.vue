<script setup lang="ts">
import { computed, h, ref, resolveComponent, watchEffect } from 'vue'
import type { OfferingProgram, OfferingStatus, OfferingWithRelations } from '~/app/types/offerings'

const {
  meta,
  previewOfferings,
  upcomingOfferings,
  pastByProgram,
  programOptions,
  statusOptions,
  partnerOptions,
  filterOfferings,
  testimonials,
  isLoading
} = await useOfferings()

const selectedProgram = ref<'all' | OfferingProgram>('all')
const selectedStatus = ref<'all' | OfferingStatus>('all')
const selectedPartner = ref<'all' | string>('all')

watchEffect(() => {
  const match = programOptions.value.find(option => option.value === selectedProgram.value)
  if (!match || (match.value !== 'all' && match.count === 0)) {
    selectedProgram.value = 'all'
  }
})

watchEffect(() => {
  const match = statusOptions.value.find(option => option.value === selectedStatus.value)
  if (!match || (match.value !== 'all' && match.count === 0)) {
    selectedStatus.value = 'all'
  }
})

watchEffect(() => {
  const match = partnerOptions.value.find(option => option.value === selectedPartner.value)
  if (!match || (match.value !== 'all' && match.count === 0)) {
    selectedPartner.value = 'all'
  }
})

const filteredUpcoming = computed(() =>
  filterOfferings({
    program: selectedProgram.value,
    status: selectedStatus.value,
    partner: selectedPartner.value
  })
)

const foundationsPast = computed(() => pastByProgram.value.foundations ?? [])

const heroCtas = computed(() => meta.value.hero?.ctas ?? [])
const searchHeading = computed(() => meta.value.search?.heading ?? 'Search – Filters')
const previewHeading = computed(() => meta.value.preview?.heading ?? 'Preview on this page')

useSeoMeta({
  title: computed(() => meta.value.title ?? 'Offerings')
})

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')

const upcomingColumns = computed(() => [
  {
    id: 'title',
    header: 'Course',
    accessorKey: 'title',
    cell: ({ row }: { row: { original: OfferingWithRelations } }) =>
      h('div', [
        h('div', { class: 'font-semibold' }, row.original.title),
        row.original.summary ? h('p', { class: 'text-sm text-muted-foreground' }, row.original.summary) : null
      ])
  },
  {
    id: 'format',
    header: 'Format',
    accessorFn: (row: OfferingWithRelations) => row.format ?? '—'
  },
  {
    id: 'dates',
    header: 'Dates',
    accessorFn: (row: OfferingWithRelations) => row.dates ?? '—'
  },
  {
    id: 'partners',
    header: 'Partners',
    cell: ({ row }: { row: { original: OfferingWithRelations } }) => {
      if (!row.original.partnersDetailed.length) {
        return h('span', '—')
      }

      return h(
        'div',
        row.original.partnersDetailed.map(partner =>
          h(
            UBadge as any,
            {
              key: partner.slug,
              label: partner.name,
              variant: 'subtle',
              color: 'neutral'
            }
          )
        )
      )
    }
  },
  {
    id: 'registration',
    header: 'Register',
    cell: ({ row }: { row: { original: OfferingWithRelations } }) => {
      const registration = row.original.registration

      if (!registration) {
        return h('span', '—')
      }

      const disabled = registration.state === 'closed'
      const color = registration.state === 'open' ? 'primary' : 'neutral'
      const variant = registration.state === 'open' ? 'solid' : 'outline'

      return h(
        UButton as any,
        {
          label: registration.label,
          to: registration.url,
          size: 'sm',
          color,
          variant,
          disabled,
          target: '_blank'
        }
      )
    }
  }
])

const previewColumns = computed(() => [
  {
    id: 'course',
    header: 'Course',
    accessorKey: 'title'
  },
  {
    id: 'lecturer',
    header: 'Lecturer',
    accessorFn: (row: OfferingWithRelations) => row.lecturer ?? '—'
  },
  {
    id: 'program',
    header: 'Filter',
    accessorFn: (row: OfferingWithRelations) => row.program
  },
  {
    id: 'partners',
    header: 'Partners',
    accessorFn: (row: OfferingWithRelations) =>
      row.partnersDetailed.map(partner => partner.name).join(', ') || '—'
  }
])

const programTabs = computed(() =>
  programOptions.value.map(option => ({
    label: `${option.label}`,
    value: option.value,
    badge: option.count,
    disabled: option.value !== 'all' && option.count === 0
  }))
)

const statusItems = computed(() =>
  statusOptions.value.map(option => ({
    label: option.label,
    value: option.value,
    disabled: option.value !== 'all' && option.count === 0
  }))
)

const partnerItems = computed(() =>
  partnerOptions.value.map(option => ({
    label: option.label,
    value: option.value,
    disabled: option.value !== 'all' && option.count === 0
  }))
)

const testimonialsList = computed(() => testimonials.value ?? [])
</script>

<template>
  <div class="relative">
    <UPageHero
      :description="meta.hero?.description"
    >
      <template #title>
        <div class="space-y-3">
          <span v-if="meta.hero?.eyebrow" class="text-sm uppercase tracking-[0.3em] text-primary">
            {{ meta.hero.eyebrow }}
          </span>
          <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
            {{ meta.hero?.title ?? 'Offerings' }}
          </h1>
        </div>
      </template>

      <template #links>
        <div class="flex flex-wrap gap-3">
          <component
            :is="UButton"
            v-for="cta in heroCtas"
            :key="cta.label"
            :label="cta.label"
            :to="cta.to"
            size="lg"
            color="primary"
            target="_blank"
          />
        </div>
      </template>
    </UPageHero>

    <UPage>
      <UPageBody>
        <UPageSection :title="searchHeading">
          <UCard>
            <div class="space-y-6">
              <UTabs
                v-model="selectedProgram"
                :items="programTabs"
                :content="false"
                size="md"
                variant="pill"
              />

              <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <USelectMenu
                  v-model="selectedStatus"
                  :items="statusItems"
                  placeholder="Filter by status"
                />
                <USelectMenu
                  v-model="selectedPartner"
                  :items="partnerItems"
                  placeholder="Filter by partner"
                />
              </div>
            </div>
          </UCard>
        </UPageSection>

        <UPageSection title="Upcoming Offerings">
          <UTable
            :columns="upcomingColumns"
            :data="filteredUpcoming"
            :loading="isLoading"
            empty="No offerings match the selected filters."
          />
        </UPageSection>

        <UPageSection v-if="previewOfferings.length" :title="previewHeading">
          <UTable
            :columns="previewColumns"
            :data="previewOfferings"
            empty="Preview list is empty."
          />
        </UPageSection>

        <UPageSection v-if="foundationsPast.length" title="Previous Foundations">
          <div class="space-y-4">
            <UCard v-for="offering in foundationsPast" :key="offering._id">
              <template #header>
                <div>
                  <h3 class="text-lg font-semibold">{{ offering.title }}</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ offering.dates }}
                    <span v-if="offering.location"> · {{ offering.location }}</span>
                  </p>
                </div>
              </template>

              <template #default>
                <p>{{ offering.summary }}</p>
              </template>

              <template #footer v-if="offering.partnersDetailed.length">
                <div class="flex flex-wrap gap-2 text-sm">
                  <span class="text-muted-foreground">Partners:</span>
                  <span v-for="partner in offering.partnersDetailed" :key="partner.slug">
                    {{ partner.name }}
                  </span>
                </div>
              </template>
            </UCard>
          </div>
        </UPageSection>

        <UPageSection v-if="meta.cta?.primary || meta.cta?.secondary" title="Get in touch">
          <UCallout icon="i-lucide-calendar-heart">
            <template #title>
              {{ meta.hero?.title ?? 'Offerings' }}
            </template>

            <template #description>
              <p>{{ meta.hero?.description }}</p>
            </template>

            <template #actions>
              <div class="flex flex-wrap gap-3">
                <component
                  v-if="meta.cta?.primary"
                  :is="UButton"
                  :label="meta.cta.primary.label"
                  :to="meta.cta.primary.to"
                  size="md"
                  color="primary"
                  target="_blank"
                />
                <component
                  v-if="meta.cta?.secondary"
                  :is="UButton"
                  :label="meta.cta.secondary.label"
                  :to="meta.cta.secondary.to"
                  size="md"
                  variant="outline"
                  target="_blank"
                />
              </div>
            </template>
          </UCallout>
        </UPageSection>

        <UPageSection v-if="testimonialsList.length" title="Testimonials">
          <div class="grid gap-4 lg:grid-cols-2">
            <UCard v-for="testimonial in testimonialsList" :key="testimonial._id">
              <template #header>
                <div>
                  <h3 class="text-lg font-semibold">{{ testimonial.name }}</h3>
                  <p class="text-sm text-muted-foreground">
                    <span v-if="testimonial.affiliation">{{ testimonial.affiliation }}</span>
                    <span v-if="testimonial.cohort">
                      <span v-if="testimonial.affiliation"> · </span>{{ testimonial.cohort }}
                    </span>
                  </p>
                </div>
              </template>

              <ContentRenderer :value="testimonial" />
            </UCard>
          </div>
        </UPageSection>
      </UPageBody>
    </UPage>
  </div>
</template>

