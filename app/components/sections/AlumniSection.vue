<script setup lang="ts">
interface Testimonial {
  quote: string
  author?: string
  name?: string
  affiliation?: string
  cohort?: string
}

interface Props {
  testimonials: Testimonial[]
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="testimonials"
    :content="{
      title: 'What Our Alumni Say',
      tagline: 'Join hundreds of data stewards who have transformed their organizations.'
    }"
    size="l"
    no-margin
  >
    <div class="flex flex-col gap-6">
      <UCarousel
        v-slot="{ item }"
        arrows
        dots
        :items="testimonials"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
        class="w-full"
      >
        <QuoteCard
          :quote="item.quote"
          :author="item.author"
          :name="item.name"
          :affiliation="item.affiliation"
          :cohort="item.cohort"
        />
      </UCarousel>
    </div>
  </BaseSection>
</template>

