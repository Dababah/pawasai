
import React from 'react'
import { PackageIcon, SearchIcon, PlusIcon, FilterIcon, TagIcon, SmartphoneIcon } from 'lucide-react'

const dummyInventory = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphone', stock: 5, price: 'Rp 18.500.000', status: 'In Stock' },
  { id: 2, name: 'MacBook Pro M3', category: 'Laptop', stock: 2, price: 'Rp 32.000.000', status: 'Low Stock' },
  { id: 3, name: 'iPad Air 5', category: 'Tablet', stock: 8, price: 'Rp 9.500.000', status: 'In Stock' },
  { id: 4, name: 'Sony WH-1000XM5', category: 'Audio', stock: 0, price: 'Rp 4.200.000', status: 'Out of Stock' },
]

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit">Business Inventory</h2>
          <p className="text-muted-foreground mt-1">Manage Core Pawas gadget stock and marketplace listings.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <PlusIcon className="w-4 h-4" />
          Add Item
        </button>
      </header>

      <div className="flex gap-4">
        <div className="glass flex-1 p-2 rounded-xl flex items-center gap-4">
          <SearchIcon className="w-5 h-5 text-muted-foreground ml-2" />
          <input 
            placeholder="Search products by name, category, or status..." 
            className="bg-transparent border-none outline-none flex-1 text-sm"
          />
        </div>
        <button className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-muted transition-colors">
          <FilterIcon className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyInventory.map((item) => (
          <div key={item.id} className="glass p-6 rounded-2xl group hover:border-primary/50 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <SmartphoneIcon className="w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  item.status === 'In Stock' ? 'bg-green-500/10 text-green-500' : 
                  item.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {item.status}
                </span>
                <TagIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold font-outfit text-lg">{item.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.category}</p>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Price</p>
                  <p className="font-bold text-primary">{item.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Stock</p>
                  <p className="font-bold">{item.stock} Units</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
