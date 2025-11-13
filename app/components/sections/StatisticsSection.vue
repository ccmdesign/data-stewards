<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

interface Props {
  stats: Stat[]
}

defineProps<Props>()
</script>

<template>
  <UPageSection class="statistics-section">
    <div class="statistics-container">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-item"
      >
        <div class="stat-value">
          {{ stat.value }}
        </div>
        <div class="stat-label">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </UPageSection>
</template>

<style scoped>
.statistics-section {
  background-color: var(--ui-bg-muted);
  padding: var(--spacing-16) 0;
}

.statistics-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-16);
  max-width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: var(--spacing-8);
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--ui-text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 1.125rem;
  color: var(--ui-text-muted);
  margin-top: var(--spacing-2);
}

@media (max-width: 640px) {
  .statistics-container {
    gap: var(--spacing-12);
  }

  .stat-value {
    font-size: 2.5rem;
  }

  .stat-label {
    font-size: 1rem;
  }
}
</style>
