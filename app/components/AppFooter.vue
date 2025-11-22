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
  <footer class="text-white">
    <div class="bg-[#161F32]">
      <!-- CTA Section -->
      <div class="py-24 px-6 text-center border-b border-white/10">
        <UContainer class="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Transform Your Data Stewardship?
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl">
            Join our next cohort and become part of a global community of responsible data leaders.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 mt-4">
            <UButton
              size="xl"
              color="primary"
              label="Talk to Us"
              class="px-8"
            />
            <UButton
              size="xl"
              variant="outline"
              color="neutral"
              label="Explore Programs"
              class="px-8 bg-white/5 hover:bg-white/10 border-white/20 text-white ring-white/20"
            />
          </div>
        </UContainer>
      </div>

      <!-- Footer Columns Section -->
      <div class="py-16 px-6">
        <UContainer>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <!-- Resources Column -->
            <div class="md:col-span-3 flex flex-col gap-6">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">
                Resources
              </h3>
              <nav class="flex flex-col gap-3">
                <NuxtLink
                  v-for="link in resourcesLinks"
                  :key="link.label"
                  :to="link.to"
                  class="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </nav>
            </div>

            <!-- Features Column -->
            <div class="md:col-span-3 flex flex-col gap-6">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider">
                Features
              </h3>
              <nav class="flex flex-col gap-3">
                <NuxtLink
                  v-for="link in featuresLinks"
                  :key="link.label"
                  :to="link.to"
                  class="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </nav>
            </div>

            <!-- Newsletter Column -->
            <div class="md:col-span-6 flex flex-col gap-6 md:pl-12">
              <div class="flex flex-col gap-2">
                <h3 class="text-sm font-bold text-white uppercase tracking-wider">
                  Subscribe to our newsletter
                </h3>
              </div>
              
              <form @submit.prevent="onSubmit" class="relative max-w-md">
                <UInput
                  id="newsletter-email"
                  v-model="email"
                  type="email"
                  placeholder="enter your email"
                  class="w-full"
                  :ui="{
                    base: 'w-full py-3 pl-4 pr-28 bg-[#0B1121] border-white/10 text-white placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 rounded-lg'
                  }"
                  variant="none"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      :loading="loading"
                      size="sm"
                      color="primary"
                      label="Subscribe"
                      class="absolute right-1.5 top-1.5 bottom-1.5 rounded-md px-4"
                    />
                  </template>
                </UInput>
              </form>
            </div>
          </div>
        </UContainer>
      </div>
    </div>

    <!-- Footer Bottom Section -->
    <div class="py-8 border-t border-white/10 bg-[#0B1121]">
      <UContainer class="flex items-center justify-center">
        <p class="text-sm text-gray-500">
          Copyright © {{ currentYear }}. All rights reserved.
        </p>
      </UContainer>
    </div>
  </footer>
</template>
