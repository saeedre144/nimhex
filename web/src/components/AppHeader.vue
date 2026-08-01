<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
    <RouterLink to="/" class="font-semibold text-gray-800">nimhex</RouterLink>

    <nav class="flex items-center gap-4 text-sm">
      <template v-if="user">
        <span class="text-gray-600">Hi, {{ user.name }}</span>
        <button
          @click="handleLogout"
          class="rounded bg-gray-100 px-3 py-1.5 text-gray-700 hover:bg-gray-200"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="text-blue-600 hover:underline">Login</RouterLink>
        <RouterLink to="/register" class="text-blue-600 hover:underline">Register</RouterLink>
      </template>
    </nav>
  </header>
</template>