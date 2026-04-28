import React from 'react'
import { CheckCircle2Icon, CircleIcon, FlameIcon, TargetIcon, TrophyIcon, CalendarIcon, ZapIcon, TrendingUpIcon } from 'lucide-react'

const habits = [
  { id: 1, name: 'Morning Gym Session', streak: 12, completed: true, category: 'Health' },
  { id: 2, name: 'Blockchain Research (1hr)', streak: 5, completed: true, category: 'Tech' },
  { id: 3, name: 'Trading Journal Update', streak: 24, completed: false, category: 'Finance' },
  { id: 4, name: 'Learn Spanish (Duolingo)', streak: 156, completed: true, category: 'Skills' },
  { id: 5, name: 'Read 20 Pages', streak: 3, completed: false, category: 'Mindset' },
]

export default function HabitsPage() {
  return (
    <div className="space-y-12 animate-slide-in">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold tracking-tight font-outfit text-gradient">Atomic Growth</h2>
          <p className="text-muted-foreground mt-2 text-sm font-medium">"Systematic improvement is the architecture of excellence."</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-6 py-2.5 rounded-2xl flex items-center gap-4 bg-white/[0.01]">
            <FlameIcon className="w-5 h-5 text-orange-500 glow-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Master Streak</p>
              <p className="text-sm font-bold font-outfit">156 Days</p>
            </div>
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-3 font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/20 glow-primary">
            <CalendarIcon className="w-4 h-4" />
            Weekly Sync
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-4 ml-4">Daily Protocols</p>
          {habits.map((habit) => (
            <div key={habit.id} className="glass p-8 rounded-[32px] flex items-center gap-8 group glass-hover relative overflow-hidden bg-white/[0.01]">
              <button className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                habit.completed ? 'bg-primary text-primary-foreground glow-primary scale-110' : 'bg-white/5 border border-white/10 hover:border-primary/50'
              }`}>
                {habit.completed ? <CheckCircle2Icon className="w-8 h-8" /> : <CircleIcon className="w-8 h-8 text-muted-foreground" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className={`font-bold font-outfit text-xl tracking-tight transition-all ${habit.completed ? 'text-muted-foreground line-through opacity-50' : ''}`}>
                    {habit.name}
                  </h3>
                  <span className="px-2 py-0.5 bg-white/5 rounded-md text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                    {habit.category}
                  </span>
                </div>
                <div className="flex items-center gap-6 mt-3">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <FlameIcon className="w-3 h-3 text-orange-500" />
                    {habit.streak} day streak
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <TargetIcon className="w-3 h-3 text-primary" />
                    Goal Met
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5 h-10 items-end">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className={`w-1.5 rounded-full transition-all duration-500 ${
                    day < 6 ? 'bg-primary/40 h-full' : day === 6 && habit.completed ? 'bg-primary h-full' : 'bg-white/5 h-1/2'
                  }`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="glass p-10 rounded-[40px] text-center space-y-8 relative overflow-hidden bg-white/[0.02] border-white/10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex justify-center">
              <div className="p-5 bg-primary/10 rounded-[24px] border border-primary/20 glow-primary">
                <TrophyIcon className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-bold font-outfit text-2xl tracking-tight">Consistency Core</h3>
              <p className="text-5xl font-bold text-gradient mt-4 tabular-nums">92%</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground font-medium px-6">
                You are outperforming 95% of neural workspace users this session.
              </p>
              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                System Reports
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-[40px] space-y-6 bg-white/[0.01] border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="font-bold font-outfit text-sm uppercase tracking-widest">Neural Focus</h4>
              <ZapIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl group hover:bg-primary/10 transition-all cursor-default">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold tracking-tight">Blockchain Audit Paper</p>
                <TrendingUpIcon className="w-3 h-3 text-primary" />
              </div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">High Priority • 2.0h est</p>
              <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
