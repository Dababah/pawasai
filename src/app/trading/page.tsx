'use client'

import React, { useState } from 'react'
import { 
  PlusIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  SearchIcon,
  CalendarIcon,
  DollarSignIcon
} from 'lucide-react'

const dummyTrades = [
  { id: 1, pair: 'XAUUSD', type: 'Buy', entry: '2320.50', exit: '2345.00', profit: '+245.00', date: '2026-04-28' },
  { id: 2, pair: 'BTCUSD', type: 'Sell', entry: '65200.00', exit: '64100.00', profit: '+1100.00', date: '2026-04-27' },
  { id: 3, pair: 'XAUUSD', type: 'Sell', entry: '2350.00', exit: '2355.00', profit: '-50.00', date: '2026-04-26' },
]

export default function TradingJournalPage() {
  const [activeTab, setActiveTab] = useState('journal')

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit">Trading Journal</h2>
          <p className="text-muted-foreground mt-1">Track your XAUUSD and BTCUSD performance.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass p-1 rounded-xl flex">
            {['journal', 'analysis', 'roadmap'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                  activeTab === tab ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <PlusIcon className="w-4 h-4" />
            New Entry
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="glass p-4 rounded-2xl flex items-center gap-4">
            <SearchIcon className="w-5 h-5 text-muted-foreground ml-2" />
            <input 
              placeholder="Filter by pair, date, or setup..." 
              className="bg-transparent border-none outline-none flex-1 text-sm"
            />
          </div>

          <div className="glass rounded-2xl overflow-hidden border-white/5">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Entry / Exit</th>
                  <th className="px-6 py-4">P/L</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dummyTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-bold">{trade.pair}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        trade.type === 'Buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {trade.entry} <span className="mx-2 opacity-30">→</span> {trade.exit}
                    </td>
                    <td className={`px-6 py-4 font-bold ${trade.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.profit}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="font-bold font-outfit text-lg">Monthly Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total P/L</span>
                <span className="text-sm font-bold text-green-500">+$1,295.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-bold">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Trades</span>
                <span className="text-sm font-bold">24</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '68%' }} />
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl space-y-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-4 h-4 text-primary" />
              <h3 className="font-bold font-outfit text-sm">Roadmap 2026</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Goal: Consistent $10k/month funded.
              Current progress: $1,295/month.
            </p>
            <div className="w-full h-1 bg-muted rounded-full">
              <div className="h-full bg-primary" style={{ width: '13%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
