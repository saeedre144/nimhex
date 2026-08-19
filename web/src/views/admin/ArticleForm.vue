<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import RichTextEditor from '@/components/RichTextEditor.vue'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id

const title = ref('')
const metaTitle = ref('')
const metaDescription = ref('')
const featuredImageAlt = ref('')
const body = ref('')
const status = ref('draft')
const featuredImageUrl = ref(null)
const featuredImageFile = ref(null)
const errors = ref({})
const saving = ref(false)

onMounted(async () => {
  if (isEdit) {
    const { data } = await api.get(`/api/articles/${route.params.id}`)
    title.value = data.data.title
    metaTitle.value = data.data.meta_title || ''
    metaDescription.value = data.data.meta_description || ''
    featuredImageAlt.value = data.data.featured_image_alt || ''
    body.value = data.data.body
    status.value = data.data.status
   featuredImageUrl.value = data.data.featured_image_url || data.data.featured_image_thumb
  }
})

const uploadFeaturedImage = (event) => {
  featuredImageFile.value = event.target.files[0]
  featuredImageUrl.value = URL.createObjectURL(featuredImageFile.value)
}

const submit = async () => {
  errors.value = {}
  saving.value = true
  try {
    const payload = {
    title: title.value,
    meta_title: metaTitle.value,
    meta_description: metaDescription.value,
    featured_image_alt: featuredImageAlt.value,  
    body: body.value,
    status: status.value,
    }

    let articleId = route.params.id
    if (isEdit) {
      await api.put(`/api/articles/${articleId}`, payload)
    } else {
      const { data } = await api.post('/api/articles', payload)
      articleId = data.data.id
    }

    if (featuredImageFile.value) {
      const formData = new FormData()
      formData.append('file', featuredImageFile.value)
      // نیازی به ست کردن دستی Content-Type نیست
        await api.post(`/api/articles/${articleId}/featured-image`, formData)
    }

    router.push('/admin/articles')
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-2xl font-semibold text-gray-900">{{ isEdit ? 'Edit' : 'New' }} Article</h1>

    <form @submit.prevent="submit" class="mt-6 space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="title"
          type="text"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title[0] }}</p>
      </div>

        <div>
        <label class="block text-sm font-medium text-gray-700">Featured Image</label>
        <input type="file" accept="image/*" @change="uploadFeaturedImage" class="mt-1 text-sm" />
        <img v-if="featuredImageUrl" :src="featuredImageUrl" :alt="featuredImageAlt" class="mt-2 h-32 w-48 rounded-md object-cover" />

        <label class="mt-3 block text-sm font-medium text-gray-700">
            Image Alt Text <span class="text-gray-400">(describe the image for SEO & accessibility)</span>
        </label>
        <input
            v-model="featuredImageAlt"
            type="text"
            placeholder="e.g. A developer writing code on a laptop"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Body</label>
        <RichTextEditor v-model="body" class="mt-1" />
        <p v-if="errors.body" class="mt-1 text-sm text-red-600">{{ errors.body[0] }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          SEO Title <span class="text-gray-400">(optional, defaults to Title)</span>
        </label>
        <input
          v-model="metaTitle"
          type="text"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Meta Description <span class="text-gray-400">({{ metaDescription.length }}/160)</span>
        </label>
        <textarea
          v-model="metaDescription"
          maxlength="160"
          rows="2"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select
          v-model="status"
          class="mt-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
        <RouterLink to="/admin/articles" class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>