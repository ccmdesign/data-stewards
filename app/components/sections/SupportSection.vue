<script setup lang="ts">
interface Props {
  benefits: string[]
}

defineProps<Props>()
</script>

<template>
    <BaseSection
      id="why-support"
      :content="{
        title: 'Why support a data stewards course?',
        tagline: 'Backing this work multiplies impact across organizations, sectors, and regions.'
      }"
      color="muted"
      size="l"
      no-margin
    >
      <div class="flex gap-16 items-start">
        <!-- Left Image -->
        <div class="flex-1 h-[400px] relative rounded-lg overflow-hidden">
          <img
            alt=""
            class="absolute inset-0 max-w-none object-cover pointer-events-none rounded-lg size-full"
            src="/images/community-workshop-side.png"
          />
        </div>
        <!-- Right Content -->
        <div class="flex-1 flex flex-col gap-8">
          <ul class="space-y-2.5">
            <li
              v-for="(benefit, index) in benefits"
              :key="index"
              class="flex gap-2.5 items-start"
            >
              <div class="flex-shrink-0 w-4 h-4 mt-0.5">
                <img
                  src="/images/icon-check.svg"
                  alt=""
                  class="w-4 h-4"
                />
              </div>
              <p class="text-base font-semibold">{{ benefit }}</p>
            </li>
          </ul>
        </div>
      </div>
    </BaseSection>
</template>


