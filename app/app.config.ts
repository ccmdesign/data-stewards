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
      defaultVariants: {
        variant: 'outline'
      }
    },

    button: {
      slots: {
        base: 'px-3 py-2 gap-2'
      },
      defaultVariants: {
        size: 'md',
        variant: 'solid',
        color: 'primary'
      }
    }
  }
})
