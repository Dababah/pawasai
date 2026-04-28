import React from 'react'
import { PackageIcon, SearchIcon, PlusIcon, FilterIcon, TagIcon, SmartphoneIcon, ChevronRightIcon, TrendingUpIcon, ShoppingBagIcon } from 'lucide-react'

const dummyInventory = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphone', stock: 5, price: 'Rp 18.500.000', status: 'In Stock', color: 'bg-green-400' },
  { id: 2, name: 'MacBook Pro M3', category: 'Laptop', stock: 2, price: 'Rp 32.000.000', status: 'Low Stock', color: 'bg-orange-400' },
  { id: 3, name: 'iPad Air 5', category: 'Tablet', stock: 8, price: 'Rp 9.500.000', status: 'In Stock', color: 'bg-green-400' },
  { id: 4, name: 'Sony WH-1000XM5', category: 'Audio', stock: 0, price: 'Rp 4.200.000', status: 'Out of Stock', color: 'bg-red-400' },
]

export default function InventoryPage() {
  return (
    <div className="space-y-12 animate-slide-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight font-outfit text-gradient">Commerce Engine</h2>
          <p className="text-muted-foreground mt-2 text-sm font-medium">Manage Core Pawas gadget inventory and sales pipelines.</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <TrendingUpIcon className="w-4 h-4" />
            Analytics
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <PlusIcon className="w-4 h-4" />
            Add Asset
          </button>
        </div>
      </header>

      <div className="flex gap-6">
        <div className="glass flex-1 p-3 rounded-[24px] flex items-center gap-4 bg-white/[0.01] border-white/10 shadow-2xl">
          <SearchIcon className="w-5 h-5 text-muted-foreground ml-4" />
          <input 
            placeholder="Search products by name, serial, or category..." 
            className="bg-transparent border-none outline-none flex-1 text-sm font-medium py-3"
          />
          <div className="flex gap-2 mr-2">
            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
              <FilterIcon className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="glass p-3 rounded-[24px] flex items-center gap-4 bg-white/[0.01] border-white/10 px-8">
          <ShoppingBagIcon className="w-5 h-5 text-primary" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Value</p>
            <p className="text-sm font-bold font-outfit">Rp 245.5M</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {dummyInventory.map((item) => (
          <div key={item.id} className="glass p-8 rounded-[40px] group relative overflow-hidden glass-hover shadow-2xl">
            <div className={`absolute top-0 right-0 w-32 h-32 ${item.color.replace('bg-', 'bg-')}/5 rounded-full blur-3xl -mr-16 -mt-16`} />
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <span className={cn(
                  "text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border",
                  item.status === 'In Stock' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                  item.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                )}>
                  {item.status}
                </span>
                <SmartphoneIcon className="w-5 h-5 text-muted-foreground opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
              </div>
              <div>
                <h3 className="font-bold font-outfit text-xl tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-1">{item.category}</p>
              </div>
              <div className="flex justify-between items-end pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter mb-1">Valuation</p>
                  <p className="font-bold text-primary font-outfit">{item.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter mb-1">Available</p>
                  <p className="font-bold tabular-nums">{item.stock}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 group/btn">
                View Details
                <ChevronRightIcon className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
