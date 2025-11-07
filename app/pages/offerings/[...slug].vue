<script setup lang="ts">
import type { OfferingDocument, OfferingEntry, OfferingLevel } from '~/types/offerings'
import { usePageHero } from '~/composables/usePageHero'

const route = useRoute()
const { setPageHero } = usePageHero()

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

// Fetch random testimonial
const { data: testimonials } = await useAsyncData('testimonials', () =>
  queryCollection('testimonials').find()
)

const randomTestimonial = computed(() => {
  if (!testimonials.value || testimonials.value.length === 0) {
    return {
      name: 'Anonymous',
      affiliation: 'Alumni',
      cohort: '',
      quote: 'This program has been transformative for my understanding of data stewardship.'
    }
  }

  // Filter testimonials by program if possible, otherwise use all
  const programTestimonials = testimonials.value.filter(t =>
    !offering.value?.meta?.program || t.program === offering.value?.meta?.program
  )

  const availableTestimonials = programTestimonials.length > 0 ? programTestimonials : testimonials.value

  // Get a consistent random testimonial based on offering path
  const seed = offering.value.path?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0
  const index = seed % availableTestimonials.length

  const testimonial = availableTestimonials[index]

  return {
    name: testimonial.name || 'Anonymous',
    affiliation: testimonial.affiliation || '',
    cohort: testimonial.cohort || '',
    quote: testimonial.body?.trim() || testimonial.quote || 'This program has been transformative for my understanding of data stewardship.'
  }
})

// Level color mapping (reused from index page)
const levelColors: Record<OfferingLevel, 'success' | 'warning' | 'error' | 'info'> = {
  introductory: 'success',
  intermediate: 'warning',
  advanced: 'error',
  executive: 'info'
}

const formatLevelLabel = (level?: OfferingLevel) => {
  if (!level) return null
  return level.split('-').map(part => part[0]?.toUpperCase() + part.slice(1)).join(' ')
}

const getLevelColor = (level?: OfferingLevel): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
  if (!level) return 'neutral'
  return levelColors[level] ?? 'neutral'
}


// Get registration button props based on status
const getRegistrationButtonProps = () => {
  const registration = offering.value?.meta?.registration
  if (!registration) return null

  const baseProps = {
    label: registration.label,
    to: registration.url,
    target: registration.url.startsWith('http') ? '_blank' : undefined,
    size: 'lg' as const
  }

  switch (registration.state) {
    case 'open':
      return { ...baseProps, color: 'primary' as const, variant: 'solid' as const }
    case 'waitlist':
      return { ...baseProps, color: 'warning' as const, variant: 'outline' as const }
    case 'invite-only':
      return { ...baseProps, color: 'neutral' as const, variant: 'outline' as const }
    case 'closed':
    default:
      return { ...baseProps, color: 'neutral' as const, variant: 'outline' as const, disabled: true }
  }
}


// Set page hero data
setPageHero({
  showHero: true,
  title: offering.value.title,
  subtitle: offering.value.meta?.program,
  description: offering.value.meta?.summary || offering.value.description,
  links: getRegistrationButtonProps() ? [getRegistrationButtonProps()] : undefined
})

