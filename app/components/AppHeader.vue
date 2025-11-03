<script setup lang="ts">
const route = useRoute()
const { items } = useNavigation()

const navItems = computed(() =>
  items.value.map(item => ({
    label: item.label,
    to: item.path,
    active: route.path === item.path
  }))
)
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="text-sm font-semibold tracking-tight text-primary">
        Data Stewards Academy
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="navItems"
        variant="link"
        class="hidden lg:block"
      />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
