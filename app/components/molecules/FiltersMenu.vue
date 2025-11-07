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
  <div class="flex flex-wrap gap-2 justify-center">
    <UButton
      v-for="item in items"
      :key="item.value"
      :variant="modelValue === item.value ? 'solid' : 'outline'"
      :disabled="item.disabled"
      :size="'md'"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
    </UButton>
  </div>
</template>

