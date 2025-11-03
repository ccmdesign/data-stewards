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
  posts: defineCollection({
    source: 'posts/**/*.md',
    type: 'page',
    schema: postsSchema
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
  })
}
