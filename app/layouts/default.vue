<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <section class="bg-primary/10">
      <UContainer class="py-12 sm:py-16 lg:py-24">
        <UPageCTA
          :title="'Ready to Transform Your Data Stewardship?'"
          :description="'Join our next cohort and become part of a global community of responsible data leaders.'"
          :links="[
            { label: 'Talk to Us', to: '/contact', size: 'lg', color: 'primary' },
            { label: 'Explore Programs', to: '/offerings', size: 'lg', variant: 'outline' }
          ]"
          variant="naked"
          class="rounded-none"
        />
      </UContainer>
    </section>

    <AppFooter />
  </div>
</template>

