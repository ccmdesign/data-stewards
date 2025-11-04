import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
})

const createFeatureSchema = () => createBaseSchema().extend({
  icon: z.string().editor({ input: 'icon' }),
  ui: z.object({
    leading: z.string().optional()
  }).editor({ hidden: true })
})

const deepDiveSchema = createBaseSchema().extend({
  startDates: z.string().nonempty(),
  location: z.string().nonempty(),
  tuition: z.string().nonempty(),
  capacity: z.string().nonempty(),
  lecturer: z.object({
    name: z.string().nonempty(),
    title: z.string().optional(),
    affiliation: z.string().optional()
  }),
  masterclass: z.object({
    title: z.string().nonempty(),
    subtitle: z.string().optional()
  }).optional(),
  cta: z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    target: createEnum(['_blank', '_self']).optional()
  })
})

const postsSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
  category: createEnum(['blog', 'events', 'interviews', 'videos']),
  tags: z.array(z.string().nonempty()).optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  slug: z.string().nonempty(),
  featured: z.boolean().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  locationType: createEnum(['physical', 'virtual', 'hybrid']).optional(),
  registrationLink: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.string().optional()
})

const offeringPrograms = createEnum(['foundations', 'deep-dives', 'community', 'organizational'])
const offeringStatuses = createEnum(['upcoming', 'waitlist', 'closed', 'past'])
const offeringRegistrationStates = createEnum(['open', 'waitlist', 'closed', 'invite-only'])
const offeringsMetaLinkSchema = createLinkSchema().partial().extend({
  label: z.string().nonempty(),
  to: z.string().nonempty()
})

const offeringsMetaSchema = z.object({
  documentType: z.literal('meta'),
  hero: z.object({
    eyebrow: z.string().optional(),
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    ctas: z.array(offeringsMetaLinkSchema).optional()
  }),
  search: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    filters: z.array(z.object({
      key: z.string().nonempty(),
      label: z.string().nonempty(),
      hint: z.string().optional()
    })).optional()
  }).optional(),
  cta: z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    primary: offeringsMetaLinkSchema.optional(),
    secondary: offeringsMetaLinkSchema.optional()
  }).optional()
}).passthrough()

const offeringContentSchema = z.object({
  documentType: z.literal('offering').optional(),
  title: z.string().nonempty(),
  program: offeringPrograms,
  lecturer: z.string().optional(),
  summary: z.string().nonempty(),
  format: z.string().nonempty(),
  location: z.string().optional(),
  dates: z.string().nonempty(),
  cohortSlug: z.string().optional(),
  duration: z.string().optional(),
  partners: z.array(z.string().nonempty()).optional(),
  filterTag: z.string().optional(),
  status: offeringStatuses,
  registration: z.object({
    label: z.string().nonempty(),
    url: z.string().url(),
    state: offeringRegistrationStates,
    note: z.string().optional()
  }).optional(),
  preview: z.boolean().optional(),
  order: z.number().int().optional(),
  heroImage: z.string().optional()
}).passthrough()

