'use client'

import React, { useEffect, useState } from 'react'
import { 
  PlusIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  ArrowRightIcon,
  BarChart3Icon,
  Loader2Icon
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { format } from 'date-fns'

const dummyTrades = [
  { id: '1', pair: 'XAUUSD', type: 'Buy', entry_price: 2320.50, exit_price: 2345.00, profit_loss: 24.50, created_at: new Date().toISOString(), status: 'Closed' },
  { id: '2', pair: 'BTCUSD', type: 'Sell', entry_price: 65200.00, exit_price: 64100.00, profit_loss: 1100.00, created_at: new Date().toISOString(), status: 'Closed' },
  { id: '3', pair: 'XAUUSD', type: 'Sell', entry_price: 2350.00, exit_price: 2355.00, profit_loss: -5.00, created_at: new Date().toISOString(), status: 'Closed' },
]

export default function TradingJournalPage() {
  const [activeTab, setActiveTab] = useState('executions')
  const [trades, setTrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTrades() {
      try {
        const { data, error } = await supabase
          .from('trading_logs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setTrades(data && data.length > 0 ? data : dummyTrades);
      } catch (err) {
        console.error('Error fetching trades:', err);
        setTrades(dummyTrades);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
  }, []);

  const totalProfit = trades.reduce((acc, trade) => acc + (trade.profit_loss || 0), 0);
  const winRate = trades.length > 0 ? (trades.filter(t => (t.profit_loss || 0) > 0).length / trades.length) * 100 : 0;

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Trading Intelligence</h2>
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
          <button className="bg-primary text-black px-4 py-2 rounded-lg flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <PlusIcon className="w-3.5 h-3.5" />
            Log Trade
          </button>
        </div>
      </header>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
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

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
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
                  {trades.map((trade) => (
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
                        {trade.entry_price} <ArrowRightIcon className="inline w-3 h-3 mx-2 opacity-30" /> {trade.exit_price || '-'}
                      </td>
                      <td className={`px-6 py-5 font-bold tabular-nums text-sm ${trade.profit_loss > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.profit_loss > 0 ? `+${trade.profit_loss}` : trade.profit_loss}
                      </td>
                      <td className="px-6 py-5 text-[10px] font-bold text-muted-foreground uppercase">
                        {format(new Date(trade.created_at), 'dd MMM yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-2xl space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-widest">Performance</h3>
                <BarChart3Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Win Rate</p>
                    <p className="text-2xl font-bold tracking-tighter">{winRate.toFixed(1)}%</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-bold uppercase tracking-tighter ${winRate > 50 ? 'text-green-400' : 'text-orange-400'}`}>
                      {winRate > 50 ? 'Strong' : 'Improving'}
                    </p>
                  </div>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${winRate}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-secondary/30 p-3 rounded-lg border border-border">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Total P/L</p>
                    <p className={`text-sm font-bold ${totalProfit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${totalProfit.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-secondary/30 p-3 rounded-lg border border-border">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Trades</p>
                    <p className="text-sm font-bold">{trades.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-primary">Equity Curve Milestone</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-muted-foreground uppercase">Current</span>
                  <span className="text-primary font-mono">${totalProfit.toFixed(0)} / $10,000</span>
                </div>
                <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${Math.min((totalProfit / 10000) * 100, 100)}%` }} />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed italic border-t border-primary/10 pt-4">
                *Next withdrawal milestone: $2,500. Consistent risk management on XAUUSD is required to maintain equity curve.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
