<template>
  <div class="flex min-h-screen flex-col">
    <AppPageHeader />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>

