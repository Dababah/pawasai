'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import React from 'react'
import { 
  BoldIcon, 
  ItalicIcon, 
  ListIcon, 
  ListOrderedIcon, 
  Heading1Icon, 
  Heading2Icon,
  QuoteIcon,
  CodeIcon
} from 'lucide-react'

const MenuButton = ({ onClick, isActive, children }: { onClick: () => void, isActive?: boolean, children: React.ReactNode }) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`p-2 rounded-lg transition-all ${
      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
    }`}
  >
    {children}
  </button>
)

export function TiptapEditor({ content = '', onChange }: { content?: string, onChange?: (content: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your research notes here...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] py-8',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-1 p-2 glass rounded-2xl border-white/5 bg-white/[0.02] sticky top-4 z-10 backdrop-blur-md">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          isActive={editor.isActive('bold')}
        >
          <BoldIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          isActive={editor.isActive('italic')}
        >
          <ItalicIcon className="w-4 h-4" />
        </MenuButton>
        <div className="w-px h-4 bg-white/10 mx-1 self-center" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1Icon className="w-4 h-4" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2Icon className="w-4 h-4" />
        </MenuButton>
        <div className="w-px h-4 bg-white/10 mx-1 self-center" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          isActive={editor.isActive('bulletList')}
        >
          <ListIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          isActive={editor.isActive('orderedList')}
        >
          <ListOrderedIcon className="w-4 h-4" />
        </MenuButton>
        <div className="w-px h-4 bg-white/10 mx-1 self-center" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          isActive={editor.isActive('blockquote')}
        >
          <QuoteIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
          isActive={editor.isActive('codeBlock')}
        >
          <CodeIcon className="w-4 h-4" />
        </MenuButton>
      </div>
      <EditorContent editor={editor} className="px-4" />
    </div>
  )
}
