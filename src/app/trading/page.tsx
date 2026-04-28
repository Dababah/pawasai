'use client'

import React, { useState } from 'react'
import { 
  PlusIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  ArrowRightIcon,
  BarChart3Icon
} from 'lucide-react'

const dummyTrades = [
  { id: 1, pair: 'XAUUSD', type: 'Buy', entry: '2320.50', exit: '2345.00', profit: '+245.00', date: '28 APR 2026', status: 'Win' },
  { id: 2, pair: 'BTCUSD', type: 'Sell', entry: '65200.00', exit: '64100.00', profit: '+1100.00', date: '27 APR 2026', status: 'Win' },
  { id: 3, pair: 'XAUUSD', type: 'Sell', entry: '2350.00', exit: '2355.00', profit: '-50.00', date: '26 APR 2026', status: 'Loss' },
]

export default function TradingJournalPage() {
  const [activeTab, setActiveTab] = useState('executions')

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trading Intelligence</h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">Market performance tracking and equity curve management.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-secondary/50 p-1 rounded-lg border border-border flex items-center">
            {['executions', 'stats', 'roadmap'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${
                  activeTab === tab ? 'bg-primary text-black' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-primary text-black px-4 py-2 rounded-lg flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all">
            <PlusIcon className="w-3.5 h-3.5" />
            Log Trade
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-secondary/30 border border-border rounded-lg flex items-center px-4 gap-3">
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Filter executions by asset or setup..." 
                className="bg-transparent border-none outline-none flex-1 text-xs py-2.5 font-medium"
              />
            </div>
            <button className="px-4 py-2.5 bg-secondary/30 border border-border rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground transition-all flex items-center gap-2">
              <FilterIcon className="w-3.5 h-3.5" />
              Filters
            </button>
            <button className="px-4 py-2.5 bg-secondary/30 border border-border rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground transition-all flex items-center gap-2">
              <DownloadIcon className="w-3.5 h-3.5" />
              Export
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-secondary/50 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border">
                <tr>
                  <th className="px-6 py-4">Execution Asset</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Price Delta</th>
                  <th className="px-6 py-4">Net P/L</th>
                  <th className="px-6 py-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dummyTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-secondary rounded flex items-center justify-center font-bold text-[10px] border border-border">
                          {trade.pair.slice(0, 2)}
                        </div>
                        <span className="font-bold text-sm tracking-tight">{trade.pair}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${
                        trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground font-mono text-[11px] tabular-nums">
                      {trade.entry} <ArrowRightIcon className="inline w-3 h-3 mx-2 opacity-30" /> {trade.exit}
                    </td>
                    <td className={`px-6 py-5 font-bold tabular-nums text-sm ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profit}
                    </td>
                    <td className="px-6 py-5 text-[10px] font-bold text-muted-foreground uppercase">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border p-6 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-widest">Performance</h3>
              <BarChart3Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Win Rate</p>
                  <p className="text-2xl font-bold tracking-tighter">68.2%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">+2.4% Δ</p>
                </div>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '68%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-secondary/30 p-3 rounded-lg border border-border">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">Profit</p>
                  <p className="text-sm font-bold text-green-400">+$1,295</p>
                </div>
                <div className="bg-secondary/30 p-3 rounded-lg border border-border">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">Trades</p>
                  <p className="text-sm font-bold">24</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Equity Curve Milestone</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-muted-foreground uppercase">Current</span>
                <span className="text-primary font-mono">$1,295 / $10,000</span>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '13%' }} />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-primary/10 pt-4">
              *Next withdrawal milestone: $2,500. Consistent risk management on XAUUSD is required to maintain equity curve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
