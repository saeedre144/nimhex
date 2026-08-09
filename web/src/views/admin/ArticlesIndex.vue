<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/api'

const articles = ref([])
const loading = ref(true)

const fetchArticles = async () => {
  loading.value = true
  const { data } = await api.get('/api/articles')
  articles.value = data.data
  loading.value = false
}

const deleteArticle = async (id) => {
  if (!confirm('Delete this article?')) return
  await api.delete(`/api/articles/${id}`)
  await fetchArticles()
}

onMounted(fetchArticles)
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">Articles</h1>
      <RouterLink
        to="/admin/articles/create"
        class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        New Article
      </RouterLink>
    </div>

    <div class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Image</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Updated</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="5" class="px-4 py-6 text-center text-sm text-gray-400">Loading...</td>
          </tr>
          <tr v-else-if="articles.length === 0">
            <td colspan="5" class="px-4 py-6 text-center text-sm text-gray-400">No articles yet.</td>
          </tr>
          <tr v-for="article in articles" :key="article.id">
            <td class="px-4 py-3">
              <img v-if="article.featured_image_thumb" :src="article.featured_image_thumb" class="h-10 w-14 rounded object-cover" />
              <div v-else class="h-10 w-14 rounded bg-gray-100"></div>
            </td>
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ article.title }}</td>
            <td class="px-4 py-3">
              <span
                class="rounded-full px-2 py-0.5 text-xs font-medium"
                :class="article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ article.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-500">{{ article.updated_at }}</td>
            <td class="space-x-3 px-4 py-3 text-right text-sm">
              <RouterLink :to="`/admin/articles/${article.id}/edit`" class="text-blue-600 hover:underline">Edit</RouterLink>
              <button @click="deleteArticle(article.id)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>