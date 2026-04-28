'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { 
  FileTextIcon, 
  SaveIcon, 
  ClockIcon, 
  SparklesIcon, 
  Loader2Icon,
  ChevronRightIcon,
  HomeIcon,
  MoreHorizontalIcon,
  Trash2Icon,
  PlusIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export default function DynamicPage() {
  const { id } = useParams()
  const router = useRouter()
  const [page, setPage] = useState<any>(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isProcessingAI, setIsProcessingAI] = useState(false)
  const supabase = createClient()

  const fetchPage = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      if (data) {
        setPage(data)
        setTitle(data.title)
        setContent(data.content_text || '')
      }
    } catch (err) {
      console.error('Error fetching page:', err)
      // If page not found, maybe redirect or show error
    } finally {
      setLoading(false)
    }
  }, [id, supabase])

  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  const savePage = async (newTitle: string, newContent: string) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('notes')
        .update({ 
          title: newTitle, 
          content_text: newContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
      
      if (error) throw error
    } catch (err) {
      console.error('Error saving page:', err)
    } finally {
      setTimeout(() => setSaving(false), 500)
    }
  }

  // Debounced auto-save
  useEffect(() => {
    if (!page || loading) return
    const timeout = setTimeout(() => {
      if (title !== page.title || content !== page.content_text) {
        savePage(title, content)
      }
    }, 2000)
    return () => clearTimeout(timeout)
  }, [title, content, page, loading])

  const updateProperty = async (key: string, value: any) => {
    const newProps = { ...(page.properties || {}), [key]: value }
    setPage({ ...page, properties: newProps })
    await supabase.from('notes').update({ properties: newProps }).eq('id', id)
  }

  const updateIcon = async (newIcon: string) => {
    setPage({ ...page, icon: newIcon })
    await supabase.from('notes').update({ icon: newIcon }).eq('id', id)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!page) {
    return (
      <div className="p-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-400">Page Not Found</h2>
        <button onClick={() => router.push('/')} className="text-primary hover:underline font-bold uppercase tracking-widest text-[10px]">Return to Control Center</button>
      </div>
    )
  }

  const props = page.properties || {}

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8 animate-fade-in pb-40">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
        <HomeIcon className="w-3 h-3" />
        <ChevronRightIcon className="w-3 h-3 opacity-30" />
        <Link href="/" className="hover:text-primary transition-colors">Workspace</Link>
        <ChevronRightIcon className="w-3 h-3 opacity-30" />
        <span className="text-foreground truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Page Header */}
      <div className="group relative space-y-6">
        <div className="flex justify-between items-start">
          <button 
            onClick={() => {
              const icon = prompt('Enter an emoji icon:', page.icon || '📄')
              if (icon) updateIcon(icon)
            }}
            className="w-20 h-20 bg-secondary/30 rounded-3xl flex items-center justify-center text-4xl border border-border group-hover:border-primary/50 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            {page.icon || '📄'}
          </button>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2.5 hover:bg-white/5 rounded-xl text-muted-foreground border border-transparent hover:border-white/10 transition-all">
              <SparklesIcon className="w-4 h-4" />
            </button>
            <button className="p-2.5 hover:bg-white/5 rounded-xl text-muted-foreground border border-transparent hover:border-white/10 transition-all">
              <MoreHorizontalIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Protocol"
          className="w-full bg-transparent border-none outline-none text-6xl font-black tracking-tighter placeholder:opacity-10 text-gradient py-2"
        />

        {/* Notion-style Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 py-6 border-y border-white/5">
          <div className="flex items-center gap-4 group/prop">
            <span className="w-24 text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <ClockIcon className="w-3 h-3" /> Status
            </span>
            <select 
              value={props.status || 'Draft'}
              onChange={(e) => updateProperty('status', e.target.value)}
              className="bg-secondary/30 border border-border rounded-lg px-3 py-1 text-xs font-bold text-primary outline-none hover:border-primary/50 transition-all cursor-pointer"
            >
              {['Draft', 'In Progress', 'Completed', 'Archived'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4 group/prop">
            <span className="w-24 text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <TagIcon className="w-3 h-3" /> Priority
            </span>
            <select 
              value={props.priority || 'Medium'}
              onChange={(e) => updateProperty('priority', e.target.value)}
              className="bg-secondary/30 border border-border rounded-lg px-3 py-1 text-xs font-bold text-orange-400 outline-none hover:border-orange-500/50 transition-all cursor-pointer"
            >
              {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4 group/prop">
            <span className="w-24 text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
               Category
            </span>
            <input 
              value={props.category || ''}
              onChange={(e) => updateProperty('category', e.target.value)}
              placeholder="Add category..."
              className="bg-transparent border-none outline-none text-xs font-bold text-foreground flex-1 placeholder:opacity-20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            Edited {format(new Date(page.updated_at), 'MMM d, h:mm a')}
          </div>
          <div className="flex items-center gap-2">
            {saving ? (
              <span className="flex items-center gap-2 text-primary animate-pulse italic">
                <Loader2Icon className="w-3 h-3 animate-spin" />
                Neural Syncing...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-green-500/40">
                <SaveIcon className="w-3 h-3" />
                Cloud Persistent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="min-h-[600px]">
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Floating AI Toolbar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 glass p-2 rounded-3xl border-primary/20 shadow-[0_32px_128px_rgba(0,0,0,0.8)] flex items-center gap-2 z-50 animate-bounce-in">
        <button 
          onClick={() => handleAIAction('rewrite')}
          disabled={isProcessingAI}
          className="flex items-center gap-3 px-6 py-2.5 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-xl shadow-primary/20"
        >
          {isProcessingAI ? <Loader2Icon className="w-3 h-3 animate-spin" /> : <SparklesIcon className="w-3 h-3" />}
          AI Rewrite
        </button>
        <button 
          onClick={() => handleAIAction('summarize')}
          disabled={isProcessingAI}
          className="flex items-center gap-3 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-2xl text-foreground text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          Summarize
        </button>
        <div className="w-px h-6 bg-white/10 mx-1" />
        <button className="p-3 hover:bg-red-500/10 rounded-2xl text-red-500/50 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20">
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
  )
}
