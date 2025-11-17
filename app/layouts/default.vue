<template>
  <div class="flex min-h-screen flex-col">
    <AppPageHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <FinalCTASection
      title="Ready to Transform Your Data Stewardship?"
      description="Join our next cohort and become part of a global community of responsible data leaders."
      :primary-action="{ label: 'Talk to Us', to: '/contact', size: 'lg', color: 'primary' }"
      :secondary-action="{ label: 'Explore Programs', to: '/offerings', size: 'lg', variant: 'outline' }"
    />

    <AppFooter />
  </div>
</template>

