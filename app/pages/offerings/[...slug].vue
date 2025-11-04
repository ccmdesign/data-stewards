<script setup lang="ts">
import { computed } from 'vue'
import type { NormalizedOffering, OfferingDocument, OfferingEntry, OfferingsMeta } from '~/types/offerings'

const addSlugPathStem = (entry: OfferingEntry): NormalizedOffering => {
  const contentPathCandidate = (entry as { _path?: string })._path
  const contentIdCandidate = (entry as { _id?: string })._id
  const contentPath = typeof contentPathCandidate === 'string' ? contentPathCandidate : undefined
  const contentId = typeof contentIdCandidate === 'string' ? contentIdCandidate : undefined
  
  const fallbackIdSegment = (contentId ?? '').replace(/^offerings[/:]/, '').replace(/\.md$/, '')
  const fallbackPath = `/offerings/${fallbackIdSegment}`
  const rawPath = contentPath ?? fallbackPath
  const trimmedPath = rawPath.endsWith('/') && rawPath !== '/' ? rawPath.slice(0, -1) : rawPath
  const ensuredPath = trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`
  const slug = ensuredPath.replace(/^\/offerings\//, '') || fallbackIdSegment
  const id = contentId ? contentId.replace(/^offerings:/, '').replace(/\.md$/, '') : fallbackIdSegment

  return {
    ...entry,
    slug,
    path: ensuredPath,
    stem: ensuredPath,
    id
  }
}

const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam.join('/') : slugParam

const { data: offeringsData } = await useAsyncData<OfferingDocument[]>('offerings-collection-detail', () =>
  queryCollection('offerings').all()
)

const entries = computed(() => offeringsData.value ?? [])

const offerings = computed(() => entries.value.filter((entry): entry is OfferingEntry => (entry.documentType ?? 'offering') !== 'meta'))

const normalized = computed<NormalizedOffering[]>(() =>
  offerings.value.map(addSlugPathStem).sort((a, b) => {
    const orderA = a.order ?? Number.POSITIVE_INFINITY
    const orderB = b.order ?? Number.POSITIVE_INFINITY
    if (orderA !== orderB) return orderA - orderB
    return a.title.localeCompare(b.title)
  })
)

const offering = computed<NormalizedOffering>(() => {
  // Normalize the slug from route to match different formats
  const slugValue = slug || ''
  const normalizedSlug = slugValue.startsWith('/') ? slugValue.slice(1) : slugValue
  const slugOnly = normalizedSlug.replace(/^offerings\//, '')
  
  const current = normalized.value.find(item => {
    // Try matching by id (without "offerings:" prefix)
    const itemId = item.id?.replace(/^offerings:/, '').replace(/\.md$/, '')
    if (itemId === slugOnly || itemId === normalizedSlug) return true
    
    // Try matching by slug
    if (item.slug === slugOnly || item.slug === normalizedSlug) return true
    
    // Try matching by path
    const itemPath = item.path?.replace(/^\/offerings\//, '')
    if (itemPath === slugOnly || itemPath === normalizedSlug) return true
    
    // Try matching by _path directly
    const itemPathRaw = (item as { _path?: string })._path
    if (itemPathRaw) {
      const pathNormalized = itemPathRaw.replace(/^\/offerings\//, '').replace(/\/$/, '')
      if (pathNormalized === slugOnly || pathNormalized === normalizedSlug) return true
    }
    
    // Try matching by _id directly
    const itemIdRaw = (item as { _id?: string })._id
    if (itemIdRaw) {
      const idNormalized = itemIdRaw.replace(/^offerings:/, '').replace(/\.md$/, '')
      if (idNormalized === slugOnly || idNormalized === normalizedSlug) return true
    }
    
    return false
  })
  
  if (!current) {
    throw createError({ statusCode: 404, message: 'Offering not found' })
  }
  return current
})

useSeoMeta({
  title: `${offering.value.title} | Data Stewardship Academy`
})
</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <pre>{{ JSON.stringify(offering, null, 2) }}</pre>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

