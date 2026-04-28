'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SendIcon, BotIcon, UserIcon, SparklesIcon, CommandIcon, CpuIcon, LayersIcon, ZapIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function NeuralCorePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Neural Core Online. System integrity check complete. All modules synchronized. Standing by for Pawas AI Command Input.' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            content: m.content
          }))
        })
      })

      const data = await response.json()
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'CRITICAL ERROR: Neural Link severed. Please check system connectivity.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-5xl mx-auto animate-slide-in">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 glow-primary">
            <CommandIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-outfit text-gradient">Neural Core</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Autonomous Active
              </span>
              <span className="w-1 h-1 bg-white/10 rounded-full" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">v4.0 Alpha</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <CpuIcon className="w-3 h-3" />
            8GB NPU
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <LayersIcon className="w-3 h-3" />
            128 Context
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-8 pr-6 custom-scrollbar relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/5 via-white/2 to-transparent -z-10" />
        
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex gap-6 items-start group",
            m.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300",
              m.role === 'assistant' 
                ? "bg-primary/10 text-primary border-primary/20 glow-primary" 
                : "bg-white/5 text-white border-white/10"
            )}>
              {m.role === 'assistant' ? <BotIcon className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
            </div>
            <div className={cn(
              "max-w-[75%] p-6 rounded-[24px] text-[15px] leading-relaxed relative transition-all duration-300 shadow-2xl",
              m.role === 'assistant' 
                ? "glass border-white/10 text-foreground/90 font-medium" 
                : "bg-primary text-primary-foreground font-semibold"
            )}>
              {m.content}
              {m.role === 'assistant' && (
                <div className="absolute -bottom-6 left-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] font-bold text-muted-foreground uppercase hover:text-primary transition-colors">Copy</button>
                  <button className="text-[10px] font-bold text-muted-foreground uppercase hover:text-primary transition-colors">Regenerate</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-6 items-start animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <BotIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="glass p-6 rounded-[24px] w-48 h-16 border-white/10" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-10 relative">
        <div className="glass p-3 rounded-[28px] border-white/10 flex items-center gap-3 bg-white/[0.02]">
          <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-muted-foreground">
            <ZapIcon className="w-5 h-5" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Execute neural command... (e.g. 'Analyze XAUUSD liquidity')"
            className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-[15px] placeholder:text-zinc-600 font-medium"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="p-4 bg-primary text-primary-foreground rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 shadow-xl shadow-primary/30 glow-primary"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between items-center px-6 mt-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold flex items-center gap-2">
            <SparklesIcon className="w-3 h-3 text-primary animate-pulse" />
            Neural Link: Secure & Encrypted
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">
            Enter to Send • Shift + Enter for Line
          </p>
        </div>
      </form>
    </div>
  )
}
