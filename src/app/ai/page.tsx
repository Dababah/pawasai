'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Command } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function NeuralCorePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Neural Core online. Standing by for command input.' }
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection failure. Neural Core offline.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/20 rounded-2xl">
          <Command className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-outfit">Neural Core</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Autonomous Agent Online
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex gap-4 animate-fade-in",
            m.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              m.role === 'assistant' ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {m.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
              m.role === 'assistant' 
                ? "bg-card border border-white/5 shadow-sm" 
                : "bg-primary text-primary-foreground font-medium"
            )}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-card border border-white/5 p-4 rounded-2xl w-32 h-10" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 opacity-20" />
        <div className="glass p-2 rounded-2xl flex items-center gap-2 border-white/10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Issue a command... (e.g. 'Log a gold trade', 'Check inventory')"
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="p-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-primary" />
          Pawas AI Neural Control Protocol Active
        </p>
      </form>
    </div>
  )
}
