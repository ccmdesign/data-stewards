// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content'
  ],

  // Configure component auto-imports - components in nested directories
  // will be available without path prefix (e.g., BaseSection not SectionsBaseSection)
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  content: {
    experimental: {
      // Force sqlite3 connector so Netlify builds don't need better-sqlite3 native bindings
      sqliteConnector: 'sqlite3'
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: [
        '/'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
