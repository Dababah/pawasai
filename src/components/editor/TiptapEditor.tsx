'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import React from 'react'

export function TiptapEditor({ content = '', onChange }: { content?: string, onChange?: (content: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing or press "/" for commands...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px]',
      },
    },
  })

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  )
}
