'use client'

import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import React, { useState } from 'react'
import { 
  BoldIcon, 
  ItalicIcon, 
  ListIcon, 
  ListOrderedIcon, 
  Heading1Icon, 
  Heading2Icon,
  QuoteIcon,
  CodeIcon,
  CheckSquareIcon,
  TableIcon,
  SparklesIcon,
  TypeIcon,
  SearchIcon,
  PlusIcon
} from 'lucide-react'

const MenuButton = ({ onClick, isActive, children, label }: { onClick: () => void, isActive?: boolean, children: React.ReactNode, label?: string }) => (
  <button
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest ${
      isActive ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
    }`}
  >
    {children}
    {label && <span className="text-[10px]">{label}</span>}
  </button>
)

export function TiptapEditor({ content = '', onChange }: { content?: string, onChange?: (content: string) => void }) {
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type '/' for commands...",
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] py-12 px-4 selection:bg-primary selection:text-black',
      },
    },
  })

  if (!editor) return null

  return (
    <div className="w-full relative group">
      {/* Bubble Menu for Text Selection */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex bg-black/90 border border-white/10 rounded-xl p-1 shadow-2xl backdrop-blur-xl animate-fade-in">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <BoldIcon className="w-3 h-3" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <ItalicIcon className="w-3 h-3" />
        </MenuButton>
        <div className="w-px h-3 bg-white/10 mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
          H1
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
          H2
        </MenuButton>
        <div className="w-px h-3 bg-white/10 mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')}>
          <CodeIcon className="w-3 h-3" />
        </MenuButton>
      </BubbleMenu>

      {/* Floating Menu for Slash Commands */}
      <FloatingMenu 
        editor={editor} 
        tippyOptions={{ duration: 100 }} 
        className="grid grid-cols-2 gap-1 bg-black/90 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-bounce-in w-72"
      >
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="Heading 1">
          <Heading1Icon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="Heading 2">
          <Heading2Icon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} label="Bullet List">
          <ListIcon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} label="Todo List">
          <CheckSquareIcon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} label="Table">
          <TableIcon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} label="Quote">
          <QuoteIcon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} label="Code Block">
          <CodeIcon className="w-3.5 h-3.5 text-primary" />
        </MenuButton>
        <MenuButton onClick={() => {}} label="AI Insert">
          <SparklesIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
        </MenuButton>
      </FloatingMenu>

      <EditorContent editor={editor} />
    </div>
  )
}
