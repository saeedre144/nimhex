<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <section class="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
    <h1 class="text-5xl font-bold tracking-tight text-gray-900">
      Welcome to <span class="text-blue-600">nimhex</span>
    </h1>

    <p class="mt-4 max-w-xl text-lg text-gray-500">
      <span v-if="user">
        Good to see you, {{ user.name }}. This is your dashboard — articles and more coming soon.
      </span>
      <span v-else>
        A place to write, publish, and share articles. Create an account to get started.
      </span>
    </p>

    <div v-if="!user" class="mt-8 flex gap-4">
      <RouterLink
        to="/register"
        class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        Get started
      </RouterLink>
      <RouterLink
        to="/login"
        class="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Log in
      </RouterLink>
    </div>

    <div v-else class="mt-8">
      <span
        class="inline-block rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-500"
      >
        Article dashboard — Phase 3
      </span>
    </div>
  </section>
</template>