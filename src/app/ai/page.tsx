'use client'

import React, { useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { 
  SendIcon, 
  BotIcon, 
  UserIcon, 
  SparklesIcon, 
  CommandIcon, 
  CpuIcon, 
  LayersIcon, 
  ZapIcon,
  Loader2Icon,
  CheckCircle2Icon
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function NeuralCorePage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      { id: 'init', role: 'assistant', content: 'Neural Core Online. System integrity check complete. All modules synchronized. Standing by for Pawas AI Command Input.' }
    ]
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(scrollToBottom, [messages])

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-5xl mx-auto animate-fade-in pb-12">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 glow-primary">
            <CommandIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gradient">Neural Core</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Autonomous Active
              </span>
              <span className="w-px h-2 bg-white/10" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">v4.0 Tool-Enabled</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
            <CpuIcon className="w-3 h-3 text-primary" />
            NPU Ready
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
            <LayersIcon className="w-3 h-3 text-primary" />
            Context Full
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-8 pr-6 custom-scrollbar relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/5 via-white/2 to-transparent -z-10" />
        
        {messages.map((m) => (
          <div key={m.id} className={cn(
            "flex gap-6 items-start group",
            m.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300",
              m.role === 'assistant' 
                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                : "bg-secondary text-white border-border"
            )}>
              {m.role === 'assistant' ? <BotIcon className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
            </div>
            
            <div className="max-w-[80%] space-y-2">
              <div className={cn(
                "p-6 rounded-[24px] text-[14px] leading-relaxed relative transition-all duration-300",
                m.role === 'assistant' 
                  ? "bg-card border border-border text-foreground/90" 
                  : "bg-primary text-black font-bold shadow-lg shadow-primary/20"
              )}>
                {m.content}
                
                {/* Tool Call Indicators */}
                {m.toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  if (state === 'result') {
                    return (
                      <div key={toolCallId} className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                        <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                          Executed: {toolName}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={toolCallId} className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                      <Loader2Icon className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Neural Core processing: {toolName}...
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className={cn(
                "flex gap-4 px-2 opacity-0 group-hover:opacity-100 transition-opacity",
                m.role === 'user' ? "justify-end" : "justify-start"
              )}>
                <button className="text-[9px] font-bold text-muted-foreground uppercase hover:text-primary transition-colors tracking-widest">Copy</button>
                <button className="text-[9px] font-bold text-muted-foreground uppercase hover:text-primary transition-colors tracking-widest">Feedback</button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-10 relative">
        <div className="bg-card p-2 rounded-[24px] border border-border flex items-center gap-3 shadow-2xl">
          <div className="w-11 h-11 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground border border-border">
            <ZapIcon className="w-5 h-5 text-primary" />
          </div>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Execute neural command... (e.g. 'Log a gold trade buy at 2340')"
            className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-[14px] placeholder:text-zinc-600 font-medium"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="w-11 h-11 bg-primary text-black rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-primary/20"
          >
            {isLoading ? <Loader2Icon className="w-5 h-5 animate-spin" /> : <SendIcon className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex justify-between items-center px-6 mt-4">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-bold flex items-center gap-2">
            <SparklesIcon className="w-3 h-3 text-primary animate-pulse" />
            Neural Link: Secure & Tool-Enabled
          </p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-bold">
            ⌘K for Global Command
          </p>
        </div>
      </form>
    </div>
  )
}
