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

  const handleAIAction = async (action: 'rewrite' | 'summarize') => {
    setIsProcessingAI(true)
    try {
      const response = await fetch('/api/ai/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.replace(/<[^>]*>/g, ''), action })
      })
      const data = await response.json()
      if (data.result) {
        const result = action === 'summarize' 
          ? `<h2>Summary</h2><p>${data.result}</p><hr/>${content}`
          : data.result;
        setContent(result)
        savePage(title, result)
      }
    } catch (err) {
      console.error('AI Error:', err)
    } finally {
      setIsProcessingAI(false)
    }
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
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <button onClick={() => router.push('/')} className="text-primary hover:underline">Return to Dashboard</button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
        <HomeIcon className="w-3 h-3" />
        <ChevronRightIcon className="w-3 h-3 opacity-30" />
        <span>Pages</span>
        <ChevronRightIcon className="w-3 h-3 opacity-30" />
        <span className="text-foreground truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Page Header */}
      <div className="group relative space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-20 h-20 bg-secondary/50 rounded-3xl flex items-center justify-center text-4xl border border-border group-hover:border-primary/30 transition-colors">
            {page.icon || '📄'}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground"><SparklesIcon className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-muted-foreground"><MoreHorizontalIcon className="w-4 h-4" /></button>
          </div>
        </div>
        
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent border-none outline-none text-5xl font-black tracking-tight placeholder:opacity-20"
        />
        
        <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-3 h-3" />
            Edited {format(new Date(page.updated_at), 'MMM d, h:mm a')}
          </div>
          <div className="flex items-center gap-2">
            {saving ? (
              <span className="flex items-center gap-2 text-primary animate-pulse">
                <Loader2Icon className="w-3 h-3 animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-green-500/50">
                <SaveIcon className="w-3 h-3" />
                Saved to Cloud
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      {/* Editor Surface */}
      <div className="min-h-[600px] pb-32">
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      {/* Floating AI Toolbar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass p-1.5 rounded-2xl border-primary/20 shadow-2xl flex items-center gap-1 z-50 animate-bounce-in">
        <button 
          onClick={() => handleAIAction('rewrite')}
          disabled={isProcessingAI}
          className="flex items-center gap-2 px-4 py-2 hover:bg-primary/10 rounded-xl text-primary text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {isProcessingAI ? <Loader2Icon className="w-3 h-3 animate-spin" /> : <SparklesIcon className="w-3 h-3" />}
          Rewrite
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button 
          onClick={() => handleAIAction('summarize')}
          disabled={isProcessingAI}
          className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          Summarize
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button className="p-2 hover:bg-red-500/10 rounded-xl text-red-500/50 hover:text-red-500 transition-all">
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
