<script setup lang="ts">
interface CollaborationItem {
  title: string
  body: string
}

interface Props {
  cards: CollaborationItem[]
  introText?: string
}

withDefaults(defineProps<Props>(), {
  introText: 'Interested in working with us? You can support a data stewards course in different ways:'
})
</script>

<template>
    <BaseSection
      id="become-partner"
      :content="{
        title: 'Stay Updated',
        tagline: 'We work with partners worldwide to make each cohort thrive. Support the movement in the way that fits you best. Interested in working with us? You can support a data stewards course in different ways:'
      }"
      color="muted"
      size="l"
      no-margin
    >
      <div id="join-our-community" class="flex flex-col gap-8">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ContentCard
            v-for="(card, index) in cards"
            :key="index"
            :title="card.title"
            :description="card.body"
          >
            <template #footer>
              <UButton
                label="Contact Us"
                to="/contact"
                color="primary"
                size="lg"
              />
            </template>
          </ContentCard>
        </div>
      </div>
  </BaseSection>
</template>


