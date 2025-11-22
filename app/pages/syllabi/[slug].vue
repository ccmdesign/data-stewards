<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'

const route = useRoute()
const slug = route.params.slug as string
const { setPageHero } = usePageHero()

interface SyllabusDocument {
  title: string
  description?: string
  excerpt?: string
  program?: string
  start_schedule?: string
  start_date?: string
  duration?: string
  location?: string
  venue?: string
  tuition?: string
  lecturer?: string
  format?: string
  delivery?: string
  host?: string
  capacity?: string
  registration_url?: string
  registration_email?: string
  [key: string]: unknown
}

const { data: syllabusData } = await useAsyncData(`syllabi-${slug}`, () =>
  queryCollection('syllabi').path(`/syllabi/${slug}`).first()
)

const syllabus = computed<SyllabusDocument>(() => {
  if (!syllabusData.value) {
    throw createError({
      statusCode: 404,
      message: 'Syllabus not found'
    })
  }

  return syllabusData.value
})

const formatProgram = (value?: string | null) => {
  if (!value) {
    return undefined
  }

  return value
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const detailItems = computed(() => {
  const current = syllabus.value

  const rows: Array<{ label: string; value: string }> = [
    { label: 'Program', value: formatProgram(current.program) ?? '' },
    { label: 'Lecturer', value: (current.lecturer as string) ?? '' },
    { label: 'Schedule', value: (current.start_schedule as string) ?? '' },
    { label: 'Format', value: ((current.format as string) ?? (current.delivery as string)) ?? '' },
    { label: 'Location', value: (current.location as string) ?? '' },
    { label: 'Venue', value: (current.venue as string) ?? '' },
    { label: 'Tuition', value: (current.tuition as string) ?? '' },
    { label: 'Host', value: (current.host as string) ?? '' },
    { label: 'Capacity', value: (current.capacity as string) ?? '' },
    { label: 'Duration', value: (current.duration as string) ?? '' },
    { label: 'Start Date', value: (current.start_date as string) ?? '' }
  ]

  return rows.filter(item => Boolean(item.value))
})

const actionLinks = computed<ButtonProps[]>(() => {
  const current = syllabus.value

  const links: ButtonProps[] = []

  if (typeof current.registration_url === 'string' && current.registration_url.length) {
    links.push({
      label: 'Apply Now',
      to: current.registration_url,
      target: '_blank',
      icon: 'i-lucide-external-link',
      color: 'primary'
    })
  }

  if (typeof current.registration_email === 'string' && current.registration_email.length) {
    const email = current.registration_email.startsWith('mailto:')
      ? current.registration_email
      : `mailto:${current.registration_email}`

    links.push({
      label: 'Email the Team',
      to: email,
      icon: 'i-lucide-mail'
    })
  }

  if (typeof current.program === 'string' && current.program.length) {
    links.push({
      label: 'Program Overview',
      to: `/programs/${current.program}`,
      variant: 'outline'
    })
  }

  return links
})

const metaDescription = computed(
  () => syllabus.value.description ?? (syllabus.value.excerpt as string | undefined)
)

useSeoMeta({
  title: `${syllabus.value.title} | Data Stewardship Academy`,
  description: metaDescription.value
})

setPageHero({
  showHero: true,
  title: syllabus.value.title,
  subtitle: formatProgram(syllabus.value.program),
  description: metaDescription.value,
  links: actionLinks.value
})
</script>

<template>
  <UPage>

    <UPageBody>
      <UContainer>
        <UPageSection
          v-if="detailItems.length"
          title="At a Glance"
          description="Key information about this cohort"
        >
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <UCard v-for="item in detailItems" :key="item.label">
              <template #header>
                <span>{{ item.label }}</span>
              </template>
              <p>{{ item.value }}</p>
            </UCard>
          </div>
        </UPageSection>

        <UPageSection title="Course Outline">
          <div class="prose max-w-none dark:prose-invert">
            <ContentRenderer :value="syllabus" :prose="true" />
          </div>
        </UPageSection>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

