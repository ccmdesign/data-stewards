<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { usePageHero } from '~/composables/usePageHero'

useSeoMeta({
  title: 'Community',
  description: 'Stay plugged into the Data Stewardship Academy community through events, resources, and collaboration opportunities.'
})

const heroLinks: ButtonProps[] = [
  { label: 'Join the Slack', to: '#join-our-community', color: 'primary', size: 'lg' },
  { label: 'Host With Us', to: '#become-partner', variant: 'outline', size: 'lg' }
]

const { setPageHero } = usePageHero()

setPageHero({
  showHero: true,
  badge: 'Our Community',
  title: 'Stay connected, informed, and ready to collaborate',
  subtitle: 'Our Community',
  description: 'A network for practitioners, alumni, and partners to stay engaged.',
  links: heroLinks
})

type CardCta = Pick<ButtonProps, 'label' | 'to' | 'color' | 'variant' | 'size'>

interface HighlightCard {
  title: string
  description: string
}

interface StayUpdatedCard {
  title: string
  description: string
  primaryCta?: CardCta
  secondaryCta?: CardCta
}

interface CollaborationCard {
  title: string
  body: string
}

const highlightCards: HighlightCard[] = [
  {
    title: 'Data Stewardship Slack Channel',
    description: 'Slack channel to share lessons, tools, and trends.'
  },
  {
    title: 'Events & Salons',
    description: 'Keynotes, fireside chats, and panels with global thought leaders.'
  },
  {
    title: 'Datathons',
    description: 'Collaborative sprints where teams tackle data governance challenges using real datasets.'
  }
]

const stayUpdatedCards: StayUpdatedCard[] = [
  {
    title: 'Trends to Watch',
    description:
      'Quarterly briefings on emerging topics—AI governance, data sovereignty, new legal standards, and cross-sector collaborations.',
    primaryCta: { label: 'Subscribe', color: 'primary', size: 'lg' },
    secondaryCta: { label: 'Download Latest Brief', variant: 'outline', size: 'lg' }
  },
  {
    title: 'Blog / Resources',
    description: 'Short articles, case studies, and interviews with data stewards in practice.',
    primaryCta: { label: 'Visit News Hub', to: '/news', color: 'primary', size: 'lg' }
  }
]

const collaborationCards: CollaborationCard[] = [
  {
    title: 'Become a Guest Lecturer',
    body:
      'Are you working on responsible data governance, data-sharing infrastructures, or computational social science? Join our pool of guest faculty and share your expertise with global cohorts.'
  },
  {
    title: 'Become a Course Funder',
    body:
      'Champion responsible data stewardship in your country by supporting our programs and helping teams build durable governance capacity.'
  },
  {
    title: 'Volunteer Field Visits',
    body:
      'Host our participants at your institution to showcase real-world stewardship in action and spark new collaborations.'
  },
  {
    title: 'Join Our Slack Community',
    body:
      'Engage with experts worldwide, access job opportunities, and stay current with stewardship insights in our curated Slack space.'
  }
]

const supportBenefits = [
  'Upskill individuals and organizations in relevant data stewardship and AI fields.',
  'Expand your community of experts by tapping into 160+ global data stewards.',
  'Contribute to a responsible data economy via scaling data re-use strategies.',
  'Expose and train your employees in responsible data stewardship topics.',
  'Create new partnerships for potential data collaborations.'
]
</script>

<template>
  <div class="relative">
    <BaseSection
      id="community-highlights"
      color="muted"
      size="l"
      no-margin
    >
      <header class="mb-8 space-y-6 text-left">
        <h2 class="text-5xl font-semibold">Deep Dives</h2>
        <p class="text-base text-muted-foreground">
          Focused 1-hour masterclasses for experienced stewards who want to specialize in specific topics.
        </p>
      </header>
      <div class="flex gap-8">
        <ExchangeCard
          v-for="(card, index) in highlightCards"
          :key="index"
          :title="card.title"
          :description="card.description"
          class="flex-1"
        />
      </div>
    </BaseSection>

    <StayUpdatedSection :cards="stayUpdatedCards" />

    <CommunitySection :cards="collaborationCards" />

    <SupportSection :benefits="supportBenefits" />
  </div>
</template>

