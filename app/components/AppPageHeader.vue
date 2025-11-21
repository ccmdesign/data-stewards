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
const mobileMenuOpen = ref(false)

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
  return '/images/Subtract.svg'
})

const isPatternBackground = computed(() => heroBackgroundImage.value === '/images/Subtract.svg')

const overlayClasses = computed(() => {
  if (isPatternBackground.value) {
    return 'absolute inset-0 overflow-hidden opacity-50 mix-blend-overlay'
  }
  return 'absolute inset-0 mix-blend-overlay opacity-75 overflow-hidden'
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
    <header class="bg-[#0B1121] border-b border-white/10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <!-- Logo -->
          <div class="flex lg:flex-1 justify-start">
            <NuxtLink to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Data Stewards Academy</span>
              <img class="h-auto w-auto max-w-[180px]" src="/images/logo.svg" alt="Data Stewards Academy" />
            </NuxtLink>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex lg:gap-x-8">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-sm font-medium leading-6 transition-colors duration-200"
              :class="[
                item.active 
                  ? 'text-[#38BDF8] border-b-2 border-[#38BDF8] pb-1' 
                  : 'text-gray-300 hover:text-white'
              ]"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <!-- Right Actions -->
          <div class="flex flex-1 justify-end items-center gap-4">
            <UColorModeButton class="text-gray-300 hover:text-white" />
            
            <!-- Mobile Menu Button (Visible on small screens) -->
            <div class="flex lg:hidden">
              <UButton
                icon="i-lucide-menu"
                color="neutral"
                variant="ghost"
                class="text-gray-300"
                @click="mobileMenuOpen = true"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <USlideover v-model="mobileMenuOpen" class="lg:hidden">
        <div class="p-6 flex flex-col gap-6 bg-[#0B1121] h-full">
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
              <span class="sr-only">Data Stewards Academy</span>
              <img class="h-auto w-auto max-w-[180px]" src="/images/logo.svg" alt="Data Stewards Academy" />
            </NuxtLink>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              class="text-gray-300"
              @click="mobileMenuOpen = false"
            />
          </div>
          <nav class="flex flex-col gap-4">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-base font-medium leading-7 text-gray-300 hover:text-white"
              @click="mobileMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </USlideover>
    </header>

    <!-- Hero Section -->
    <section
      v-if="heroData?.showHero"
      class="relative isolate overflow-hidden bg-[#0B1121] min-h-[600px] flex items-center"
    >
      <!-- Hero Background Overlay -->
      <div
        aria-hidden="true"
        class="absolute inset-0 pointer-events-none"
      >
        <div class="absolute bg-[#0B1121] inset-0" />
        <div :class="overlayClasses">
          <img
            v-if="!isPatternBackground"
            alt=""
            class="absolute h-[112.66%] left-0 max-w-none top-[9.02%] w-full opacity-20"
            :src="heroBackgroundImage"
          />
          <div
            v-else
            class="absolute inset-0 w-full h-full opacity-100"
            :style="{
              backgroundImage: `url(${heroBackgroundImage})`,
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center top'
            }"
          />
        </div>
      </div>

      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative z-10">
        <!-- Left Content -->
        <div class="flex flex-col justify-center px-6 lg:pl-28 lg:pr-12 py-20 lg:py-32">
          <div class="flex flex-col gap-8 max-w-2xl">
            <!-- Badge -->
            <div v-if="heroData.badge">
              <span class="inline-flex items-center rounded-full bg-[#162032] px-4 py-1.5 text-sm font-medium text-[#38BDF8] ring-1 ring-inset ring-[#38BDF8]/20">
                {{ heroData.badge }}
              </span>
            </div>

            <!-- Title and Description -->
            <div class="flex flex-col gap-6">
              <h1 class="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                {{ heroData.title }}
              </h1>
              <p class="text-xl leading-8 text-gray-400 max-w-lg">
                {{ heroData.description }}
              </p>
            </div>

            <!-- Stats -->
            <div
              v-if="heroData.stats && heroData.stats.length > 0"
              class="flex gap-12 pt-4"
            >
              <div
                v-for="(stat, index) in heroData.stats"
                :key="index"
                class="flex flex-col gap-1"
              >
                <p class="text-4xl font-bold text-white">
                  {{ stat.value }}
                </p>
                <p class="text-base text-gray-400">
                  {{ stat.label }}
                </p>
              </div>
            </div>

            <!-- CTA Links -->
            <div
              v-if="heroData.links && heroData.links.length > 0"
              class="flex gap-6 items-center pt-4"
            >
              <UButton
                v-for="(link, index) in heroData.links"
                :key="index"
                v-bind="{ ...link }"
                size="xl"
                class="px-8 rounded-full"
              />
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative h-[400px] lg:h-full w-full">
          <img
            alt="Data Stewardship"
            class="absolute inset-0 h-full w-full object-cover"
            src="/images/hero-image.png"
          />
        </div>
      </div>
    </section>
  </div>
</template>

