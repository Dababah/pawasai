'use client'

import React, { useState, useEffect } from 'react'
import { 
  DatabaseIcon, 
  WifiIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  ClockIcon, 
  CpuIcon 
} from 'lucide-react'

export function StatusBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="fixed bottom-0 left-64 right-0 h-8 bg-[#050505] border-t border-border flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <DatabaseIcon className="w-3 h-3 text-green-500" />
          Supabase: Connected
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="text-muted-foreground uppercase">XAUUSD:</span>
            <span className="text-green-400">2,342.50</span>
            <TrendingUpIcon className="w-2.5 h-2.5 text-green-400" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="text-muted-foreground uppercase">BTCUSD:</span>
            <span className="text-red-400">64,120.00</span>
            <TrendingDownIcon className="w-2.5 h-2.5 text-red-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <CpuIcon className="w-3 h-3 text-primary" />
          NPU: 12%
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <ClockIcon className="w-3 h-3" />
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[9px] font-black text-primary uppercase italic">
          Neural Active
        </div>
      </div>
    </footer>
  )
}
