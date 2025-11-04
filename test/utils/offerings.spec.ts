import { describe, expect, it } from 'vitest'
import type { OfferingProgram, OfferingWithRelations } from '../../app/types/offerings'
import {
  filterOfferingsList,
  formatSlugLabel,
  groupPastByProgram,
  sortOfferings
} from '../../app/utils/offerings'

let sequence = 0

const makeOffering = (overrides: Partial<OfferingWithRelations> = {}): OfferingWithRelations => ({
  _id: overrides._id ?? `offering-${sequence++}`,
  title: overrides.title ?? 'Test Offering',
  program: overrides.program ?? 'foundations',
  status: overrides.status ?? 'upcoming',
  partners: overrides.partners ?? [],
  partnersDetailed: overrides.partnersDetailed ?? [],
  registration: overrides.registration,
  summary: overrides.summary,
  order: overrides.order,
  heroImage: overrides.heroImage,
  lecturer: overrides.lecturer,
  format: overrides.format,
  location: overrides.location,
  dates: overrides.dates,
  cohortSlug: overrides.cohortSlug,
  duration: overrides.duration,
  preview: overrides.preview,
  _path: overrides._path
})

describe('formatSlugLabel', () => {
  it('converts kebab case to title case', () => {
    expect(formatSlugLabel('deep-dives')).toBe('Deep Dives')
  })
})

describe('sortOfferings', () => {
  it('orders offerings by status priority then order value', () => {
    const offerings = [
      makeOffering({ _id: '2', status: 'waitlist', order: 5, title: 'Waitlist' }),
      makeOffering({ _id: '1', status: 'upcoming', order: 10, title: 'Upcoming' }),
      makeOffering({ _id: '3', status: 'closed', order: 1, title: 'Closed' })
    ]

    const sorted = sortOfferings(offerings).map(item => item._id)

    expect(sorted).toEqual(['1', '2', '3'])
  })
})

describe('filterOfferingsList', () => {
  const partnersDetailed = [{ slug: 'fari', name: 'FARI', path: '/partners/fari' }]

  const offerings = [
    makeOffering({ _id: '1', program: 'foundations', status: 'upcoming', partners: ['fari'], partnersDetailed }),
    makeOffering({ _id: '2', program: 'deep-dives', status: 'waitlist', partners: [], partnersDetailed: [] }),
    makeOffering({ _id: '3', program: 'foundations', status: 'closed', partners: [], partnersDetailed: [] })
  ]

  it('filters by program', () => {
    const result = filterOfferingsList(offerings, { program: 'deep-dives' })
    expect(result).toHaveLength(1)
    expect(result[0]._id).toBe('2')
  })

  it('filters by status', () => {
    const result = filterOfferingsList(offerings, { status: 'closed' })
    expect(result).toHaveLength(1)
    expect(result[0]._id).toBe('3')
  })

  it('filters by partner slug', () => {
    const result = filterOfferingsList(offerings, { partner: 'fari' })
    expect(result).toHaveLength(1)
    expect(result[0]._id).toBe('1')
  })
})

describe('groupPastByProgram', () => {
  it('groups by program and sorts most recent first', () => {
    const basePast = (program: OfferingProgram, order: number, title: string) =>
      makeOffering({ program, status: 'past', order, title })

    const grouped = groupPastByProgram([
      basePast('foundations', 1, 'Older'),
      basePast('foundations', 5, 'Newer'),
      basePast('deep-dives', 3, 'Deep Dive')
    ])

    expect(grouped.foundations.map(item => item.title)).toEqual(['Newer', 'Older'])
    expect(grouped['deep-dives'][0].title).toBe('Deep Dive')
    expect(grouped.community).toHaveLength(0)
  })
})

