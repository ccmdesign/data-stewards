<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface OutcomesCardProps {
  outcomes: string[]
  primaryAction?: ButtonProps
  secondaryAction?: ButtonProps
}

const props = defineProps<OutcomesCardProps>()
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-semibold">Learning Outcomes</span>
    </template>
    <ul class="list-disc space-y-2 pl-5">
      <li v-for="(outcome, index) in outcomes" :key="index">{{ outcome }}</li>
    </ul>
    <div v-if="primaryAction || secondaryAction" class="mt-4 flex justify-center gap-3">
      <UButton
        v-if="primaryAction"
        v-bind="primaryAction"
      />
      <UButton
        v-if="secondaryAction"
        v-bind="secondaryAction"
      />
    </div>
  </UCard>
</template>

