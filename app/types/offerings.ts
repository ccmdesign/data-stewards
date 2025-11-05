import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export type OfferingProgram = 'foundations' | 'deep-dives' | 'community' | 'organizational'
export type OfferingStatus = 'upcoming' | 'waitlist' | 'closed' | 'past'
export type OfferingRegistrationState = 'open' | 'waitlist' | 'closed' | 'invite-only'
export type OfferingLevel = 'introductory' | 'intermediate' | 'advanced' | 'executive'
export type OfferingDeliveryMode = 'in-person' | 'virtual' | 'hybrid' | 'asynchronous'
export type ScheduleCadence = 'single' | 'rolling' | 'quarterly' | 'custom'

export interface OfferingRegistration {
  label: string
  url: string
  state: OfferingRegistrationState
  note?: string
}

export interface OfferingSchedule {
  start?: string
  end?: string
  nextStart?: string
  cadence?: ScheduleCadence
  duration?: string
}

export interface OfferingLocation {
  city?: string
  country?: string
  venue?: string
}

export interface OfferingMeta {
  documentType?: 'offering'
  slug?: string
  summary: string
  program: OfferingProgram
  level?: OfferingLevel
  format: string
  deliveryMode?: OfferingDeliveryMode
  status: OfferingStatus
  featured?: boolean
  order?: number
  schedule?: OfferingSchedule
  location?: OfferingLocation
  registration?: OfferingRegistration
  partners?: string[]
  lecturer?: string
  cohortSlug?: string
  heroImage?: string
  filterTag?: string
  preview?: boolean
}

export interface OfferingEntry extends ParsedContent {
  path?: string
  title: string
  description?: string
  meta?: OfferingMeta
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
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
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

export interface OfferingsMetaEntry extends ParsedContent {
  meta?: OfferingsMeta
}

export type OfferingDocument = OfferingsMetaEntry | OfferingEntry

export interface PartnerSummary {
  slug: string
  name: string
  path: string
}

export interface NormalizedOffering extends OfferingEntry {
  slug: string
  path: string
  stem: string
  id: string
}
