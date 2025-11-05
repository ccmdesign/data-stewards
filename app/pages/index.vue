<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

const heroLinks: ButtonProps[] = [
  { label: 'Explore Programs', to: '#programs', color: 'primary', size: 'lg' }
]

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
    <section
      class="relative isolate overflow-hidden border border-primary/20 bg-primary/10 py-12 sm:py-16"
    >
      <HeroBackground />

      <div class="px-6 sm:px-12">
        <UPageHero
          class="relative z-10 mx-auto max-w-4xl space-y-8 text-left"
          :description="'Make data stewardship strategic with world-class training, frameworks, and a global community of practitioners.'"
          :links="heroLinks"
        >
          <template #title>
            <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span class="mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Accessing Data in Systematic, Sustainable and Responsible Ways
              </span>
              Data Stewardship for a New Era
            </h1>
          </template>
        </UPageHero>
      </div>
    </section>

    <UPageSection
      id="programs"
      title="Our Programs"
      description="From foundational bootcamps to deep dives, we offer comprehensive training for every stage of your data stewardship journey."
      class="bg-gray-50 mb-0"
    >
      <UPageColumns class="lg:columns-2">
        <UPageCard
          v-for="(program, index) in programCards"
          :key="index"
          :title="program.title"
          :description="program.description"
        >
          <template #header>
            <div class="relative aspect-video w-full overflow-hidden bg-muted rounded-t-lg">
              <img
                :src="program.image"
                :alt="program.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <UPageSection
      id="foundations"
      title="Data Stewardship Foundations"
      description="Our flagship, hands-on program for leaders building data stewardship maturity. Learn to define purpose, design trust frameworks, and operationalize stewardship."
      class="mb-0 !py-12 sm:!py-16 lg:!py-24"
    >
      <div class="space-y-6">
        <div class="grid gap-4 lg:grid-cols-2">
          <UCard
            v-for="(format, index) in bootcampFormats"
            :key="index"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <span class="font-semibold">{{ format.title }}</span>
                <UBadge variant="subtle">{{ format.badge }}</UBadge>
              </div>
            </template>
            <p class="text-muted">{{ format.description }}</p>
          </UCard>
        </div>

        <UCard>
          <template #header>
            <span class="font-semibold">Learning Outcomes</span>
          </template>
          <ul class="list-disc space-y-2 pl-5">
            <li>Understand the core principles of responsible data stewardship</li>
            <li>Design and govern data initiatives using the 4P framework (Purpose, Principles, Processes, Practices)</li>
            <li>Learn to establish a social license for data re-use</li>
            <li>Develop data-sharing agreements, evaluation KPIs, and trust mechanisms</li>
            <li>Build a capstone plan ready to implement in your organization</li>
          </ul>
          <div class="mt-4 flex justify-center gap-3">
            <UButton label="Reserve Your Seat" color="primary" size="lg" />
            <UButton label="Request In-House Training" variant="outline" size="lg" />
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      id="deep-dives"
      title="Deep Dives"
      description="Focused 1-hour masterclasses for experienced stewards who want to specialize in specific topics."
      class="bg-gray-50 mb-0 !py-12 sm:!py-16 lg:!py-24"
    >
      <UPageColumns class="lg:columns-3">
        <UPageCard
          v-for="(topic, index) in deepDiveTopics"
          :key="index"
          :title="topic.title"
          :ui="{ header: 'p-0' }"
        >
          <template #header>
            <div class="relative aspect-video w-full overflow-hidden bg-muted rounded-t-lg">
              <img
                :src="topic.image"
                :alt="topic.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </template>
        </UPageCard>
      </UPageColumns>
      <div class="mt-6 flex justify-center gap-3">
        <UButton
          label="Reserve Your Seat"
          color="primary"
          size="lg"
          to="/deep-dives/learn-more"
        />
        <UButton
          label="Request In-House Training"
          variant="outline"
          size="lg"
          to="mailto:datastewards@thegovlab.org"
          target="_blank"
        />
      </div>
    </UPageSection>

    <UPageSection
      id="exchange"
      title="Exchange"
      description="A vibrant network for practitioners, alumni, and partners to stay engaged and share knowledge."
      class="mb-0 !py-12 sm:!py-16 lg:!py-24"
    >
      <UPageColumns class="lg:columns-2">
        <UPageCard
          v-for="(item, index) in exchangeItems"
          :key="index"
          :title="item.title"
          :description="item.description"
        />
      </UPageColumns>
      <div class="mt-6 flex justify-center gap-3">
        <UButton label="Subscribe to Updates" color="primary" size="lg" />
        <UButton label="Download Latest Brief" variant="outline" size="lg" />
      </div>
    </UPageSection>

    <UPageSection
      id="organizations"
      title="For Organizations"
      description="Tailored offerings to institutionalize data stewardship across your organization."
      class="bg-gray-50 mb-0 !py-12 sm:!py-16 lg:!py-24"
    >
      <UPageColumns class="lg:columns-3">
        <UPageCard
          v-for="(offer, index) in organizationOffers"
          :key="index"
          :title="offer.title"
          :description="offer.description"
        />
      </UPageColumns>
      <div class="mt-6 flex justify-center">
        <UButton label="Schedule a Consultation" size="lg" color="primary" />
      </div>
    </UPageSection>

    <UPageSection
      id="testimonials"
      title="What Our Alumni Say"
      description="Join hundreds of data stewards who have transformed their organizations."
      class="mb-0 !py-12 sm:!py-16 lg:!py-24"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          class="h-full"
        >
          <template #footer>
            <div class="text-sm font-medium">{{ testimonial.author }}</div>
          </template>
        </UPageCard>
      </div>
    </UPageSection>

  </div>
</template>
