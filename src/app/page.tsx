import { 
  TrendingUpIcon, 
  TerminalIcon, 
  ActivityIcon, 
  PackageIcon, 
  ArrowUpRightIcon,
  PlusIcon,
  ZapIcon
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-12 animate-slide-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold tracking-tight font-outfit text-gradient">Workspace Control</h2>
          <p className="text-muted-foreground mt-2 text-sm font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full glow-primary" />
            Neural Systems Nominal • 28 Apr 2026
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 text-foreground px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm hover:bg-white/10 transition-all">
            <ZapIcon className="w-4 h-4 text-primary" />
            Insights
          </button>
          <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <PlusIcon className="w-4 h-4" />
            New Module
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Trading Performance', value: '+12.5%', sub: 'XAUUSD / BTCUSD', icon: TrendingUpIcon, color: 'text-green-400', gradient: 'from-green-500/20' },
          { title: 'Tech Lab Progress', value: '85%', sub: 'Blockchain Audit', icon: TerminalIcon, color: 'text-blue-400', gradient: 'from-blue-500/20' },
          { title: 'Business Inventory', value: '42 Units', sub: 'Core Pawas Gadgets', icon: PackageIcon, color: 'text-purple-400', gradient: 'from-purple-500/20' },
          { title: 'Habit Consistency', value: '92%', sub: '7 Day Average', icon: ActivityIcon, color: 'text-orange-400', gradient: 'from-orange-500/20' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl relative overflow-hidden group glass-hover">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} to-transparent opacity-50`} />
            <div className="flex justify-between items-start relative z-10">
              <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <ArrowUpRightIcon className="w-5 h-5 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all group-hover:text-primary" />
            </div>
            <div className="mt-6 relative z-10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-2 font-outfit tracking-tighter">{stat.value}</h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{stat.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[32px] p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="flex justify-between items-center relative z-10">
            <div>
              <h3 className="text-2xl font-bold font-outfit">Neural Lab Projects</h3>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Active research and development tracks</p>
            </div>
            <Link href="/tech" className="text-xs bg-white/5 px-4 py-2 rounded-lg font-bold hover:bg-white/10 transition-all border border-white/10">Manage All</Link>
          </div>
          <div className="space-y-5 relative z-10">
            {[
              { name: 'Blockchain Audit Trail System', type: 'Academic', progress: 75, color: 'bg-blue-500' },
              { name: 'Core Pawas Marketplace v2', type: 'Business', progress: 40, color: 'bg-purple-500' },
              { name: 'OSPF Configuration Optimization', type: 'Lab', progress: 100, color: 'bg-green-500' },
            ].map((project, i) => (
              <div key={i} className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{project.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">{project.type}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-outfit">{project.progress}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${project.color} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(139,92,246,0.3)]`} style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-[32px] p-8 space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-[60px] -ml-16 -mb-16" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-outfit">Market Pulse</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Real-time trading execution logs</p>
          </div>
          <div className="space-y-4 relative z-10">
            {[
              { pair: 'XAUUSD', price: '2,342.50', change: '+0.85%', status: 'Bullish', color: 'text-green-400' },
              { pair: 'BTCUSD', price: '64,120.00', change: '-1.24%', status: 'Ranging', color: 'text-red-400' },
            ].map((market, i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${market.color} glow-primary`} />
                  <div>
                    <p className="font-bold text-sm tracking-tight">{market.pair}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">{market.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${market.color}`}>{market.change}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">{market.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <ZapIcon className="w-3 h-3 text-primary" />
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Neural Insight</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed italic bg-white/5 p-4 rounded-xl border border-white/5">
              "RSI on XAUUSD is approaching overbought zones. Monitor 2,350 resistance level for potential reversal."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
