<script setup lang="ts">
useSeoMeta({
  title: 'Events',
  description: 'Discover upcoming tech events, workshops, conferences, and meetups. Join our community and expand your network.'
})

// Fetch all events from Nuxt Content
const { data: events } = await useAsyncData('events', () =>
  queryCollection('events').all()
)

// Sort events by date (upcoming first)
const sortedEvents = computed(() => {
  if (!events.value) return []
  return [...events.value].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
})

// Separate upcoming and past events
const upcomingEvents = computed(() => {
  const now = new Date()
  return sortedEvents.value.filter(event => new Date(event.date) >= now)
})

const pastEvents = computed(() => {
  const now = new Date()
  return sortedEvents.value.filter(event => new Date(event.date) < now)
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

// Format time
const formatTime = (timeString?: string) => {
  if (!timeString) return ''
  return timeString
}

// Get location type icon
const getLocationIcon = (type: string) => {
  switch (type) {
    case 'physical':
      return 'i-lucide-map-pin'
    case 'virtual':
      return 'i-lucide-video'
    case 'hybrid':
      return 'i-lucide-globe'
    default:
      return 'i-lucide-map-pin'
  }
}

// Categories for sidebar
const categories = [
  { name: 'Conference', count: upcomingEvents.value.filter(e => e.category === 'Conference').length },
  { name: 'Workshop', count: upcomingEvents.value.filter(e => e.category === 'Workshop').length },
  { name: 'Meetup', count: upcomingEvents.value.filter(e => e.category === 'Meetup').length },
  { name: 'Webinar', count: upcomingEvents.value.filter(e => e.category === 'Webinar').length }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <UContainer>
      <div class="py-12 lg:py-20">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            Events & Meetups
          </h1>
          <p class="text-lg text-muted-foreground">
            Join us at upcoming tech events, workshops, and conferences. Connect with fellow developers and expand your knowledge.
          </p>
        </div>
      </div>
    </UContainer>

    <!-- Main Content with Sidebar -->
    <UContainer>
      <div class="pb-20">
        <div class="grid lg:grid-cols-12 gap-8">
          <!-- Main Content Area -->
          <div class="lg:col-span-8">
            <!-- Upcoming Events -->
            <div class="space-y-8">
              <div>
                <h2 class="text-2xl font-bold mb-6">
                  Upcoming Events
                </h2>
                <div
                  v-if="upcomingEvents.length > 0"
                  class="space-y-6"
                >
                  <UCard
                    v-for="event in upcomingEvents"
                    :key="event._path"
                    class="hover:shadow-lg transition-shadow"
                  >
                    <div class="space-y-4">
                      <!-- Event Header -->
                      <div class="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <UBadge :label="event.category" variant="subtle" />
                        <div class="flex items-center gap-1">
                          <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                          <span>{{ formatDate(event.date) }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <UIcon :name="getLocationIcon(event.locationType)" class="w-4 h-4" />
                          <span>{{ event.location }}</span>
                        </div>
                        <span v-if="event.startTime">{{ formatTime(event.startTime) }}</span>
                      </div>

                      <!-- Event Title -->
                      <h3 class="text-2xl font-bold hover:text-primary transition-colors">
                        <NuxtLink :to="event._path">
                          {{ event.title }}
                        </NuxtLink>
                      </h3>

                      <!-- Event Description -->
                      <p class="text-muted-foreground">
                        {{ event.description }}
                      </p>

                      <!-- Actions -->
                      <div class="flex gap-3 flex-wrap">
                        <UButton
                          :to="event._path"
                          variant="outline"
                          label="Learn more"
                          trailing-icon="i-lucide-arrow-right"
                        />
                        <UButton
                          v-if="event.registrationLink"
                          :to="event.registrationLink"
                          target="_blank"
                          label="Register"
                          icon="i-lucide-ticket"
                        />
                      </div>
                    </div>
                  </UCard>
                </div>
                <div
                  v-else
                  class="text-center py-12"
                >
                  <UIcon name="i-lucide-calendar-x" class="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p class="text-muted-foreground">
                    No upcoming events at the moment. Check back soon!
                  </p>
                </div>
              </div>

              <!-- Past Events -->
              <div v-if="pastEvents.length > 0">
                <h2 class="text-2xl font-bold mb-6">
                  Past Events
                </h2>
                <div class="space-y-6">
                  <UCard
                    v-for="event in pastEvents"
                    :key="event._path"
                    class="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div class="space-y-4">
                      <!-- Event Header -->
                      <div class="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <UBadge :label="event.category" variant="subtle" color="neutral" />
                        <div class="flex items-center gap-1">
                          <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                          <span>{{ formatDate(event.date) }}</span>
                        </div>
                      </div>

                      <!-- Event Title -->
                      <h3 class="text-xl font-semibold hover:text-primary transition-colors">
                        <NuxtLink :to="event._path">
                          {{ event.title }}
                        </NuxtLink>
                      </h3>

                      <!-- Actions -->
                      <div>
                        <UButton
                          :to="event._path"
                          variant="link"
                          label="View details"
                          trailing-icon="i-lucide-arrow-right"
                          class="p-0"
                        />
                      </div>
                    </div>
                  </UCard>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-4">
            <div class="space-y-6 lg:sticky lg:top-24">
              <!-- Filter by Location Type -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Event Type
                  </h3>
                  <div class="space-y-2">
                    <UButton
                      label="All Events"
                      variant="ghost"
                      block
                      class="justify-start"
                    />
                    <UButton
                      label="In-Person"
                      icon="i-lucide-map-pin"
                      variant="ghost"
                      block
                      class="justify-start"
                    />
                    <UButton
                      label="Virtual"
                      icon="i-lucide-video"
                      variant="ghost"
                      block
                      class="justify-start"
                    />
                    <UButton
                      label="Hybrid"
                      icon="i-lucide-globe"
                      variant="ghost"
                      block
                      class="justify-start"
                    />
                  </div>
                </div>
              </UCard>

              <!-- Categories -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Categories
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="category in categories.filter(c => c.count > 0)"
                      :key="category.name"
                      class="flex items-center justify-between hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{{ category.name }}</span>
                      <UBadge :label="String(category.count)" color="neutral" variant="subtle" />
                    </li>
                  </ul>
                </div>
              </UCard>

              <!-- Subscribe to Updates -->
              <UCard>
                <div class="space-y-4">
                  <h3 class="font-semibold text-lg">
                    Stay Updated
                  </h3>
                  <p class="text-sm text-muted-foreground">
                    Get notified about upcoming events and exclusive opportunities.
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
