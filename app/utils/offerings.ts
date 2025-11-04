import type {
  OfferingProgram,
  OfferingStatus,
  OfferingWithRelations
} from '~/app/types/offerings'

export type OfferingFilterInput = {
  program?: OfferingProgram
  status?: OfferingStatus
  partner?: string
}

export const statusPriority: Record<OfferingStatus, number> = {
  upcoming: 0,
  waitlist: 1,
  closed: 2,
  past: 3
}

export const formatSlugLabel = (value: string | null | undefined) => {
  if (!value) {
    return ''
  }

  return value
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export const sortOfferings = (list: OfferingWithRelations[]) =>
  [...list].sort((a, b) => {
    const statusDiff = statusPriority[a.status] - statusPriority[b.status]
    if (statusDiff !== 0) {
      return statusDiff
    }

    const orderA = a.order ?? 100
    const orderB = b.order ?? 100

    if (orderA !== orderB) {
      return orderA - orderB
    }

    return a.title.localeCompare(b.title)
  })

export const filterOfferingsList = (
  list: OfferingWithRelations[],
  filters: OfferingFilterInput
) =>
  list.filter(item => {
    if (filters.program && item.program !== filters.program) {
      return false
    }

    if (filters.status && item.status !== filters.status) {
      return false
    }

    if (filters.partner && !item.partners?.includes(filters.partner)) {
      return false
    }

    return true
  })

export const groupPastByProgram = (list: OfferingWithRelations[]) => {
  const grouped: Record<OfferingProgram, OfferingWithRelations[]> = {
    foundations: [],
    'deep-dives': [],
    community: [],
    organizational: []
  }

  for (const item of list) {
    grouped[item.program]?.push(item)
  }

  for (const key of Object.keys(grouped) as OfferingProgram[]) {
    grouped[key] = sortOfferings(grouped[key]).reverse()
  }

  return grouped
}

