<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Fetch the event
const { data: event } = await useAsyncData(`event-${slug.value}`, () =>
  queryCollection('events').path(`/events/${slug.value}`).first()
)

// Handle 404
if (!event.value) {
  throw createError({
    statusCode: 404,
    message: 'Event not found'
  })
}

// Set SEO meta
useSeoMeta({
  title: event.value.title,
  description: event.value.description,
  ogTitle: event.value.title,
  ogDescription: event.value.description
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Format full date with day
const formatFullDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Check if event is upcoming
const isUpcoming = computed(() => {
  return new Date(event.value.date) >= new Date()
})

// Get location type details
const getLocationDetails = (type: string) => {
  switch (type) {
    case 'physical':
      return {
        icon: 'i-lucide-map-pin',
        label: 'In-Person Event'
      }
    case 'virtual':
      return {
        icon: 'i-lucide-video',
        label: 'Virtual Event'
      }
    case 'hybrid':
      return {
        icon: 'i-lucide-globe',
        label: 'Hybrid Event'
      }
    default:
      return {
        icon: 'i-lucide-map-pin',
        label: 'Event'
      }
  }
}

const locationDetails = computed(() => getLocationDetails(event.value.locationType))

// Fetch other events for sidebar
const { data: otherEvents } = await useAsyncData('other-events', () =>
  queryCollection('events').all()
)

const upcomingEvents = computed(() => {
  if (!otherEvents.value) return []
  const now = new Date()
  return otherEvents.value
    .filter(e => e._path !== event.value._path && new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)
})
</script>

<template>
  <div v-if="event">
    <UContainer>
      <!-- Back to Events Link -->
      <div class="py-8">
        <UButton
          to="/events"
          variant="link"
          icon="i-lucide-arrow-left"
          label="Back to Events"
          class="p-0"
        />
      </div>

      <div class="pb-20">
        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Main Content Area -->
          <article class="lg:col-span-8">
            <!-- Event Header -->
            <div class="mb-8 space-y-6">
              <!-- Category Badge -->
              <div class="flex items-center gap-3">
                <UBadge
                  :label="event.category"
                  variant="subtle"
                  size="lg"
                />
                <UBadge
                  v-if="isUpcoming"
                  label="Upcoming"
                  color="success"
                  variant="subtle"
                />
                <UBadge
                  v-else
                  label="Past Event"
                  color="neutral"
                  variant="subtle"
                />
              </div>

              <!-- Event Title -->
              <h1 class="text-4xl lg:text-5xl font-bold">
                {{ event.title }}
              </h1>

              <!-- Event Meta Info -->
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="flex items-start gap-3">
                  <div class="p-2 rounded-lg bg-primary/10">
                    <UIcon name="i-lucide-calendar" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">
                      Date
                    </p>
                    <p class="font-semibold">
                      {{ formatFullDate(event.date) }}
                    </p>
                    <p v-if="event.startTime" class="text-sm text-muted-foreground">
                      {{ event.startTime }}{{ event.endTime ? ` - ${event.endTime}` : '' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 rounded-lg bg-primary/10">
                    <UIcon :name="locationDetails.icon" class="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">
                      {{ locationDetails.label }}
                    </p>
                    <p class="font-semibold">
                      {{ event.location }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <p class="text-xl text-muted-foreground">
                {{ event.description }}
              </p>

              <!-- Registration CTA -->
              <div
                v-if="isUpcoming && event.registrationLink"
                class="p-6 rounded-lg bg-primary/5 border border-primary/20"
              >
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h3 class="font-semibold text-lg mb-1">
                      Ready to join us?
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Register now to secure your spot at this event
                    </p>
                  </div>
                  <UButton
                    :to="event.registrationLink"
                    target="_blank"
                    label="Register Now"
                    icon="i-lucide-ticket"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            <!-- Event Content -->
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <ContentRenderer :value="event" />
            </div>

            <!-- Share Section -->
            <div class="mt-12 pt-8 border-t border-default">
              <div class="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p class="text-sm text-muted-foreground mb-2">
                    Share this event
                  </p>
                  <div class="flex gap-2">
                    <UButton
                      icon="i-lucide-share-2"
                      variant="outline"
                      aria-label="Share"
                    />
                    <UButton
                      icon="i-lucide-twitter"
                      variant="outline"
                      aria-label="Share on Twitter"
                    />
                    <UButton
                      icon="i-lucide-linkedin"
                      variant="outline"
                      aria-label="Share on LinkedIn"
                    />
                  </div>
                </div>
                <div v-if="isUpcoming && event.registrationLink">
                  <UButton
                    :to="event.registrationLink"
                    target="_blank"
                    label="Register"
                    icon="i-lucide-ticket"
                  />
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <div class="lg:col-span-4">
            <div class="space-y-6 lg:sticky lg:top-24">
              <!-- Event Details Card -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Event Details
                  </h3>

                  <div class="space-y-3 text-sm">
                    <div class="flex items-start gap-2">
                      <UIcon name="i-lucide-calendar" class="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p class="text-muted-foreground">
                          Date
                        </p>
                        <p class="font-medium">
                          {{ formatDate(event.date) }}
                        </p>
                      </div>
                    </div>

                    <div v-if="event.startTime" class="flex items-start gap-2">
                      <UIcon name="i-lucide-clock" class="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p class="text-muted-foreground">
                          Time
                        </p>
                        <p class="font-medium">
                          {{ event.startTime }}{{ event.endTime ? ` - ${event.endTime}` : '' }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <UIcon :name="locationDetails.icon" class="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p class="text-muted-foreground">
                          Location
                        </p>
                        <p class="font-medium">
                          {{ event.location }}
                        </p>
                        <p class="text-xs text-muted-foreground mt-0.5">
                          {{ locationDetails.label }}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <UIcon name="i-lucide-tag" class="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p class="text-muted-foreground">
                          Category
                        </p>
                        <p class="font-medium">
                          {{ event.category }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div v-if="isUpcoming && event.registrationLink" class="pt-4 border-t border-default">
                    <UButton
                      :to="event.registrationLink"
                      target="_blank"
                      label="Register for Event"
                      icon="i-lucide-ticket"
                      block
                    />
                  </div>
                </div>
              </UCard>

              <!-- Upcoming Events -->
              <UCard v-if="upcomingEvents.length > 0">
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Other Upcoming Events
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="upcomingEvent in upcomingEvents"
                      :key="upcomingEvent._path"
                      class="space-y-1"
                    >
                      <NuxtLink
                        :to="upcomingEvent._path"
                        class="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {{ upcomingEvent.title }}
                      </NuxtLink>
                      <div class="flex items-center gap-2 text-xs text-muted-foreground">
                        <UIcon name="i-lucide-calendar" class="w-3 h-3" />
                        <span>{{ formatDate(upcomingEvent.date) }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </UCard>

              <!-- Newsletter -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Stay Informed
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    Subscribe to get notified about upcoming events and exclusive opportunities.
                  </p>
                  <div class="space-y-2">
                    <UInput placeholder="Your email" type="email" />
                    <UButton label="Subscribe" block />
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.prose {
  @apply text-foreground;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4),
.prose :deep(h5),
.prose :deep(h6) {
  @apply font-bold text-foreground;
}

.prose :deep(h2) {
  @apply text-3xl mt-12 mb-4;
}

.prose :deep(h3) {
  @apply text-2xl mt-8 mb-3;
}

.prose :deep(p) {
  @apply mb-4 leading-relaxed;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply my-6 space-y-2;
}

.prose :deep(li) {
  @apply leading-relaxed;
}

.prose :deep(strong) {
  @apply font-semibold text-foreground;
}

.prose :deep(a) {
  @apply text-primary hover:underline;
}

.prose :deep(code) {
  @apply bg-accented px-1.5 py-0.5 rounded text-sm font-mono;
}

.prose :deep(pre) {
  @apply bg-accented p-4 rounded-lg overflow-x-auto my-6;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-primary pl-4 italic my-6;
}
</style>
