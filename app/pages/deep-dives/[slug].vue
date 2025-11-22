<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'

const route = useRoute()
const slug = route.params.slug as string
const { setPageHero } = usePageHero()

const { data: pageData } = await useAsyncData(`deep-dive-${slug}`, () =>
  queryCollection('deepDives')
    .path(`/deep-dives/${slug}`)
    .first()
)

const page = computed(() => pageData.value)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Deep dive not found'
  })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})

const detailItems = computed(() => (
  page.value
    ? [
        { icon: 'i-lucide-calendar', label: 'Schedule', value: page.value.startDates },
        { icon: 'i-lucide-map-pin', label: 'Location', value: page.value.location },
        { icon: 'i-lucide-banknote', label: 'Tuition', value: page.value.tuition },
        { icon: 'i-lucide-users', label: 'Capacity', value: page.value.capacity }
      ].filter(item => Boolean(item.value))
    : []
))

const lecturer = computed(() => page.value?.lecturer)
const masterclass = computed(() => page.value?.masterclass)
const cta = computed(() => page.value?.cta)

// Set page hero data
const heroLinks = computed(() => {
  if (!cta.value) return undefined
  
  return [{
    label: cta.value.label,
    to: cta.value.to,
    target: cta.value.target ?? '_self',
    color: 'primary' as const,
    size: 'lg' as const
  }]
})

setPageHero({
  showHero: true,
  title: page.value.title,
  subtitle: masterclass.value?.title ?? 'Deep Dives',
  badge: masterclass.value?.subtitle,
  description: page.value.description,
  links: heroLinks.value
})
</script>

<template>
  <UPage>

    <UPageBody>
      <UContainer>
        <BaseSection
          v-if="detailItems.length || lecturer"
          :content="{
            title: 'Key Details',
            tagline: 'Quick facts for this masterclass'
          }"
        >
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <UCard v-for="item in detailItems" :key="item.label">
              <template #header>
                <div class="flex items-center gap-2 text-muted-foreground">
                  <UIcon :name="item.icon" />
                  <span class="text-sm font-semibold uppercase tracking-wide">{{ item.label }}</span>
                </div>
              </template>
              <p class="text-base">{{ item.value }}</p>
            </UCard>

            <UCard v-if="lecturer">
              <template #header>
                <span class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Lecturer
                </span>
              </template>
              <div class="space-y-1 text-base">
                <p class="font-semibold">{{ lecturer.name }}</p>
                <p v-if="lecturer.title" class="text-muted-foreground">{{ lecturer.title }}</p>
                <p v-if="lecturer.affiliation" class="text-muted-foreground">{{ lecturer.affiliation }}</p>
              </div>
            </UCard>
          </div>
        </BaseSection>

        <BaseSection :content="{ title: 'Overview' }">
          <div class="prose max-w-none dark:prose-invert">
            <ContentRenderer v-if="page" :value="page" />
          </div>
        </BaseSection>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

