<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

interface ExchangeItem {
  title: string
  description: string
  icon?: string
}

interface Props {
  items: ExchangeItem[]
  primaryAction?: ButtonProps
  secondaryAction?: ButtonProps
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="exchange"
    :content="{}"
    size="l"
    no-margin
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Left Image -->
      <div class="h-[600px] relative rounded-2xl overflow-hidden group">
        <img
          alt="Exchange Network"
          class="absolute inset-0 max-w-none object-cover size-full transition-transform duration-700 group-hover:scale-105"
          src="/images/exchange-network.jpg"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
      </div>

      <!-- Right Content -->
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-4">
          <h2 class="text-4xl font-bold text-gray-900">Exchange</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            A vibrant network for practitioners, alumni, and partners to stay engaged and share knowledge.
          </p>
        </div>

        <div class="flex flex-col gap-6">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex gap-5 items-start group/item"
          >
            <div class="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover/item:bg-primary-100 group-hover/item:text-primary-700 transition-colors">
              <UIcon
                :name="item.icon || 'i-lucide-circle'"
                class="w-6 h-6 shrink-0"
              />
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-xl font-bold text-gray-900 group-hover/item:text-primary-700 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="primaryAction || secondaryAction" class="flex gap-4 mt-4">
          <UButton
            v-if="primaryAction"
            v-bind="primaryAction"
          />
          <UButton
            v-if="secondaryAction"
            v-bind="secondaryAction"
          />
        </div>
      </div>
    </div>
  </BaseSection>
</template>

