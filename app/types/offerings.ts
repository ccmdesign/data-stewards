export type OfferingProgram = 'foundations' | 'deep-dives' | 'community' | 'organizational'

export type OfferingStatus = 'upcoming' | 'waitlist' | 'closed' | 'past'

export type OfferingRegistrationState = 'open' | 'waitlist' | 'closed' | 'invite-only'

export interface OfferingRegistration {
  label: string
  url: string
  state: OfferingRegistrationState
  note?: string
}

export interface OfferingEntry {
  documentType?: 'offering'
  title: string
  program: OfferingProgram
  lecturer?: string
  summary: string
  format: string
  location?: string
  dates: string
  cohortSlug?: string
  duration?: string
  partners?: string[]
  filterTag?: string
  status: OfferingStatus
  registration?: OfferingRegistration
  preview?: boolean
  order?: number
  heroImage?: string
}

export interface OfferingsMetaLink {
  label: string
  to: string
  variant?: 'solid' | 'outline' | 'subtle' | 'soft' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success' | 'info'
  target?: '_blank' | '_self'
}

export interface OfferingsMetaFilter {
  key: string
  label: string
  hint?: string
}

export interface OfferingsMeta {
  documentType: 'meta'
  hero: {
    eyebrow?: string
    title: string
    description: string
    ctas?: OfferingsMetaLink[]
  }
  search?: {
    title?: string
    description?: string
    filters?: OfferingsMetaFilter[]
  }
  preview?: {
    title?: string
  }
  cta?: {
    title: string
    description?: string
    primary?: OfferingsMetaLink
    secondary?: OfferingsMetaLink
  }
  testimonials?: {
    tags?: string[]
  }
}

export type OfferingDocument = OfferingsMeta | OfferingEntry

export interface ResolvedPartner {
  slug: string
  title: string
}

export interface ResolvedOffering extends Omit<OfferingEntry, 'partners'> {
  partners: ResolvedPartner[]
}

export type OfferingFilterProgram = OfferingProgram | 'all'
export type OfferingFilterStatus = OfferingStatus | 'all'

export interface OfferingFilters {
  program: OfferingFilterProgram
  status: OfferingFilterStatus
  partner: string | 'all'
}
export type OfferingProgram = 'foundations' | 'deep-dives' | 'community' | 'organizational'
export type OfferingStatus = 'upcoming' | 'waitlist' | 'closed' | 'past'
export type OfferingRegistrationState = 'open' | 'waitlist' | 'closed' | 'invite-only'

export interface OfferingRegistration {
  label: string
  url: string
  state: OfferingRegistrationState
  note?: string
}

export interface Offering {
  _id: string
  title: string
  program: OfferingProgram
  summary?: string
  lecturer?: string
  format?: string
  location?: string
  dates?: string
  cohortSlug?: string
  duration?: string
  partners?: string[]
  status: OfferingStatus
  registration?: OfferingRegistration
  preview?: boolean
  order?: number
  heroImage?: string
  _path?: string
}

export interface PartnerSummary {
  slug: string
  name: string
  path: string
}

export interface OfferingWithRelations extends Offering {
  partnersDetailed: PartnerSummary[]
}

export interface OfferingsMeta {
  title?: string
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
    ctas?: Array<{
      label: string
      to: string
    }>
  }
  search?: {
    heading?: string
    filters?: Array<{
      key: string
      label: string
      component?: string
    }>
  }
  preview?: {
    heading?: string
  }
  cta?: {
    primary?: {
      label: string
      to: string
    }
    secondary?: {
      label: string
      to: string
    }
  }
  testimonials?: {
    tags?: string[]
  }
}

