<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

const navItems = [
  { name: 'Dashboard', to: '/admin' },
  { name: 'Articles', to: '/admin/articles' },
]
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div class="flex h-16 items-center px-6">
        <span class="text-lg font-bold text-gray-900">nimhex</span>
      </div>

      <nav class="flex-1 space-y-1 px-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          active-class="bg-blue-50 text-blue-700"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="border-t border-gray-200 p-4">
        <p class="truncate text-sm font-medium text-gray-800">{{ user?.name }}</p>
        <p class="truncate text-xs text-gray-500">{{ user?.email }}</p>
        <button
          @click="handleLogout"
          class="mt-3 w-full rounded-md bg-gray-100 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-8">
      <RouterView />
    </main>
  </div>
</template>