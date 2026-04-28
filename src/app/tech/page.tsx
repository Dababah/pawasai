'use client'

import React from 'react'
import { Terminal, Github, Link as LinkIcon, Cpu, ShieldCheck, Network, ExternalLink } from 'lucide-react'

export default function TechLabPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit">Tech Lab</h2>
          <p className="text-muted-foreground mt-1">Research & Development Command for Blockchain and Networking projects.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-muted transition-all">
            <Github className="w-4 h-4" />
            Connect GitHub
          </button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Terminal className="w-4 h-4" />
            Launch Lab
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold font-outfit">Blockchain Audit Trail Research</h3>
            </div>
            <div className="prose prose-invert max-w-none text-sm text-muted-foreground">
              <p>Current Focus: Implementing a decentralized audit trail for supply chain transparency using Solidity and Next.js.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Smart contract architecture design complete.</li>
                <li>Integrating with IPFS for document storage.</li>
                <li>Developing the React frontend for audit verification.</li>
              </ul>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="px-3 py-1 bg-muted rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Solidity</div>
              <div className="px-3 py-1 bg-muted rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground">IPFS</div>
              <div className="px-3 py-1 bg-muted rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Blockchain</div>
            </div>
          </section>

          <section className="glass p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold font-outfit">Networking Lab: OSPF/eBGP Optimization</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Packet Tracer Lab #12', status: 'Completed', date: '2 days ago' },
                { name: 'BGP Route Reflection Setup', status: 'In Progress', date: '5 hours ago' },
                { name: 'OSPF Multi-Area Config', status: 'Draft', date: 'Scheduled' },
              ].map((lab, i) => (
                <div key={i} className="p-4 bg-muted/20 border border-white/5 rounded-2xl flex justify-between items-center group hover:border-primary/30 transition-all">
                  <div>
                    <h4 className="font-bold text-sm">{lab.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{lab.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                    lab.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                  }`}>
                    {lab.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl space-y-4">
            <h3 className="font-bold font-outfit text-lg">Lab Resources</h3>
            <div className="space-y-3">
              {[
                { name: 'Blockchain Paper v1.pdf', icon: LinkIcon },
                { name: 'Network Topology Map', icon: Network },
                { name: 'Lab Configuration Specs', icon: Cpu },
              ].map((resource, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 rounded-xl transition-all">
                  <div className="flex items-center gap-3">
                    <resource.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{resource.name}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl bg-blue-500/5 border-blue-500/20 space-y-4">
            <h3 className="font-bold font-outfit text-sm">Academic Roadmap</h3>
            <p className="text-xs text-muted-foreground">IT Student - Semester 6</p>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Skripsi Progress</span>
                <span className="text-xs font-bold text-blue-500">40%</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full">
                <div className="h-full bg-blue-500" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
