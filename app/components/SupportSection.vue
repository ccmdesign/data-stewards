<script setup lang="ts">
interface Props {
  benefits: string[]
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="why-support"
    title="Why support a data stewards course?"
    description="Backing this work multiplies impact across organizations, sectors, and regions."
    padding="large"
    no-margin
  >
    <UCard>
      <ul class="list-disc space-y-3 pl-6">
        <li v-for="(benefit, index) in benefits" :key="index">{{ benefit }}</li>
      </ul>
    </UCard>
  </BaseSection>
</template>

