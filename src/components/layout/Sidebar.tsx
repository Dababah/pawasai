'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboardIcon, 
  LineChartIcon, 
  TerminalIcon, 
  PackageIcon, 
  CheckCircle2Icon, 
  SettingsIcon,
  BrainCircuitIcon,
  FileTextIcon,
  SearchIcon,
  PlusIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
  { name: 'Neural Core', href: '/ai', icon: BrainCircuitIcon },
  { name: 'Trading Journal', href: '/trading', icon: LineChartIcon },
  { name: 'Tech Lab', href: '/tech', icon: TerminalIcon },
  { name: 'Notes', href: '/notes', icon: FileTextIcon },
  { name: 'Inventory', href: '/inventory', icon: PackageIcon },
  { name: 'Habits', href: '/habits', icon: CheckCircle2Icon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-[#27272a] bg-[#050505] h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <BrainCircuitIcon className="w-5 h-5 text-black" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight uppercase">Pawas AI</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-50">Industrial v1.0</p>
        </div>
      </div>

      <div className="px-4 mb-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-all">
          <SearchIcon className="w-4 h-4" />
          <span className="flex-1 text-left">Search Control...</span>
          <kbd className="text-[10px] font-mono opacity-40">⌘K</kbd>
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 mt-4 opacity-50">Workspace</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 group",
                isActive 
                  ? "bg-primary/10 text-primary font-bold" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="text-[13px]">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="p-3 bg-white/[0.02] border border-border rounded-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-zinc-700 to-zinc-900 border border-border flex items-center justify-center text-[10px] font-bold">
              P
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Pawas Master</p>
              <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-tighter">Pro Developer</p>
            </div>
          </div>
          <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all border border-border">
            Settings
          </button>
        </div>
      </div>
    </aside>
  )
}
