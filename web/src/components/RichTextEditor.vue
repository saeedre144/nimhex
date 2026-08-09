<script setup>
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import api from '@/api'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})

watch(() => props.modelValue, (value) => {
  if (editor.value && value !== editor.value.getHTML()) {
    editor.value.commands.setContent(value, false)
  }
})

const insertImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post('/api/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  editor.value.chain().focus().setImage({ src: data.url }).run()
  event.target.value = ''
}
</script>

<template>
  <div class="rounded-md border border-gray-300">
    <div class="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
      <button type="button" @click="editor?.chain().focus().toggleBold().run()"
        class="rounded px-2 py-1 text-sm font-bold hover:bg-gray-200"
        :class="{ 'bg-gray-200': editor?.isActive('bold') }">B</button>
      <button type="button" @click="editor?.chain().focus().toggleItalic().run()"
        class="rounded px-2 py-1 text-sm italic hover:bg-gray-200"
        :class="{ 'bg-gray-200': editor?.isActive('italic') }">I</button>
      <button type="button" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        class="rounded px-2 py-1 text-sm font-semibold hover:bg-gray-200"
        :class="{ 'bg-gray-200': editor?.isActive('heading', { level: 2 }) }">H2</button>
      <button type="button" @click="editor?.chain().focus().toggleBulletList().run()"
        class="rounded px-2 py-1 text-sm hover:bg-gray-200"
        :class="{ 'bg-gray-200': editor?.isActive('bulletList') }">• List</button>
      <label class="cursor-pointer rounded px-2 py-1 text-sm hover:bg-gray-200">
        🖼 Image
        <input type="file" accept="image/*" class="hidden" @change="insertImage" />
      </label>
    </div>
    <EditorContent :editor="editor" class="prose max-w-none p-4 focus:outline-none" />
  </div>
</template>