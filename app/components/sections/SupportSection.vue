<script setup lang="ts">
interface Props {
  benefits: string[]
}

defineProps<Props>()
</script>

<template>
  <BaseSection
    id="why-support"
    :content="{}"
    size="l"
    no-margin
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Left Image -->
      <div class="h-[600px] relative rounded-2xl overflow-hidden group">
        <img
          alt="Community Workshop"
          class="absolute inset-0 max-w-none object-cover size-full transition-transform duration-700 group-hover:scale-105"
          src="/images/community-workshop-side.png"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
      </div>

      <!-- Right Content -->
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-4">
          <h2 class="text-4xl font-bold text-navy">Why support a data stewards course?</h2>
          <p class="text-lg text-gray-600 leading-relaxed max-w-[60ch]">
            Backing this work multiplies impact across organizations, sectors, and regions.
          </p>
        </div>

        <div class="flex flex-col gap-6">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex gap-5 items-start group/item"
          >
            <div class="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover/item:bg-primary-100 group-hover/item:text-primary-700 transition-colors">
              <UIcon
                name="i-lucide-check"
                class="w-6 h-6 shrink-0"
              />
            </div>
            <div class="flex flex-col gap-1 pt-2">
              <p class="text-lg text-gray-700 leading-relaxed font-medium group-hover/item:text-primary-700 transition-colors">
                {{ benefit }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseSection>
</template>


