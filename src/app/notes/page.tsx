'use client'

import React, { useState } from 'react'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { FileText, Save, Clock, Share2, MoreHorizontal } from 'lucide-react'

export default function NotesPage() {
  const [content, setContent] = useState('')

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg text-muted-foreground">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <input 
              className="bg-transparent border-none outline-none text-2xl font-bold font-outfit block w-full"
              defaultValue="Untitled Research Note"
            />
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Last edited 2 minutes ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-border mx-2" />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Save className="w-4 h-4" />
            Sync to Cloud
          </button>
        </div>
      </header>

      <div className="glass rounded-3xl p-12 min-h-[600px] shadow-2xl shadow-black/40 border-white/5">
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <footer className="flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
        <div className="flex gap-6">
          <span>Characters: {content.replace(/<[^>]*>/g, '').length}</span>
          <span>Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Synced to Supabase
        </div>
      </footer>
    </div>
  )
}
