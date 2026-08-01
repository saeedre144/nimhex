<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const errors = ref({})
const { login } = useAuth()
const router = useRouter()

const submit = async () => {
  errors.value = {}
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (err) {
    errors.value = err.response?.data?.errors || { email: [err.message] }
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <form @submit.prevent="submit" class="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow">
      <h1 class="text-xl font-semibold text-gray-800">Log in</h1>

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
      </div>

      <button
        type="submit"
        class="w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
      >
        Log in
      </button>
    </form>
  </div>
</template>