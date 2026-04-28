import { 
  TrendingUpIcon, 
  TerminalIcon, 
  ActivityIcon, 
  PackageIcon, 
  ArrowUpRightIcon,
  PlusIcon,
  ZapIcon,
  CpuIcon
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workspace Overview</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Status: Systems Operational • v1.0.4</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary/50 border border-border text-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all">
            <ZapIcon className="w-3.5 h-3.5 text-primary" />
            Neural Link
          </button>
          <button className="bg-primary text-black px-4 py-2 rounded-lg flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all">
            <PlusIcon className="w-3.5 h-3.5" />
            Initialize
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Trading Performance', value: '+12.5%', sub: 'XAUUSD Alpha', icon: TrendingUpIcon, color: 'text-primary' },
          { title: 'Tech Lab Progress', value: '85%', sub: 'Blockchain Audit', icon: TerminalIcon, color: 'text-zinc-400' },
          { title: 'Inventory Units', value: '42', sub: 'Core Gadgets', icon: PackageIcon, color: 'text-zinc-400' },
          { title: 'Habit Score', value: '92%', sub: 'Consistency', icon: ActivityIcon, color: 'text-zinc-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-xl group hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-secondary rounded border border-border group-hover:border-primary/30 transition-colors">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all" />
            </div>
            <div className="mt-5">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tighter">{stat.value}</h3>
              <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter italic opacity-60">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 space-y-8 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Active R&D Tracks</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">High-priority development modules</p>
            </div>
            <Link href="/tech" className="text-[10px] font-bold bg-secondary/50 border border-border px-3 py-1.5 rounded uppercase hover:bg-secondary transition-all">View All Labs</Link>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Blockchain Audit Trail System', type: 'Solidity Core', progress: 75 },
              { name: 'Core Pawas Marketplace v2', type: 'Production', progress: 40 },
              { name: 'OSPF Optimization Lab', type: 'Networking', progress: 100 },
            ].map((project, i) => (
              <div key={i} className="p-4 bg-secondary/30 rounded-xl border border-border/50 group hover:border-primary/20 transition-all">
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-tight group-hover:text-primary transition-colors">{project.name}</h4>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">{project.type}</p>
                  </div>
                  <span className="text-xs font-bold tabular-nums">{project.progress}%</span>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-700 ease-in-out" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Market Feed</h3>
            <div className="space-y-3">
              {[
                { pair: 'XAUUSD', price: '2,342.50', change: '+0.85%', color: 'text-green-400' },
                { pair: 'BTCUSD', price: '64,120.00', change: '-1.24%', color: 'text-red-400' },
              ].map((market, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border">
                  <div>
                    <p className="font-bold text-xs tracking-widest">{market.pair}</p>
                    <p className="text-[10px] text-muted-foreground font-bold tabular-nums">{market.price}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-bold ${market.color}`}>{market.change}</p>
                    <div className="w-8 h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                       <div className={`h-full ${market.color.replace('text-', 'bg-')} opacity-50`} style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-border mt-4">
             <div className="flex items-center gap-2 mb-2">
                <CpuIcon className="w-3 h-3 text-primary" />
                <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Neural Recommendation</p>
             </div>
             <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic bg-secondary/50 p-4 rounded-xl border border-border/50">
               "RSI divergence detected on XAUUSD 4H timeframe. Consider reducing leverage before NY session open."
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
