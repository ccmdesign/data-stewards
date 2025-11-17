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
  badge: 'Accessing Data in Systematic, Sustainable and Responsible Ways',
  description: 'Make data stewardship strategic with world-class training, frameworks, and a global community of practitioners.',
  stats: [
    { value: '+8,000', label: 'learners' },
    { value: '50+', label: 'faculty' }
  ],
  links: heroLinks
})

const programCards = [
  { title: 'Foundations', description: 'Bootcamps for building stewardship maturity', icon: 'i-lucide-graduation-cap' },
  { title: 'Exchange', description: 'Network with global practitioners', icon: 'i-lucide-lightbulb' },
  { title: 'Deep Dives', description: 'Advanced masterclasses for specialists', icon: 'i-lucide-users-round' },
  { title: 'For Your Organization', description: 'Tailored enterprise solutions', icon: 'i-lucide-building-2' }
]

const bootcampFormats = [
  { title: 'In-Person Intensive', badge: '5 Days', description: 'Immersive experience with faculty and peers; includes field visits and a capstone sprint.' },
  { title: 'Hybrid Bootcamp', badge: '3 weeks online + 2-day capstone', description: 'Flexible for distributed teams; combines live instruction and collaborative labs.' },
  { title: 'Online Bootcamp', badge: '6 weeks (1×3h/week)', description: 'Global cohort-based, fully remote with recordings and office hours.' },
  { title: 'LinkedIn Learning', badge: '1h video course', description: 'Orientation and pre-work; ideal for team onboarding.' }
]

const deepDiveTopics = [
  { title: 'Social License & Digital Self-Determination', icon: 'i-lucide-shield' },
  { title: 'Designing Data Spaces & Interoperability', icon: 'i-lucide-file-text' },
  { title: 'Evaluation, KPIs & Value Realization', icon: 'i-lucide-database' },
  { title: 'Legal & Ethical Readiness', icon: 'i-lucide-book-open' },
  { title: 'Data Contracts & Governance Agreements', icon: 'i-lucide-target' },
  { title: 'Synthetic Data & Privacy-Enhancing Technologies', icon: 'i-lucide-dna' }
]

const exchangeItems = [
  { title: 'Community Slack', description: 'Join our active Slack channel to share lessons, tools, and trends with fellow data stewards worldwide.', icon: 'i-lucide-slack' },
  { title: 'Datathons', description: 'Collaborative sprints where teams tackle data governance challenges using real datasets.', icon: 'i-lucide-target' },
  { title: 'Events & Salons', description: 'Keynotes, fireside chats, and panels with global thought leaders in data governance and stewardship.', icon: 'i-lucide-users-round' },
  { title: 'Trends to Watch', description: 'Quarterly briefings on AI governance, data sovereignty, new legal standards, and cross-sector collaborations.', icon: 'i-lucide-trending-up' }
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
    name: 'Sarah Chen',
    affiliation: 'Chief Data Officer, Global Health Initiative',
    avatar: '/images/avatar-testimonial.png'
  },
  {
    quote: 'An intensive, eye-opening experience. The deep dives into legal and ethical readiness were exactly what our organization needed.',
    name: 'Marcus Williams',
    affiliation: 'Director of Data Strategy, Federal Agency',
    avatar: '/images/avatar-testimonial.png'
  },
  {
    quote: 'The hybrid format worked perfectly for our distributed team. We built real capability while maintaining our operational commitments.',
    name: 'Aisha Patel',
    affiliation: 'VP of Analytics, Financial Services',
    avatar: '/images/avatar-testimonial.png'
  }
]

const recentPosts = [
  {
    title: 'Emerging Funding and Business Models for Data Commons: A Comparison',
    description: 'As data becomes an essential input for innovation and AI training, questions of how to sustain its equitable and responsible reuse have gained urgency. Beyond technical infrastructure and governance frameworks, the long-term viability of data commons depends on the institutional and financial models that underpin them.',
    date: 'Oct 29',
    author: 'Hannah Chafetz',
    image: '/images/publication-1.png',
    to: '/news/emerging-funding-models'
  },
  {
    title: 'Building the Future of Public-Interest AI: Certi Amazônia Institute and NYU Peace Research Announced as Winners of the New Commons Challenge',
    description: 'Artificial Intelligence is only as good as the data it draws upon. For public-interest uses — from emergency response to localized decision making — high-quality, representative, and responsibly governed datasets are essential. Yet too often, the data needed for humanitarian interventions or local problem-solving is fragmented, inaccessible, or not aligned with community needs and expectations.',
    date: 'Sep 26',
    author: 'The GovLab',
    image: '/images/publication-2a.png',
    to: '/news/public-interest-ai'
  },
  {
    title: 'Reimagining Data Access, Readiness, and Governance in the Age of AI',
    description: 'The State of Open Data Policy Summit is an annual conference hosted by the Open Data Policy Lab (a collaboration between The GovLab and Microsoft) to explore how policy and technology shape access to data for public interest re-use.',
    date: 'Sep 25',
    author: 'Hannah Chafetz',
    image: '/images/publication-3a.png',
    to: '/news/data-access-governance'
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

    <RecentPublicationsSection :posts="recentPosts" />

    <FinalCTASection
      title="Ready to Transform Your Data Stewardship?"
      description="Join our next cohort and become part of a global community of responsible data leaders."
      :primary-action="{ label: 'Talk to Us', to: '/contact', size: 'lg', color: 'primary' }"
      :secondary-action="{ label: 'Explore Programs', to: '/offerings', size: 'lg', variant: 'outline' }"
    />
  </div>
</template>
