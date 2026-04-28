'use client'

import React, { useState } from 'react'
import { 
  PlusIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  SearchIcon,
  CalendarIcon,
  DollarSignIcon,
  ArrowUpRightIcon,
  FilterIcon,
  DownloadIcon,
  PieChartIcon
} from 'lucide-react'

const dummyTrades = [
  { id: 1, pair: 'XAUUSD', type: 'Buy', entry: '2320.50', exit: '2345.00', profit: '+245.00', date: '2026-04-28', status: 'Win' },
  { id: 2, pair: 'BTCUSD', type: 'Sell', entry: '65200.00', exit: '64100.00', profit: '+1100.00', date: '2026-04-27', status: 'Win' },
  { id: 3, pair: 'XAUUSD', type: 'Sell', entry: '2350.00', exit: '2355.00', profit: '-50.00', date: '2026-04-26', status: 'Loss' },
]

export default function TradingJournalPage() {
  const [activeTab, setActiveTab] = useState('journal')

  return (
    <div className="space-y-10 animate-slide-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight font-outfit text-gradient">Trading Intelligence</h2>
          <p className="text-muted-foreground mt-2 text-sm font-medium">Log, analyze, and optimize your market execution.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass p-1.5 rounded-2xl flex bg-white/[0.02]">
            {['journal', 'analysis', 'roadmap'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-[10px] font-bold uppercase rounded-xl transition-all ${
                  activeTab === tab ? 'bg-primary text-primary-foreground shadow-lg glow-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <PlusIcon className="w-4 h-4" />
            New Execution
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-4">
            <div className="glass flex-1 p-3 rounded-2xl flex items-center gap-4 bg-white/[0.01]">
              <SearchIcon className="w-5 h-5 text-muted-foreground ml-3" />
              <input 
                placeholder="Search assets, setups, or dates..." 
                className="bg-transparent border-none outline-none flex-1 text-sm font-medium"
              />
            </div>
            <button className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <FilterIcon className="w-4 h-4" />
              Filters
            </button>
            <button className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
              <DownloadIcon className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="glass rounded-[32px] overflow-hidden border-white/10 bg-white/[0.01] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-muted-foreground uppercase text-[10px] font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">Asset</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Entry / Exit</th>
                  <th className="px-8 py-5">Net P/L</th>
                  <th className="px-8 py-5">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {dummyTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/[0.03] transition-all group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[10px]">
                          {trade.pair.slice(0, 2)}
                        </div>
                        <span className="font-bold tracking-tight">{trade.pair}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        trade.type === 'Buy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-muted-foreground tabular-nums">
                      {trade.entry} <span className="mx-3 opacity-20">/</span> {trade.exit}
                    </td>
                    <td className={`px-8 py-6 font-bold tabular-nums ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${trade.status === 'Win' ? 'bg-green-400' : 'bg-red-400'}`} />
                        <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">{trade.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[32px] space-y-6 bg-white/[0.02] border-white/10 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold font-outfit text-xl">Efficiency</h3>
              <PieChartIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Win Rate</span>
                <span className="text-xl font-bold font-outfit text-green-400">68%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total P/L</span>
                <span className="text-xl font-bold font-outfit text-primary">+$1,295</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Drawdown</span>
                <span className="text-xl font-bold font-outfit text-red-400">2.4%</span>
              </div>
            </div>
            <div className="pt-4 space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>Monthly Target</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary glow-primary transition-all duration-1000" style={{ width: '75%' }} />
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[32px] space-y-5 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <TrendingUpIcon className="w-16 h-16 text-primary/5 -mr-4 -mt-4 rotate-12" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-primary/20 rounded-lg">
                <TrendingUpIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold font-outfit text-sm uppercase tracking-widest">Roadmap 2026</h3>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-bold font-outfit">$1,295</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Current Funding Progress</p>
            </div>
            <div className="pt-2 relative z-10">
              <div className="w-full h-1 bg-white/10 rounded-full">
                <div className="h-full bg-primary" style={{ width: '13%' }} />
              </div>
              <p className="text-[9px] text-muted-foreground font-bold uppercase mt-2 tracking-tighter italic opacity-60">
                13% of $10k Milestone Reached
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
