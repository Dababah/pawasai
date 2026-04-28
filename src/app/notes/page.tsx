'use client'

import React, { useState } from 'react'
import { TiptapEditor } from '@/components/editor/TiptapEditor'
import { FileTextIcon, SaveIcon, ClockIcon, Share2Icon, MoreHorizontalIcon, SparklesIcon } from 'lucide-react'

export default function NotesPage() {
  const [content, setContent] = useState('')

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-slide-in">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-primary/10 rounded-[24px] border border-primary/20 glow-primary">
            <FileTextIcon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <input 
              className="bg-transparent border-none outline-none text-4xl font-bold font-outfit block w-full text-gradient"
              defaultValue="Research Protocol: Blockchain Audit"
            />
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2 font-bold uppercase tracking-widest">
              <ClockIcon className="w-3 h-3 text-primary" />
              Last Sync: 2 mins ago • 1.2k Words
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 text-muted-foreground hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
            <Share2Icon className="w-5 h-5" />
          </button>
          <button className="p-3 text-muted-foreground hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
            <MoreHorizontalIcon className="w-5 h-5" />
          </button>
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all shadow-2xl shadow-primary/30 glow-primary">
            <SaveIcon className="w-4 h-4" />
            Synchronize
          </button>
        </div>
      </header>

      <div className="glass rounded-[48px] p-16 min-h-[800px] shadow-[0_32px_128px_rgba(0,0,0,0.6)] border-white/5 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <footer className="flex justify-between items-center px-10 py-6 glass rounded-[24px] border-white/10 bg-white/[0.02]">
        <div className="flex gap-8">
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Characters</p>
            <p className="text-sm font-bold font-outfit">{content.replace(/<[^>]*>/g, '').length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Read Time</p>
            <p className="text-sm font-bold font-outfit">{Math.ceil(content.split(' ').length / 200)} Min</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Supabase Linked</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-all">
            <SparklesIcon className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">AI Optimize</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
