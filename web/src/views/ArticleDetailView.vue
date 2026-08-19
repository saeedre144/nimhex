<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'

const route = useRoute()
const article = ref(null)
const notFound = ref(false)

onMounted(async () => {
  try {
    const { data } = await api.get(`/api/public/articles/${route.params.slug}`)
    article.value = data.data
  } catch {
    notFound.value = true
  }
})

// Update the browser tab title + meta description for basic client-side SEO
watchEffect(() => {
  if (!article.value) return
  document.title = article.value.meta_title || article.value.title

  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', article.value.meta_description || '')
})
</script>

<template>
  <article v-if="article" class="mx-auto max-w-3xl px-6 py-16">
    <img
      v-if="article.featured_image"
      :src="article.featured_image"
      :alt="article.featured_image_alt || article.title"
      class="w-full rounded-lg object-cover"
      style="max-height: 420px"
    />
    <h1 class="mt-6 text-4xl font-bold text-gray-900">{{ article.title }}</h1>
    <p class="mt-2 text-sm text-gray-500">By {{ article.author }} · {{ article.updated_at }}</p>
    <div class="prose mt-8 max-w-none" v-html="article.body"></div>
  </article>

  <div v-else-if="notFound" class="mx-auto max-w-3xl px-6 py-24 text-center text-gray-500">
    Article not found.
  </div>
</template>