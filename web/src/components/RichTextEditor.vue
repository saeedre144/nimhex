<script setup>
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import api from '@/api'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image,
    Underline,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: 'Write your article...' }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none min-h-[350px] px-4 py-3',
    },
  },
})

watch(() => props.modelValue, (value) => {
  if (editor.value && value !== editor.value.getHTML()) {
    editor.value.commands.setContent(value, false)
  }
})

const focusEditor = () => editor.value?.chain().focus().run()

const insertImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  try {
    const { data } = await api.post('/api/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    editor.value.chain().focus().setImage({ src: data.url }).run()
  } catch (err) {
    alert('Image upload failed. Check the console for details.')
    console.error(err)
  } finally {
    event.target.value = ''
  }
}

const setLink = () => {
  const url = window.prompt('URL')
  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().unsetLink().run()
    return
  }
  editor.value.chain().focus().setLink({ href: url }).run()
}

const btnClass = (active) =>
  `rounded px-2.5 py-1.5 text-sm hover:bg-gray-200 ${active ? 'bg-gray-200 text-blue-700' : 'text-gray-700'}`
</script>

<template>
  <div class="overflow-hidden rounded-md border border-gray-300 bg-white">
    <div class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
      <select
        class="rounded border-gray-300 bg-white px-2 py-1 text-sm"
        @change="e => {
          const level = Number(e.target.value)
          level ? editor?.chain().focus().toggleHeading({ level }).run() : editor?.chain().focus().setParagraph().run()
        }"
      >
        <option value="0">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <div class="mx-1 h-5 w-px bg-gray-300"></div>

      <button type="button" @click="editor?.chain().focus().toggleBold().run()" :class="btnClass(editor?.isActive('bold'))"><b>B</b></button>
      <button type="button" @click="editor?.chain().focus().toggleItalic().run()" :class="btnClass(editor?.isActive('italic'))"><i>I</i></button>
      <button type="button" @click="editor?.chain().focus().toggleUnderline().run()" :class="btnClass(editor?.isActive('underline'))"><u>U</u></button>
      <button type="button" @click="editor?.chain().focus().toggleStrike().run()" :class="btnClass(editor?.isActive('strike'))"><s>S</s></button>

      <div class="mx-1 h-5 w-px bg-gray-300"></div>

      <button type="button" @click="editor?.chain().focus().toggleBulletList().run()" :class="btnClass(editor?.isActive('bulletList'))">• List</button>
      <button type="button" @click="editor?.chain().focus().toggleOrderedList().run()" :class="btnClass(editor?.isActive('orderedList'))">1. List</button>
      <button type="button" @click="editor?.chain().focus().toggleBlockquote().run()" :class="btnClass(editor?.isActive('blockquote'))">" Quote</button>
      <button type="button" @click="editor?.chain().focus().toggleCodeBlock().run()" :class="btnClass(editor?.isActive('codeBlock'))">&lt;/&gt;</button>

      <div class="mx-1 h-5 w-px bg-gray-300"></div>

      <button type="button" @click="editor?.chain().focus().setTextAlign('left').run()" :class="btnClass(editor?.isActive({ textAlign: 'left' }))">L</button>
      <button type="button" @click="editor?.chain().focus().setTextAlign('center').run()" :class="btnClass(editor?.isActive({ textAlign: 'center' }))">C</button>
      <button type="button" @click="editor?.chain().focus().setTextAlign('right').run()" :class="btnClass(editor?.isActive({ textAlign: 'right' }))">R</button>

      <div class="mx-1 h-5 w-px bg-gray-300"></div>

      <button type="button" @click="setLink" :class="btnClass(editor?.isActive('link'))">🔗 Link</button>
      <label class="cursor-pointer rounded px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200">
        🖼 Image
        <input type="file" accept="image/*" class="hidden" @change="insertImage" />
      </label>

      <div class="mx-1 h-5 w-px bg-gray-300"></div>

      <button type="button" @click="editor?.chain().focus().undo().run()" class="rounded px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200">↶ Undo</button>
      <button type="button" @click="editor?.chain().focus().redo().run()" class="rounded px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-200">↷ Redo</button>
    </div>

    <div @click="focusEditor" class="cursor-text">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>