useSeoMeta({
  title: `${offering.value.title} | Data Stewardship Academy`,
  description: offering.value.meta?.summary || offering.value.description
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer class="space-y-12">

        <!-- Main Content and Sidebar Layout -->
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main Content (Left Column) - Summary, Policies, Prerequisites, Quote -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Main Content Description -->
            <section class="space-y-6">
              <div class="prose prose-lg max-w-none">
                <MDC :value="offering.body" />
              </div>
            </section>

            <!-- Program-Specific Main Content -->
            <section v-if="offering.meta?.program === 'deep-dives'" class="space-y-8">
              <!-- Learning Objectives (Summary) -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-target" class="h-5 w-5" />
                  Learning Objectives
                </h3>
                <ul class="space-y-2 text-muted-foreground">
                  <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>Understand the role of data stewards in today's data re-use ecosystem.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>Familiarize yourself with the Data Stewards Canvas as a tool for practice.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-primary mt-1">•</span>
                    <span>Recognize stewardship as bridging technical, legal, and ethical domains.</span>
                  </li>
                </ul>
              </div>

              <!-- Structure (Policies) -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-list" class="h-5 w-5" />
                  Structure
                </h3>
                <div class="space-y-3">
                  <div class="flex items-start gap-3 p-3 bg-muted/20 rounded">
                    <span class="text-primary font-medium min-w-[5rem]">20 min</span>
                    <span>Concept Development: mini-lecture: history & rationale of stewardship</span>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-muted/20 rounded">
                    <span class="text-primary font-medium min-w-[5rem]">20 min</span>
                    <span>Interactive Exercise: The Data Stewards Canvas walkthrough</span>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-muted/20 rounded">
                    <span class="text-primary font-medium min-w-[5rem]">10 min</span>
                    <span>Discussion: Open discussion with participants</span>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-muted/20 rounded">
                    <span class="text-primary font-medium min-w-[5rem]">10 min</span>
                    <span>Summary and Wrap-Up</span>
                  </div>
                </div>
              </div>

              <!-- Benefits (Prerequisites) -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-star" class="h-5 w-5" />
                  Benefits
                </h3>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="p-4 bg-primary/5 rounded-lg">
                    <p class="font-medium">Certificate of Completion</p>
                  </div>
                  <div class="p-4 bg-primary/5 rounded-lg">
                    <p class="font-medium">Access to 200+ global data stewards alumni community</p>
                  </div>
                  <div class="p-4 bg-primary/5 rounded-lg col-span-full">
                    <p class="font-medium">Advanced Understanding of Innovative Perspectives around Data</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Foundations Program Main Content -->
            <section v-else-if="offering.meta?.program === 'foundations'" class="space-y-8">
              <!-- Summary -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-file-text" class="h-5 w-5" />
                  Summary
                </h3>
                <div class="prose prose-lg max-w-none">
                  <p>Students will learn the fundamentals of data stewardship through a six-week course focused on drafting a data re-use strategy. Students will be guided through each step of the process, from identifying the demand for data to translating data-driven insights into action. This course is specifically targeted to data practitioners serving in the German government. All lectures and coursework will focus on public sector examples based in Europe.</p>
                  <p>This course meets for three in-person sessions. The final course session will be devoted to peer-led presentations.</p>
                </div>
              </div>

              <!-- Policies -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-shield" class="h-5 w-5" />
                  Policies
                </h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2 p-3 bg-muted/20 rounded">
                    <span class="text-primary mt-1">•</span>
                    <span>Must be 18 years or older to enroll</span>
                  </li>
                  <li class="flex items-start gap-2 p-3 bg-muted/20 rounded">
                    <span class="text-primary mt-1">•</span>
                    <span>Must be participating in a professional capacity and on an individual basis (not "as a team")</span>
                  </li>
                  <li class="flex items-start gap-2 p-3 bg-muted/20 rounded">
                    <span class="text-primary mt-1">•</span>
                    <span>Must be willing and able to submit assignments for review</span>
                  </li>
                  <li class="flex items-start gap-2 p-3 bg-muted/20 rounded">
                    <span class="text-primary mt-1">•</span>
                    <span>Must have the ability to attend all sessions of the course</span>
                  </li>
                  <li class="flex items-start gap-2 p-3 bg-muted/20 rounded">
                    <span class="text-primary mt-1">•</span>
                    <span>Must possess English language proficiency</span>
                  </li>
                </ul>
              </div>

              <!-- Prerequisite -->
              <div class="space-y-4">
                <h3 class="text-2xl font-semibold flex items-center gap-2">
                  <UIcon name="i-lucide-check-circle" class="h-5 w-5" />
                  Prerequisite
                </h3>
                <div class="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p class="text-amber-800 dark:text-amber-200 font-medium">All course applicants must be able to attend all courses in person in Berlin.</p>
                </div>
              </div>
            </section>

            <!-- Testimonial (Quote) -->
            <section class="space-y-6">
              <QuoteCard
                :quote="randomTestimonial.quote"
                :name="randomTestimonial.name"
                :affiliation="randomTestimonial.affiliation"
                :cohort="randomTestimonial.cohort"
              />
            </section>
          </div>

          <!-- Sidebar (Right Column) - Everything else -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Badges and Key Details -->
            <section class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <UBadge variant="subtle" color="primary" size="sm">
                  {{ offering.meta?.program }}
                </UBadge>
                <UBadge
                  v-if="offering.meta?.level"
                  variant="soft"
                  :color="getLevelColor(offering.meta?.level)"
                  size="sm"
                >
                  {{ formatLevelLabel(offering.meta?.level) }}
                </UBadge>
              </div>

              <!-- Key Details Grid -->
              <div class="grid gap-2 sm:grid-cols-1">
                <div v-if="offering.meta?.format" class="flex items-center gap-2 bg-muted/30 rounded p-2 text-xs">
                  <UIcon name="i-lucide-layers" class="h-3 w-3 text-muted-foreground" />
                  <div>
                    <p class="font-medium text-muted-foreground uppercase tracking-wide text-xs">Format</p>
                    <p>{{ offering.meta?.format }}</p>
                  </div>
                </div>

                <div v-if="offering.meta?.schedule?.duration" class="flex items-center gap-2 bg-muted/30 rounded p-2 text-xs">
                  <UIcon name="i-lucide-clock" class="h-3 w-3 text-muted-foreground" />
                  <div>
                    <p class="font-medium text-muted-foreground uppercase tracking-wide text-xs">Duration</p>
                    <p>{{ offering.meta?.schedule?.duration }}</p>
                  </div>
                </div>

                <div v-if="offering.meta?.deliveryMode" class="flex items-center gap-2 bg-muted/30 rounded p-2 text-xs">
                  <UIcon name="i-lucide-monitor" class="h-3 w-3 text-muted-foreground" />
                  <div>
                    <p class="font-medium text-muted-foreground uppercase tracking-wide text-xs">Delivery</p>
                    <p capitalize>{{ offering.meta?.deliveryMode.replace('-', ' ') }}</p>
                  </div>
                </div>

                <div v-if="offering.meta?.location" class="flex items-center gap-2 bg-muted/30 rounded p-2 text-xs">
                  <UIcon name="i-lucide-map-pin" class="h-3 w-3 text-muted-foreground" />
                  <div>
                    <p class="font-medium text-muted-foreground uppercase tracking-wide text-xs">Location</p>
                    <p>{{ [offering.meta?.location?.city, offering.meta?.location?.country].filter(Boolean).join(', ') }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Part I Header for Deep Dives -->
            <section v-if="offering.meta?.program === 'deep-dives'" class="space-y-4">
              <div class="text-center p-4 bg-primary/5 rounded-lg">
                <h3 class="text-xl font-bold text-primary">Part I. Foundations of Data Stewardship</h3>
              </div>
            </section>

            <!-- Start Date Section -->
            <section class="space-y-4">
              <h3 class="text-lg font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-calendar" class="h-4 w-4" />
                Schedule
              </h3>
              <div class="bg-muted/30 rounded-lg p-4">
                <div v-if="offering.meta?.program === 'deep-dives'" class="space-y-3">
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">🕑</span>
                    <div>
                      <p class="font-medium">Mon, Tue, Wed</p>
                      <p class="text-muted-foreground">3pm-6pm CET</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">📍</span>
                    <p class="font-medium">Online</p>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">🏷️</span>
                    <p class="font-medium">EUR 200</p>
                  </div>
                </div>
                <div v-else-if="offering.meta?.program === 'foundations'" class="space-y-3">
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">🕑</span>
                    <div>
                      <p class="font-medium">Mon, Tue, Wed</p>
                      <p class="text-muted-foreground">3pm-6pm CET</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">📍</span>
                    <p class="font-medium">Berlin, Germany</p>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <span class="text-lg">🏷️</span>
                    <p class="font-medium">EUR 500</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Lecturer Section -->
            <section v-if="offering.meta?.lecturer" class="space-y-3">
              <h3 class="text-lg font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-user" class="h-4 w-4" />
                Lecturer
              </h3>
              <div class="bg-primary/5 rounded-lg p-4">
                <p class="font-medium">{{ offering.meta.lecturer }}</p>
              </div>
            </section>

            <!-- Masterclass Section (Deep Dives only) -->
            <section v-if="offering.meta?.program === 'deep-dives'" class="space-y-3">
              <h3 class="text-lg font-semibold">Masterclass</h3>
              <div class="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                <p class="text-sm font-medium">The Data Stewards Canvas</p>
                <p class="text-xs italic text-primary">Stewarding Strategic Data Futures</p>
              </div>
            </section>

            <!-- Cost & Capacity (Deep Dives only) -->
            <section v-if="offering.meta?.program === 'deep-dives'" class="space-y-3">
              <h3 class="text-lg font-semibold">Cost & Capacity</h3>
              <div class="bg-gradient-to-r from-orange-50 to-orange-25 dark:from-orange-950/20 dark:to-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <div class="text-center space-y-2">
                  <p class="text-sm font-semibold text-orange-800 dark:text-orange-200">COST</p>
                  <p class="text-lg font-bold text-orange-600 dark:text-orange-400">200.00 EUR</p>
                  <p class="text-xs text-muted-foreground">Max 30 participants</p>
                </div>
              </div>
            </section>

            <!-- Registration Section -->
            <section class="space-y-4">
              <h3 class="text-lg font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-user-plus" class="h-4 w-4" />
                Registration
              </h3>
              <div class="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <p class="text-sm mb-3">Individuals interested in participating should fill the application form.</p>
                <div v-if="offering.meta?.registration" class="flex gap-2">
                  <UButton
                    :color="getRegistrationButtonProps()?.color || 'primary'"
                    :variant="getRegistrationButtonProps()?.variant || 'solid'"
                    :disabled="getRegistrationButtonProps()?.disabled"
                    :to="getRegistrationButtonProps()?.to"
                    :target="getRegistrationButtonProps()?.target"
                    size="sm"
                  >
                    {{ getRegistrationButtonProps()?.label || 'Apply Now' }}
                  </UButton>
                </div>
                <p class="text-xs text-muted-foreground mt-2">
                  Questions? Email: <a href="mailto:datastewards@thegovlab.org" class="text-primary hover:underline">datastewards@thegovlab.org</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>
