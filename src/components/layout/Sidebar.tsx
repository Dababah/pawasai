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
  ChevronRightIcon
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
    <aside className="w-64 border-r border-white/5 bg-[#050505] h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center glow-primary">
          <BrainCircuitIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight font-outfit">Pawas AI</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Neural Workspace</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Main Menu</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-white/5 text-primary border border-white/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300",
                isActive ? "text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="font-medium text-sm flex-1">{item.name}</span>
              {isActive && <ChevronRightIcon className="w-3 h-3 opacity-50" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="glass p-4 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-white/10">
              PA
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Pawas AI Master</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">System Online</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-white/10">
            <SettingsIcon className="w-3 h-3 text-muted-foreground" />
            Workspace Settings
          </button>
        </div>
      </div>
    </aside>
  )
}
