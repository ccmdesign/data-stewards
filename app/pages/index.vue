<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'

const heroLinks: ButtonProps[] = [
  { label: 'Explore Programs', to: '#programs', color: 'primary', size: 'lg' }
]

const { setPageHero } = usePageHero()

setPageHero({
  showHero: true,
  title: 'Data Stewardship for a New Era',
  subtitle: 'Accessing Data in Systematic, Sustainable and Responsible Ways',
  description: 'Make data stewardship strategic with world-class training, frameworks, and a global community of practitioners.',
  links: heroLinks
})

const programCards = [
  { title: 'Foundations', description: 'Bootcamps for building stewardship maturity', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Foundations' },
  { title: 'Deep Dives', description: 'Advanced masterclasses for specialists', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Deep+Dives' },
  { title: 'Exchange', description: 'Network with global practitioners', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Exchange' },
  { title: 'For Your Organization', description: 'Tailored enterprise solutions', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=For+Your+Organization' }
]

const bootcampFormats = [
  { title: 'In-Person Intensive', badge: '5 Days', description: 'Immersive experience with faculty and peers; includes field visits and a capstone sprint.' },
  { title: 'Hybrid Bootcamp', badge: '3 weeks online + 2-day capstone', description: 'Flexible for distributed teams; combines live instruction and collaborative labs.' },
  { title: 'Online Bootcamp', badge: '6 weeks (1×3h/week)', description: 'Global cohort-based, fully remote with recordings and office hours.' },
  { title: 'LinkedIn Learning', badge: '1h video course', description: 'Orientation and pre-work; ideal for team onboarding.' }
]

const deepDiveTopics = [
  { title: 'Social License & Digital Self-Determination', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Social+License' },
  { title: 'Legal & Ethical Readiness', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Legal+%26+Ethical' },
  { title: 'Designing Data Spaces & Interoperability', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Data+Spaces' },
  { title: 'Data Contracts & Governance Agreements', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Data+Contracts' },
  { title: 'Evaluation, KPIs & Value Realization', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Evaluation+%26+KPIs' },
  { title: 'Synthetic Data & Privacy-Enhancing Technologies', image: 'https://placehold.co/600x400/f3f4f6/6b7280?text=Synthetic+Data' }
]

const exchangeItems = [
  { title: 'Community Slack', description: 'Join our active Slack channel to share lessons, tools, and trends with fellow data stewards worldwide.' },
  { title: 'Events & Salons', description: 'Keynotes, fireside chats, and panels with global thought leaders in data governance and stewardship.' },
  { title: 'Datathons', description: 'Collaborative sprints where teams tackle data governance challenges using real datasets.' },
  { title: 'Trends to Watch', description: 'Quarterly briefings on AI governance, data sovereignty, new legal standards, and cross-sector collaborations.' }
]

const organizationOffers = [
  { title: 'Private Bootcamps', description: 'Cohort training customized for your specific agency or company needs.' },
  { title: 'Executive Briefings', description: '90-minute strategy sessions designed for leadership teams.' },
  { title: 'Capability Roadmaps', description: '6–12 week consulting engagements to establish stewardship functions.' }
]

const learningOutcomes = [
  'Understand the core principles of responsible data stewardship',
  'Design and govern data initiatives using the 4P framework (Purpose, Principles, Processes, Practices)',
  'Learn to establish a social license for data re-use',
  'Develop data-sharing agreements, evaluation KPIs, and trust mechanisms',
  'Build a capstone plan ready to implement in your organization'
]

const testimonials = [
  {
    quote: 'The Data Stewardship Academy transformed how we approach data governance. The bootcamp gave us practical frameworks we could implement immediately.',
    author: 'Sarah Chen — Chief Data Officer, Global Health Initiative'
  },
  {
    quote: 'An intensive, eye-opening experience. The deep dives into legal and ethical readiness were exactly what our organization needed.',
    author: 'Marcus Williams — Director of Data Strategy, Federal Agency'
  },
  {
    quote: 'The hybrid format worked perfectly for our distributed team. We built real capability while maintaining our operational commitments.',
    author: 'Aisha Patel — VP of Analytics, Financial Services'
  }
]

useSeoMeta({
  title: 'Data Stewardship Academy',
  description: 'Make data stewardship strategic with world-class training, frameworks, and a global community of practitioners.'
})
</script>

<template>
  <div class="relative">
    <ProgramsSection :cards="programCards" :columns="2" />

    <FoundationsSection
      :formats="bootcampFormats"
      :outcomes="learningOutcomes"
      :primary-action="{ label: 'Reserve Your Seat', color: 'primary', size: 'lg' }"
      :secondary-action="{ label: 'Request In-House Training', variant: 'outline', size: 'lg' }"
    />

    <DeepdiveSection
      :topics="deepDiveTopics"
      :primary-action="{ label: 'Reserve Your Seat', color: 'primary', size: 'lg', to: '/deep-dives/learn-more' }"
      :secondary-action="{ label: 'Request In-House Training', variant: 'outline', size: 'lg', to: 'mailto:datastewards@thegovlab.org', target: '_blank' }"
    />

    <ExchangeSection
      :items="exchangeItems"
      :primary-action="{ label: 'Subscribe to Updates', color: 'primary', size: 'lg' }"
      :secondary-action="{ label: 'Download Latest Brief', variant: 'outline', size: 'lg' }"
    />

    <OrganizationSection
      :offers="organizationOffers"
      :primary-action="{ label: 'Schedule a Consultation', size: 'lg', color: 'primary' }"
    />

    <AlumniSection :testimonials="testimonials" />
  </div>
</template>
