<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errors = ref({})
const loading = ref(false)
const { register } = useAuth()
const router = useRouter()

const submit = async () => {
  errors.value = {}
  loading.value = true
  try {
    await register(name.value, email.value, password.value, passwordConfirmation.value)
    router.push('/')
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <form @submit.prevent="submit" class="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow">
      <h1 class="text-xl font-semibold text-gray-800">Create an account</h1>

      <div>
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name[0] }}</p>
      </div>

      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email[0] }}</p>
      </div>

      <div>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password[0] }}</p>
      </div>

      <div>
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Confirm password"
          class="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Creating account...' : 'Create account' }}
      </button>

      <p class="text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink to="/login" class="text-blue-600 hover:underline">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>