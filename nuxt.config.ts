// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/motion/nuxt',
  ],
  routeRules: {
    '/shop/**': { ssr: true }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    // Remove devProxy configuration
  },
  app: {
    head: {
      title: 'The Joshua Tea',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium tea selection by The Joshua Tea' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ],
      script: [
        { src: 'https://js.stripe.com/v3/', defer: true }
      ]
    }
  },
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      woocommerceApiUrl: process.env.WOOCOMMERCE_API_URL,
      woocommerceConsumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
      woocommerceConsumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  }
})
