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
    title="What Our Alumni Say"
    description="Join hundreds of data stewards who have transformed their organizations."
    padding="large"
    no-margin
  >
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <QuoteCard
        v-for="(testimonial, index) in testimonials"
        :key="index"
        :quote="testimonial.quote"
        :author="testimonial.author"
        :name="testimonial.name"
        :affiliation="testimonial.affiliation"
        :cohort="testimonial.cohort"
      />
    </div>
  </BaseSection>
</template>

