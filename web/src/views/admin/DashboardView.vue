<script setup>
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Welcome back, {{ user?.name }}</h1>
    <p class="mt-1 text-gray-500">Here's an overview of your content.</p>
  </div>
</template>