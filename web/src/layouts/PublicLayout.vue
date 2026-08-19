<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="text-lg font-bold text-gray-900">nimhex</RouterLink>
        <nav class="flex items-center gap-6 text-sm font-medium text-gray-600">
          <RouterLink to="/" class="hover:text-gray-900">Home</RouterLink>
          <RouterLink to="/articles" class="hover:text-gray-900">Articles</RouterLink>
          <RouterLink v-if="user" to="/admin" class="hover:text-gray-900">Dashboard</RouterLink>
          <RouterLink v-else to="/login" class="hover:text-gray-900">Login</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>