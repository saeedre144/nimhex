<script setup>
const values = [
  { title: 'Quality over speed', desc: 'We would rather ship something right than ship it fast and fix it later.' },
  { title: 'Clear communication', desc: 'You always know what stage a project is at and what happens next.' },
  { title: 'Built to last', desc: 'Clean, maintainable code that the next developer can actually work with.' },
]
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-24">
    <h1 class="text-4xl font-bold text-gray-900">About nimhex</h1>
    <p class="mt-6 text-lg leading-relaxed text-gray-600">
      We're a small team that designs and builds modern, functional websites — from first concept
      through to a live, working product. This paragraph is placeholder text; swap in your own
      story, background, and what makes your team's approach different.
    </p>

    <div class="mt-16 grid gap-8 sm:grid-cols-3">
      <div v-for="value in values" :key="value.title">
        <h3 class="font-semibold text-gray-900">{{ value.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-gray-500">{{ value.desc }}</p>
      </div>
    </div>
  </section>
</template>