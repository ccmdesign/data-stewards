<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'

const route = useRoute()
const { items } = useNavigation()
const { heroData } = usePageHero()

const navItems = computed(() =>
  items.value.map(item => ({
    label: item.label,
    to: item.path,
    active: route.path === item.path
  }))
)

const appear = ref(false)
const appeared = ref(false)

const isOfferingsPage = computed(() => route.path.startsWith('/offerings'))
const isNewsPage = computed(() => route.path.startsWith('/news'))

const heroBackgroundImage = computed(() => {
  if (isOfferingsPage.value) {
    return '/images/offerings-hero-bg.png'
  }
  if (route.path === '/community') {
    return '/images/community-hero-bg.png'
  }
  if (route.path.startsWith('/news')) {
    return '/images/news-hero-bg.png'
  }
  return '/images/hero-background.png'
})

onMounted(() => {
  if (import.meta.client) {
    setTimeout(() => {
      appear.value = true
      setTimeout(() => {
        appeared.value = true
      }, 1000)
    }, 0)
  }
})
</script>

<template>
  <div>
    <!-- Header Section -->
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="text-sm font-semibold tracking-tight text-primary">
          Data Stewards Academy
        </NuxtLink>
      </template>

      <template #right>
        <UNavigationMenu
          :items="navItems"
          variant="link"
          class="hidden lg:block"
        />

        <UColorModeButton />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <!-- Hero Section -->
    <section
      v-if="heroData?.showHero"
      class="relative isolate overflow-hidden bg-navy rounded-bl-[32px] rounded-br-[32px]"
    >
      <!-- Hero Background Overlay -->
      <div
        aria-hidden="true"
        class="absolute inset-0 pointer-events-none rounded-bl-[32px] rounded-br-[32px]"
      >
        <div class="absolute bg-navy inset-0 rounded-bl-[32px] rounded-br-[32px]" />
        <div class="absolute inset-0 mix-blend-overlay opacity-75 overflow-hidden rounded-bl-[32px] rounded-br-[32px]">
          <img
            alt=""
            class="absolute h-[112.66%] left-0 max-w-none top-[9.02%] w-full"
            :src="heroBackgroundImage"
          />
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative mx-auto max-w-7xl px-7 py-32">
        <div :class="isOfferingsPage || isNewsPage ? 'flex flex-col gap-4' : 'flex gap-24 items-center'">
          <!-- Left Content -->
          <div :class="isOfferingsPage || isNewsPage ? 'flex flex-col gap-4 w-full' : 'flex-1 flex flex-col gap-4'">
            <!-- Badge -->
            <UBadge
              v-if="heroData.badge"
              color="primary"
              variant="subtle"
              :class="isOfferingsPage ? 'self-start' : 'self-start'"
            >
              {{ heroData.badge }}
            </UBadge>

            <!-- Title and Description -->
            <div :class="isOfferingsPage ? 'flex flex-col gap-10 w-full' : 'flex flex-col gap-10'">
              <div class="flex flex-col gap-6">
                <h1 :class="isOfferingsPage ? 'text-5xl font-semibold leading-[48px] text-white' : 'text-6xl font-semibold leading-[60px] text-white'">
                  {{ heroData.title }}
                </h1>
                <p :class="isOfferingsPage ? 'text-xl leading-6 text-muted-foreground' : 'text-xl leading-8 text-muted-foreground'">
                  {{ heroData.description }}
                </p>
              </div>

              <!-- Stats -->
              <div
                v-if="heroData.stats && heroData.stats.length > 0"
                class="flex gap-4"
              >
                <div
                  v-for="(stat, index) in heroData.stats"
                  :key="index"
                  class="flex-1 flex flex-col"
                >
                  <p class="text-5xl font-semibold leading-[48px] text-white">
                    {{ stat.value }}
                  </p>
                  <p class="text-xl leading-8 text-white">
                    {{ stat.label }}
                  </p>
                </div>
              </div>

              <!-- CTA Links -->
              <div
                v-if="heroData.links && heroData.links.length > 0"
                class="flex gap-6 items-center"
              >
                <UButton
                  v-for="(link, index) in heroData.links"
                  :key="index"
                  v-bind="link"
                  size="lg"
                />
              </div>
            </div>
          </div>

          <!-- Right Image (only on non-offerings and non-news pages) -->
          <div v-if="!isOfferingsPage && !isNewsPage" class="flex-shrink-0 w-[560px]">
            <div class="relative rounded-lg h-full w-full aspect-[560/400] overflow-hidden">
              <img
                alt=""
                class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-lg size-full"
                src="/images/hero-image.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

