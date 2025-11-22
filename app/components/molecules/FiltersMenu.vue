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
  <div class="flex flex-wrap items-center gap-8">
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      :disabled="item.disabled"
      class="group relative pb-2 text-base transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      :class="[
        modelValue === item.value
          ? 'font-bold text-highlighted'
          : 'font-medium text-muted-foreground hover:text-highlighted'
      ]"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
      <span
        v-if="modelValue === item.value"
        class="absolute bottom-0 left-0 h-0.5 w-full bg-primary-500"
      />
    </button>
  </div>
</template>

