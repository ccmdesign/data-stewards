<script setup lang="ts">
const toast = useToast()

const email = ref('')
const loading = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const resourcesLinks = [
  { label: 'Help center', to: '#' },
  { label: 'Docs', to: '#' },
  { label: 'Roadmap', to: '#' },
  { label: 'Changelog', to: '#' }
]

const featuresLinks = [
  { label: 'Affiliates', to: '#' },
  { label: 'Portal', to: '#' },
  { label: 'Jobs', to: '#' },
  { label: 'Sponsors', to: '#' }
]

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })

  setTimeout(() => {
    loading.value = false
    email.value = ''
  }, 1000)
}
</script>

<template>
  <footer class="bg-navy">
    <!-- Footer Columns Section -->
    <div class="border-b border-default px-28 py-12">
      <UContainer>
        <div class="flex gap-8">
          <!-- Resources Column -->
          <div class="flex-1 flex flex-col gap-6">
            <h3 class="text-sm font-semibold text-foreground">
              Resources
            </h3>
            <nav class="flex flex-col gap-4">
              <NuxtLink
                v-for="link in resourcesLinks"
                :key="link.label"
                :to="link.to"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Features Column -->
          <div class="flex-1 flex flex-col gap-6">
            <h3 class="text-sm font-semibold text-foreground">
              Features
            </h3>
            <nav class="flex flex-col gap-4">
              <NuxtLink
                v-for="link in featuresLinks"
                :key="link.label"
                :to="link.to"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </nav>
          </div>

          <!-- Newsletter Column -->
          <div class="flex-1 flex flex-col relative">
            <form
              @submit.prevent="onSubmit"
              class="flex flex-col gap-1"
            >
              <label
                for="newsletter-email"
                class="text-sm font-medium text-foreground"
              >
                Subscribe to our newsletter
              </label>
              <div class="relative pt-1">
                <UInput
                  id="newsletter-email"
                  v-model="email"
                  type="email"
                  placeholder="enter your email"
                  class="w-full bg-[var(--ui-color-neutral-900)] border-accented"
                  :ui="{ base: 'px-3 py-2 text-sm bg-[var(--ui-color-neutral-900)]' }"
                />
                <UButton
                  type="submit"
                  :loading="loading"
                  class="absolute bottom-[6px] right-[6.4px] px-2 py-1 text-xs"
                  color="primary"
                  size="xs"
                >
                  Subscribe
                </UButton>
              </div>
            </form>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Footer Bottom Section -->
    <div class="px-28 py-5 flex items-center justify-center">
      <p class="text-sm text-muted-foreground text-center">
        Copyright © {{ currentYear }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>