export const collections = {
  content: defineCollection({
    source: 'index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object({
        banner: z.object({
          text: z.string().nonempty(),
          color: createEnum(['primary', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'gray', 'neutral']).optional()
        }).optional(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        highlightedWord: z.string().optional(),
        highlightColor: z.string().optional(),
        button: z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
          color: z.string().optional(),
          variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
        }).optional(),
        platforms: z.array(z.object({
          name: z.string().nonempty(),
          to: z.string().nonempty()
        })).optional(),
        links: z.array(createLinkSchema()).optional()
      }),
      section: createBaseSchema().extend({
        headline: z.string().optional(),
        images: z.object({
          mobile: z.string().optional(),
          desktop: z.string().optional()
        }),
        features: z.array(
          createBaseSchema().extend({
            icon: z.string().editor({ input: 'icon' })
          })
        )
      }),
      features: createBaseSchema().extend({
        features: z.array(createFeatureSchema())
      }),
      steps: createBaseSchema().extend({
        items: z.array(createFeatureSchema().extend({
          image: z.object({
            light: z.string().editor({ input: 'media' }),
            dark: z.string().editor({ input: 'media' })
          }).optional()
        }))
      }),
      pricing: createBaseSchema().extend({
        plans: z.array(
          createBaseSchema().extend({
            price: z.string().nonempty(),
            button: createLinkSchema(),
            features: z.array(z.string().nonempty()),
            highlight: z.boolean().optional(),
            billing_period: z.string().nonempty(),
            billing_cycle: z.string().nonempty()
          })
        )
      }),
      testimonials: createBaseSchema().extend({
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().nonempty(),
              avatar: z.object({
                src: z.string().editor({ input: 'media' }),
                alt: z.string().optional()
              }),
              target: createEnum(['_blank', '_self'])
            })
          }))
      }),
      cta: createBaseSchema().extend({
        links: z.array(createLinkSchema())
      })
    })
  }),
  community: defineCollection({
    source: 'community/**/*.md',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      hero: z.object({
        eyebrow: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        ctaLinks: z.array(z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          target: createEnum(['_blank', '_self']).optional()
        })).optional()
      }).optional(),
      search: z.object({
        placeholder: z.string().optional(),
        helpText: z.string().optional()
      }).optional(),
      channels: z.array(z.object({
        title: z.string().nonempty(),
        description: z.string().optional(),
        body: z.string().optional(),
        cta: z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          target: createEnum(['_blank', '_self']).optional()
        }).optional()
      })).optional(),
      programs: z.array(z.object({
        title: z.string().nonempty(),
        description: z.string().optional(),
        slug: z.string().optional(),
        to: z.string().optional()
      })).optional(),
      partnerLead: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      }).optional(),
      partnerActions: z.array(z.object({
        title: z.string().nonempty(),
        summary: z.string().optional(),
        contact: z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          target: createEnum(['_blank', '_self']).optional()
        }).optional()
      })).optional(),
      benefits: z.object({
        title: z.string().optional(),
        items: z.array(z.string().nonempty()).optional()
      }).optional(),
      collaboration: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        contact: z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          target: createEnum(['_blank', '_self']).optional()
        }).optional()
      }).optional(),
      acknowledgements: z.object({
        title: z.string().optional(),
        placeholder: z.string().optional()
      }).optional()
    }).passthrough()
  }),
  posts: defineCollection({
    source: 'posts/**/*.md',
    type: 'page',
    schema: postsSchema
  }),
  deepDives: defineCollection({
    source: 'deep-dives/**/*.md',
    type: 'page',
    schema: deepDiveSchema
  }),
  faculty: defineCollection({
    source: 'faculty/**/*.md',
    type: 'page',
    schema: z.object({
      name: z.string().nonempty(),
      role: z.string().optional(),
      affiliation: z.string().optional(),
      category: createEnum(['instructor', 'guest-faculty']).optional(),
      image: z.string().optional(),
      headshot: z.string().optional(),
      photo: z.string().optional(),
      bio: z.string().optional(),
      expertise: z.array(z.string()).optional()
    })
  }),
  offerings: defineCollection({
    source: 'offerings/**/*.md',
    type: 'page',
    schema: z.union([offeringContentSchema, offeringsMetaSchema])
  }),
  testimonials: defineCollection({
    source: 'testimonials/**/*.md',
    type: 'page',
    schema: z.object({
      name: z.string().nonempty(),
      affiliation: z.string().optional(),
      cohort: z.string().optional(),
      program: offeringPrograms.optional(),
      tags: z.array(z.string().nonempty()).optional(),
      quote: z.string().optional()
    })
  }),
  syllabi: defineCollection({
    source: 'syllabi/**/*.md',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      program: z.string().nonempty().optional(),
      description: z.string().nonempty().optional(),
      start_schedule: z.string().nonempty().optional(),
      start_date: z.string().nonempty().optional(),
      duration: z.string().nonempty().optional(),
      location: z.string().nonempty().optional(),
      venue: z.string().nonempty().optional(),
      tuition: z.string().nonempty().optional(),
      lecturer: z.string().nonempty().optional(),
      format: z.string().nonempty().optional(),
      delivery: z.string().nonempty().optional(),
      host: z.string().nonempty().optional(),
      capacity: z.string().nonempty().optional(),
      registration_url: z.string().nonempty().optional(),
      registration_email: z.string().email().optional()
    }).passthrough()
  })
}
