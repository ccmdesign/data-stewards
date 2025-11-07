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
      class="relative isolate overflow-hidden border border-primary/20 bg-primary/10 py-12 sm:py-16"
    >
      <!-- Hero Background -->
      <ClientOnly>
        <div
          class="absolute w-full -top-px transition-all text-primary shrink-0"
          :class="[
            appear ? '' : 'opacity-0',
            appeared ? 'duration-[400ms]': 'duration-1000'
          ]"
        >
          <svg
            viewBox="0 0 1440 181"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="pointer-events-none"
          >
            <mask
              id="path-1-inside-1_414_5526"
              fill="white"
            >
              <path d="M0 0H1440V181H0V0Z" />
            </mask>
            <path
              d="M0 0H1440V181H0V0Z"
              fill="url(#paint0_linear_414_5526)"
              fill-opacity="0.22"
            />
            <path
              d="M0 2H1440V-2H0V2Z"
              fill="url(#paint1_linear_414_5526)"
              mask="url(#path-1-inside-1_414_5526)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_414_5526"
                x1="720"
                y1="0"
                x2="720"
                y2="181"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="currentColor" />
                <stop
                  offset="1"
                  stop-color="currentColor"
                  stop-opacity="0"
                />
              </linearGradient>
              <linearGradient
                id="paint1_linear_414_5526"
                x1="0"
                y1="90.5"
                x2="1440"
                y2="90.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stop-color="currentColor"
                  stop-opacity="0"
                />
                <stop
                  offset="0.5"
                  stop-color="currentColor"
                />
                <stop
                  offset="1"
                  stop-color="currentColor"
                  stop-opacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <template #fallback>
          <div class="absolute w-full -top-px text-primary shrink-0 opacity-0">
            <svg
              viewBox="0 0 1440 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="pointer-events-none"
            >
              <mask
                id="path-1-inside-1_414_5526"
                fill="white"
              >
                <path d="M0 0H1440V181H0V0Z" />
              </mask>
              <path
                d="M0 0H1440V181H0V0Z"
                fill="url(#paint0_linear_414_5526)"
                fill-opacity="0.22"
              />
              <path
                d="M0 2H1440V-2H0V2Z"
                fill="url(#paint1_linear_414_5526)"
                mask="url(#path-1-inside-1_414_5526)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_414_5526"
                  x1="720"
                  y1="0"
                  x2="720"
                  y2="181"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="currentColor" />
                  <stop
                    offset="1"
                    stop-color="currentColor"
                    stop-opacity="0"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_414_5526"
                  x1="0"
                  y1="90.5"
                  x2="1440"
                  y2="90.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    stop-color="currentColor"
                    stop-opacity="0"
                  />
                  <stop
                    offset="0.5"
                    stop-color="currentColor"
                  />
                  <stop
                    offset="1"
                    stop-color="currentColor"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </template>
      </ClientOnly>

      <!-- Hero Content -->
      <div class="px-6 sm:px-12">
        <UPageHero
          class="relative z-10 mx-auto max-w-4xl space-y-8 text-left"
          :description="heroData.description"
          :links="heroData.links ? JSON.parse(JSON.stringify(heroData.links)) : undefined"
        >
          <template #title>
            <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span
                v-if="heroData.subtitle"
                class="mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-primary"
              >
                {{ heroData.subtitle }}
              </span>
              {{ heroData.title }}
            </h1>
          </template>

          <template #below-title>
            <slot name="below-title" />
          </template>
        </UPageHero>
      </div>
    </section>
  </div>
</template>

