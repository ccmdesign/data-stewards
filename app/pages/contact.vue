<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { usePageHero } from '~/composables/usePageHero'

useSeoMeta({
  title: 'Contact',
  description: 'Reach out to the Data Stewardship Academy team for program details, partnerships, and tailored support.'
})

const { setPageHero } = usePageHero()

const heroLinks: ButtonProps[] = [
  {
    label: 'Call us',
    to: 'tel:+14155552671',
    icon: 'i-lucide-phone',
    color: 'primary'
  },
  {
    label: 'Message us',
    to: '#contact-form',
    variant: 'outline',
    icon: 'i-lucide-message-circle'
  }
]

setPageHero({
  showHero: true,
  title: 'Contact the Data Stewardship Academy',
  subtitle: 'Get in Touch',
  description: 'Let\'s build responsible data practices together. Call our team or share a note and we\'ll respond within two business days.',
  links: heroLinks
})

const toast = useToast()

const state = reactive({
  name: '',
  email: '',
  organization: '',
  message: ''
})

const isSubmitting = ref(false)

const validate = (formState: typeof state): FormError[] => {
  const errors: FormError[] = []

  if (!formState.name.trim()) {
    errors.push({
      name: 'name',
      message: 'Please enter your name'
    })
  }

  if (!formState.email.trim()) {
    errors.push({
      name: 'email',
      message: 'Please enter your email'
    })
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formState.email)) {
      errors.push({
        name: 'email',
        message: 'Enter a valid email address'
      })
    }
  }

  if (!formState.message.trim()) {
    errors.push({
      name: 'message',
      message: 'Let us know how we can help'
    })
  }

  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 600))

    toast.add({
      title: 'Message sent',
      description: 'Thanks for reaching out. Our team will get back to you shortly.',
      color: 'primary'
    })

    Object.assign(state, {
      name: '',
      email: '',
      organization: '',
      message: ''
    })
  } catch (error) {
    toast.add({
      title: 'Submission failed',
      description: 'Something went wrong. Please try again in a moment.',
      color: 'error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="relative">

    <BaseSection class="space-y-12">
      <UCard :ui="{ root: 'ring-0 shadow-md' }">
        <div class="flex items-start gap-4">
          <div class="rounded-full bg-muted p-3 text-foreground">
            <UIcon name="i-lucide-mail" class="h-6 w-6" />
          </div>
          <div class="space-y-2">
            <div class="text-sm font-medium text-muted-foreground">Prefer email?</div>
            <a href="mailto:hello@datastewards.academy" class="block text-lg font-medium">
              hello@datastewards.academy
            </a>
            <p class="text-sm text-muted-foreground">We respond within two business days.</p>
          </div>
        </div>
      </UCard>

      <UCard id="contact-form" :ui="{ root: 'ring-0 shadow-md', body: 'px-8 py-10 sm:p-12' }">
        <div class="space-y-8">
          <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Send us a message</h2>
            <p class="text-muted-foreground">
              Tell us about your stewardship goals and any timelines we should know. We'll follow up with next steps and tailor-made resources.
            </p>
          </div>

          <UForm
            :state="state"
            :validate="validate"
            class="space-y-6"
            @submit="onSubmit"
          >
            <div class="grid gap-6 md:grid-cols-2">
              <UFormField label="Full name" name="name" required>
                <UInput v-model="state.name" autocomplete="name" placeholder="Your name" class="w-full" />
              </UFormField>

              <UFormField label="Work email" name="email" required>
                <UInput v-model="state.email" type="email" autocomplete="email" placeholder="you@company.com" class="w-full" />
              </UFormField>

              <UFormField label="Organization" name="organization">
                <UInput v-model="state.organization" autocomplete="organization" placeholder="Company or team" class="w-full" />
              </UFormField>
            </div>

            <UFormField label="How can we help?" name="message" required>
              <UTextarea v-model="state.message" min-rows="4" placeholder="Share a bit about your project, goals, and timelines." class="w-full" />
            </UFormField>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <p class="text-sm text-muted-foreground">
                We typically reply within 2 business days.
              </p>
              <UButton
                type="submit"
                color="primary"
                :loading="isSubmitting"
                label="Send message"
                icon="i-lucide-send"
              />
            </div>
          </UForm>
        </div>
      </UCard>
    </BaseSection>
  </div>
</template>

