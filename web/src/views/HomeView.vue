<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/api'

const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await api.get('/api/public/articles')
  articles.value = data.data.slice(0, 3)
  loading.value = false
})

const services = [
  {
    title: 'Web Design',
    desc: 'Clean, purposeful interfaces built around how people actually use your product — not just how it looks in a mockup.',
  },
  {
    title: 'Development',
    desc: 'Fast, maintainable, production-grade code. Modern stacks, sensible architecture, no shortcuts that cost you later.',
  },
  {
    title: 'Branding',
    desc: 'Visual identity that holds up across every touchpoint — from your homepage to your social presence.',
  },
]

const stats = [
  { value: '30+', label: 'Projects shipped' },
  { value: '5+', label: 'Years experience' },
  { value: '98%', label: 'Client satisfaction' },
]
</script>

<template>
  <!-- Hero -->
  <section class="bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-28 text-center text-white">
    <p class="text-sm font-medium uppercase tracking-widest text-blue-400">Design &amp; Development Studio</p>
    <h1 class="mx-auto mt-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight">
      We build modern websites that actually work
    </h1>
    <p class="mx-auto mt-6 max-w-xl text-lg text-gray-300">
      A small team focused on design, development, and everything in between — turning ideas into fast, functional products.
    </p>
    <div class="mt-10 flex justify-center gap-4">
      <RouterLink
        to="/articles"
        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
      >
        See Our Work
      </RouterLink>
      <RouterLink
        to="/about"
        class="rounded-lg border border-gray-600 px-6 py-3 font-medium text-gray-200 hover:border-gray-400"
      >
        About Us
      </RouterLink>
    </div>
  </section>

  <!-- Stats bar -->
  <section class="border-b border-gray-200 bg-white px-6 py-10">
    <div class="mx-auto grid max-w-4xl grid-cols-3 gap-6 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ stat.label }}</p>
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="mx-auto max-w-5xl px-6 py-24">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900">What we do</h2>
      <p class="mt-3 text-gray-500">End-to-end, from first sketch to production deploy.</p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-3">
      <div v-for="service in services" :key="service.title" class="rounded-xl border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900">{{ service.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ service.desc }}</p>
      </div>
    </div>
  </section>

  <!-- Latest articles -->
  <section v-if="!loading && articles.length" class="bg-white px-6 py-24">
    <div class="mx-auto max-w-5xl">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">From the blog</h2>
        <RouterLink to="/articles" class="text-sm font-medium text-blue-600 hover:underline">View all →</RouterLink>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-3">
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="`/articles/${article.slug}`"
          class="overflow-hidden rounded-lg border border-gray-200 transition hover:shadow-md"
        >
          <img
            v-if="article.featured_image"
            :src="article.featured_image"
            :alt="article.featured_image_alt || article.title"
            class="h-40 w-full object-cover"
          />
          <div v-else class="h-40 w-full bg-gray-100"></div>
          <div class="p-4">
            <h3 class="font-medium text-gray-900">{{ article.title }}</h3>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-gray-900 px-6 py-20 text-center text-white">
    <h2 class="text-3xl font-bold">Have a project in mind?</h2>
    <p class="mx-auto mt-3 max-w-md text-gray-300">Let's talk about what you're building and how we can help.</p>
    <RouterLink
      to="/about"
      class="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
    >
      Get in Touch
    </RouterLink>
  </section>
</template>