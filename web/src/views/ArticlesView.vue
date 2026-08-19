<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/api'

const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await api.get('/api/public/articles')
  articles.value = data.data
  loading.value = false
})
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-16">
    <h1 class="text-3xl font-bold text-gray-900">Articles</h1>

    <div v-if="loading" class="mt-8 text-gray-400">Loading...</div>
    <div v-else-if="articles.length === 0" class="mt-8 text-gray-400">No articles published yet.</div>

    <div v-else class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="article in articles"
        :key="article.id"
        :to="`/articles/${article.slug}`"
        class="overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
      >
        <img
          v-if="article.featured_image"
          :src="article.featured_image"
          :alt="article.featured_image_alt || article.title"
          class="h-44 w-full object-cover"
        />
        <div v-else class="h-44 w-full bg-gray-100"></div>
        <div class="p-4">
          <h3 class="font-medium text-gray-900">{{ article.title }}</h3>
          <p class="mt-1 line-clamp-2 text-sm text-gray-500">{{ article.meta_description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>