
import React from 'react'
import { CheckCircle2, Circle, Flame, Target, Trophy, Calendar } from 'lucide-react'

const habits = [
  { id: 1, name: 'Morning Gym Session', streak: 12, completed: true },
  { id: 2, name: 'Blockchain Research (1hr)', streak: 5, completed: true },
  { id: 3, name: 'Trading Journal Update', streak: 24, completed: false },
  { id: 4, name: 'Learn Spanish (Duolingo)', streak: 156, completed: true },
  { id: 5, name: 'Read 20 Pages', streak: 3, completed: false },
]

export default function HabitsPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-outfit">Atomic Habits</h2>
          <p className="text-muted-foreground mt-1">"Every action you take is a vote for the person you wish to become."</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Best Streak</p>
              <p className="font-bold">156 Days</p>
            </div>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Calendar className="w-4 h-4" />
            Weekly View
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {habits.map((habit) => (
            <div key={habit.id} className="glass p-6 rounded-2xl flex items-center gap-6 group hover:border-primary/30 transition-all">
              <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                habit.completed ? 'bg-primary text-primary-foreground' : 'border-2 border-muted hover:border-primary'
              }`}>
                {habit.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
              </button>
              <div className="flex-1">
                <h3 className={`font-bold font-outfit text-lg ${habit.completed ? 'text-muted-foreground line-through' : ''}`}>
                  {habit.name}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {habit.streak} day streak
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3 text-primary" />
                    Daily Goal
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className={`w-2 h-8 rounded-full ${
                    day < 6 ? 'bg-primary/40' : day === 6 && habit.completed ? 'bg-primary' : 'bg-muted'
                  }`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <Trophy className="w-12 h-12 text-primary mx-auto" />
            <div>
              <h3 className="font-bold font-outfit text-xl">Consistency Score</h3>
              <p className="text-4xl font-bold text-primary mt-2">92%</p>
            </div>
            <p className="text-sm text-muted-foreground">
              You're in the top 5% of productive users this week. Keep going!
            </p>
            <button className="w-full bg-muted hover:bg-muted/80 py-3 rounded-xl text-sm font-bold transition-all">
              View Achievements
            </button>
          </div>

          <div className="glass p-6 rounded-3xl space-y-4">
            <h4 className="font-bold font-outfit">Today's Focus</h4>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-sm font-medium">Finalize Blockchain Audit Paper</p>
              <p className="text-xs text-muted-foreground mt-1">High Priority • 2 hours estimated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
