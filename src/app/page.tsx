import { 
  TrendingUp, 
  Terminal, 
  Activity, 
  Package, 
  ArrowUpRight,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit">Control Center</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Pawas. Systems are nominal.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Quick Capture
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Trading Performance', value: '+12.5%', sub: 'XAUUSD / BTCUSD', icon: TrendingUp, color: 'text-green-500' },
          { title: 'Tech Lab Progress', value: '85%', sub: 'Blockchain Audit Research', icon: Terminal, color: 'text-blue-500' },
          { title: 'Business Inventory', value: '42 Units', sub: 'Core Pawas Gadgets', icon: Package, color: 'text-purple-500' },
          { title: 'Habit Consistency', value: '92%', sub: 'Last 7 Days', icon: Activity, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 font-outfit tracking-tight">{stat.value}</h3>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold font-outfit">Active Research Lab</h3>
            <Link href="/tech" className="text-xs text-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Blockchain Audit Trail System', type: 'Academic', progress: 75 },
              { name: 'Core Pawas Marketplace v2', type: 'Business', progress: 40 },
              { name: 'OSPF Configuration Optimization', type: 'Lab', progress: 100 },
            ].map((project, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{project.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase">{project.type}</p>
                  </div>
                  <span className="text-xs font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold font-outfit">Trading Pulse</h3>
          <div className="space-y-4">
            {[
              { pair: 'XAUUSD', price: '2,342.50', change: '+0.85%', status: 'Bullish' },
              { pair: 'BTCUSD', price: '64,120.00', change: '-1.24%', status: 'Ranging' },
            ].map((market, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-muted/20 border border-white/5">
                <div>
                  <p className="font-bold text-sm">{market.pair}</p>
                  <p className="text-xs text-muted-foreground">{market.price}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${market.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {market.change}
                  </p>
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">{market.status}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "System Note: RSI on XAUUSD is approaching overbought zones. Monitor the 2,350 resistance level carefully."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
