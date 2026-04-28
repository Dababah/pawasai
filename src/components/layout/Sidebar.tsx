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
  FileTextIcon
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
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BrainCircuitIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">Pawas AI</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full">
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            P
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate">Pawas AI User</p>
            <p className="text-[10px] text-muted-foreground truncate">Free Tier</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
