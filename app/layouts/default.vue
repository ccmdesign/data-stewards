<template>
  <div class="flex min-h-screen flex-col">
    <AppPageHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <BaseCTA
      title="Ready to Transform Your Data Stewardship?"
      description="Join our next cohort and become part of a global community of responsible data leaders."
      :links="[
        { label: 'Talk to Us', to: '/contact', size: 'lg', color: 'primary' },
        { label: 'Explore Programs', to: '/offerings', size: 'lg', variant: 'outline' }
      ]"
      variant="primary"
    />

    <AppFooter />
  </div>
</template>

