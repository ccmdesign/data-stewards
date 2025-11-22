<script setup lang="ts">
interface Testimonial {
  quote: string
  name: string
  affiliation?: string
  avatar?: string
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
    <div class="flex flex-col gap-6 max-w-5xl mx-auto">
      <UCarousel
        v-slot="{ item }"
        dots
        :items="testimonials"
        :ui="{ 
          item: 'basis-full',
        }"
        class="w-full"
      >
        <QuoteCard
          :quote="item.quote"
          :name="item.name"
          :affiliation="item.affiliation"
          :avatar="item.avatar"
        />
      </UCarousel>
    </div>
  </BaseSection>
</template>

