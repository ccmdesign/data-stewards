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
      title: 'Become part of our community',
      tagline: 'We work with partners worldwide to make each cohort thrive. Support the movement in the way that fits you best.'
    }"
    color="muted"
    size="l"
    no-margin
  >
    <p class="text-lg text-muted-foreground">
      {{ introText }}
    </p>

    <div id="join-our-community" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <CollaborationCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :body="card.body"
      />
    </div>
  </BaseSection>
</template>


