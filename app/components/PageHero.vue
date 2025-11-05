<script setup lang="ts">
import { usePageHero } from '~/composables/usePageHero'

const { heroData } = usePageHero()
</script>

<template>
  <section
    v-if="heroData?.showHero"
    class="relative isolate overflow-hidden border border-primary/20 bg-primary/10 py-12 sm:py-16"
  >
    <HeroBackground />

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
</template>
