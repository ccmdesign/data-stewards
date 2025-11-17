<script setup lang="ts">
export type FilterItem = {
  label: string
  value: string
  disabled: boolean
}

interface Props {
  items: FilterItem[]
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleClick = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-0">
    <UButton
      v-for="(item, index) in items"
      :key="item.value"
      :variant="modelValue === item.value ? 'solid' : 'outline'"
      :color="modelValue === item.value ? 'primary' : 'neutral'"
      :disabled="item.disabled"
      :size="'md'"
      :class="[
        index > 0 && '-ml-px',
        index === 0 && 'rounded-r-none',
        index === items.length - 1 && 'rounded-l-none',
        index > 0 && index < items.length - 1 && 'rounded-none',
        'flex-shrink-0'
      ]"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
    </UButton>
  </div>
</template>

