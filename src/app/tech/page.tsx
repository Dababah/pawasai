import React from 'react'
import { 
  TerminalIcon, 
  GithubIcon, 
  LinkIcon, 
  CpuIcon, 
  ShieldCheckIcon, 
  NetworkIcon, 
  ExternalLinkIcon,
  Code2Icon,
  SearchIcon,
  PlusIcon
} from 'lucide-react'

export default function TechLabPage() {
  return (
    <div className="space-y-12 animate-slide-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight font-outfit text-gradient">Tech Lab</h2>
          <p className="text-muted-foreground mt-2 text-sm font-medium">Research & Development Command for decentralized systems and networking.</p>
        </div>
        <div className="flex gap-4">
          <button className="glass px-6 py-2.5 rounded-xl flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <GithubIcon className="w-4 h-4" />
            Repository Link
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <PlusIcon className="w-4 h-4" />
            Initialize Lab
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="glass p-10 rounded-[40px] space-y-8 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <ShieldCheckIcon className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-outfit">Blockchain Audit Trail Research</h3>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Lead Investigator • Pawas AI</p>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none relative z-10">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Currently spearheading research on decentralized audit trails for supply chain integrity. 
                Integrating high-throughput smart contract architectures with IPFS for immutable document anchoring.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  'Smart Contract Architecture Design',
                  'IPFS Integration Layer',
                  'Frontend Verification Portal',
                  'ZKP Privacy Implementation'
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 relative z-10">
              {['Solidity', 'IPFS', 'Next.js', 'Ethers.js'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="glass p-10 rounded-[40px] space-y-8 bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                <NetworkIcon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold font-outfit">Networking Lab: Routing Optimization</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: 'Packet Tracer Lab #12', status: 'Completed', date: '2 days ago', color: 'text-green-400' },
                { name: 'BGP Route Reflection Setup', status: 'In Progress', date: '5 hours ago', color: 'text-primary' },
                { name: 'OSPF Multi-Area Config', status: 'Draft', date: 'Scheduled', color: 'text-muted-foreground' },
                { name: 'VPN Tunnel Encapsulation', status: 'Draft', date: 'Queue', color: 'text-muted-foreground' },
              ].map((lab, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/[0.04] transition-all">
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{lab.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">{lab.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg border border-white/10 uppercase ${lab.color}`}>
                    {lab.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[40px] space-y-8 bg-white/[0.02] border-white/10 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold font-outfit text-xl tracking-tight">Lab Assets</h3>
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                { name: 'Blockchain Paper v1.pdf', icon: LinkIcon, size: '2.4 MB' },
                { name: 'Network Topology Map', icon: NetworkIcon, size: '4.1 MB' },
                { name: 'Lab Config Specs', icon: CpuIcon, size: '156 KB' },
              ].map((resource, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/5 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <resource.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold tracking-tight">{resource.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">{resource.size}</p>
                    </div>
                  </div>
                  <ExternalLinkIcon className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-10 rounded-[40px] bg-blue-500/5 border-blue-500/10 space-y-6 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <h3 className="font-bold font-outfit text-sm uppercase tracking-[0.2em] text-blue-400">Academic Roadmap</h3>
            <div className="space-y-6 pt-2">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold font-outfit">40%</p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">Thesis Completion</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Code2Icon className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 glow-primary transition-all duration-1000" style={{ width: '40%' }} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium italic opacity-60 bg-white/5 p-4 rounded-xl">
                "Target: Complete ZKP section by end of Semester 6."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
