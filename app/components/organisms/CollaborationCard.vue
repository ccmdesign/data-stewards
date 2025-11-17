<script setup lang="ts">
interface CollaborationCardProps {
  title: string
  body: string
}

defineProps<CollaborationCardProps>()
</script>

<template>
  <UCard
    variant="bordered"
    radius="2xl"
    :ui="{
      root: 'flex flex-col h-full',
      header: 'px-6 py-4',
      body: 'px-6 py-6 flex-1',
      footer: 'px-6 py-4'
    }"
  >
    <template #header>
      <h3 class="text-2xl font-semibold">{{ title }}</h3>
    </template>
    <template #default>
      <p class="text-base text-muted-foreground text-center">{{ body }}</p>
    </template>
    <template #footer>
      <UButton
        label="Contact Us"
        to="/contact"
        color="primary"
        size="lg"
      />
    </template>
  </UCard>
</template>


