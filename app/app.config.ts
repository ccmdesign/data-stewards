export default defineAppConfig({
  ui: {
    // Pass 2: Semantic Color Mapping
    colors: {
      primary: 'primary',
      neutral: 'neutral'
    },

    // Pass 3: Component Token Assignment - Global Defaults
    card: {
      slots: {
        root: 'border border-default rounded-lg',
        header: 'px-6 py-4',
        body: 'p-6',
        footer: 'px-6 py-4'
      },
      variants: {
        variant: {
          outline: {
            root: 'bg-default border border-default'
          },
          muted: {
            root: 'bg-muted border border-default'
          },
          bordered: {
            root: 'bg-default border border-default',
            body: 'border-t border-b border-default'
          }
        },
        radius: {
          lg: {
            root: 'rounded-lg'
          },
          xl: {
            root: 'rounded-xl'
          },
          '2xl': {
            root: 'rounded-2xl'
          }
        }
      },
      defaultVariants: {
        variant: 'outline',
        radius: 'lg'
      }
    },

    button: {
      slots: {
        base: 'px-3 py-2 gap-2'
      },
      variants: {
        variant: {
          solid: '',
          outline: '',
          soft: '',
          ghost: '',
          link: '',
          'light-outline': {
            base: 'bg-muted border-accented text-foreground hover:bg-elevated'
          }
        }
      },
      defaultVariants: {
        size: 'md',
        variant: 'solid',
        color: 'primary'
      }
    }
  }
})
