import { describe, expect, it } from 'vitest'
import type { NormalizedOffering, OfferingEntry } from '../../app/types/offerings'
import {
  groupArchiveByYear,
  normalizeOfferings,
  pickRelatedOfferings,
  startCase
} from '../../app/utils/offerings'

let sequence = 0

const makeEntry = (overrides: Partial<OfferingEntry> = {}): OfferingEntry => ({
  _id: overrides._id ?? `offering-${sequence++}`,
  _path: overrides._path ?? `/offerings/${overrides.program ?? 'foundations'}/${overrides._id ?? sequence}`,
  documentType: 'offering',
  title: overrides.title ?? 'Test Offering',
  program: overrides.program ?? 'foundations',
  summary: overrides.summary ?? 'Summary copy',
  format: overrides.format ?? 'In-Person Intensive',
  deliveryMode: overrides.deliveryMode ?? 'in-person',
  level: overrides.level ?? 'introductory',
  dates: overrides.dates ?? 'January 1-5, 2026',
  status: overrides.status ?? 'upcoming',
  nextStart: overrides.nextStart,
  duration: overrides.duration,
  partners: overrides.partners,
  filterTag: overrides.filterTag,
  registration: overrides.registration,
  order: overrides.order,
  heroImage: overrides.heroImage,
  cohortSlug: overrides.cohortSlug,
  closedAt: overrides.closedAt,
  featured: overrides.featured
})

describe('startCase', () => {
  it('formats slugs into title case', () => {
    expect(startCase('deep-dives')).toBe('Deep Dives')
    expect(startCase('always_on')).toBe('Always On')
  })
})

describe('normalizeOfferings', () => {
  it('enriches base entries with derived fields', () => {
    const entries = [
      makeEntry({
        _id: 'alpha',
        format: 'Hybrid Bootcamp',
        deliveryMode: 'hybrid',
        partners: ['the-govlab'],
        filterTag: 'Foundations',
        nextStart: '2025-04-01'
      })
    ]

    const normalized = normalizeOfferings(entries)

    expect(normalized[0].formatCategory).toBe('cohort')
    expect(normalized[0].partnerLabels).toContain('The Govlab')
    expect(normalized[0].focusLabel).toBe('Foundations')
    expect(normalized[0].sortTimestamp).toBeGreaterThan(0)
  })
})

describe('groupArchiveByYear', () => {
  it('groups offerings by archive year and orders newest first', () => {
    const normalized = normalizeOfferings([
      makeEntry({ _id: 'past-a', status: 'past', closedAt: '2024-12-01', dates: 'Dec 2024' }),
      makeEntry({ _id: 'past-b', status: 'past', closedAt: '2023-05-01', dates: 'May 2023' }),
      makeEntry({ _id: 'past-c', status: 'past', closedAt: '2024-06-15', dates: 'Jun 2024' })
    ])

    const grouped = groupArchiveByYear(normalized)

    expect(grouped[0].year).toBe('2024')
    expect(grouped[0].items.map(item => item._id)).toEqual(['past-a', 'past-c'])
    expect(grouped[1].year).toBe('2023')
  })
})

describe('pickRelatedOfferings', () => {
  it('selects offerings sharing program or focus', () => {
    const normalized = normalizeOfferings([
      makeEntry({ _id: 'current', program: 'foundations', filterTag: 'Foundations' }),
      makeEntry({ _id: 'match-program', program: 'foundations', filterTag: 'Community' }),
      makeEntry({ _id: 'match-focus', program: 'community', filterTag: 'Foundations' }),
      makeEntry({ _id: 'other', program: 'deep-dives', filterTag: 'Deep Dives' })
    ])

    const current = normalized.find(item => item._id === 'current') as NormalizedOffering
    const related = pickRelatedOfferings(current, normalized, 3)

    expect(related.map(item => item._id)).toEqual(['match-program', 'match-focus'])
  })
})

