// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    devProxy: {
      host: 'localhost',
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxt/eslint', '@primevue/nuxt-module', '@pinia/nuxt', '@nuxtjs/i18n'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  primevue: {
    importTheme: { from: '@/themes/loaderpro.ts' },
    options: {
      pt: {
        button: {
          root: '',
        },
      },
    }
  },
  i18n: {
    locales: [
      { code: 'russia', name: 'Русский', file: 'ru.json' },
      { code: 'united-states', name: 'English', file: 'en.json' },
      { code: 'china', name: '漢語', file: 'cn.json' },
    ],
    defaultLocale: 'russia',
    strategy: 'no_prefix',
  },
  icon: {
    customCollections: [
      {
        prefix: 'icons',
        dir: "./assets/icons",
      },
    ],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'LOADERPRO',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'Предлагаем купить запчасти для вилочных погрузчиков и складской техники от лучших мировых производителей и поставщиков в Санкт-Петербурге с доставкой по всей России у компании СПЕЦМАШИНА' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    }
  },
})
