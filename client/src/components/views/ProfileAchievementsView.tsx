import React from 'react';
import { motion } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Trophy, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Coins, 
  BarChart3, 
  Award, 
  ShieldCheck, 
  Zap,
  Star
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export function ProfileAchievementsView() {
  const { stats, achievements, dailyActivity, selectAvatar, cosmetics } = useClockIn();

  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;
  const totalAchievements = achievements.length;
  const xpPercent = Math.min(100, Math.round((stats.currentXP / stats.xpToNextLevel) * 100));

  const unlockedAvatars = cosmetics.filter((c) => c.category === 'avatar' && c.isUnlocked);

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Profile Banner Card */}
      <div className="card-solid p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-primary/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Identity */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-primary via-primary/80 to-amber-300 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shadow-primary/30 border-2 border-primary/50">
                {stats.selectedAvatar || '🧙‍♂️'}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-black uppercase">
                LVL {stats.level}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {stats.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                  {stats.title}
                </span>
              </div>
              <p className="text-xs text-foreground/60 mt-1 font-medium">
                Gamified Quest Adventurer • Joined Season 1
              </p>

              {/* Avatar Selector Strip */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-[10px] text-foreground/40 font-semibold mr-1">Avatar:</span>
                {unlockedAvatars.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => selectAvatar(av.icon)}
                    className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                      stats.selectedAvatar === av.icon
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary scale-110 shadow-sm'
                        : 'bg-card/80 border border-border/40 hover:bg-card text-foreground/70'
                    }`}
                    title={av.name}
                  >
                    {av.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Level & XP Progression Box */}
          <div className="w-full md:w-80 space-y-2 p-4 rounded-2xl bg-background/50 border border-border/40">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-foreground">Level {stats.level} Progression</span>
              <span className="text-primary font-mono">{stats.currentXP} / {stats.xpToNextLevel} XP</span>
            </div>
            <Progress value={xpPercent} className="h-3" />
            <div className="flex items-center justify-between text-[10px] text-foreground/50">
              <span>Total Lifetime: {stats.totalXP.toLocaleString()} XP</span>
              <span className="text-primary font-semibold">{stats.xpToNextLevel - stats.currentXP} XP to Level {stats.level + 1}</span>
            </div>
          </div>
        </div>

        {/* 4 Core RPG Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-border/40">
          <div className="p-4 rounded-2xl bg-card/60 border border-border/30 text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-xs font-bold uppercase">Streak</span>
            </div>
            <p className="text-2xl font-black text-foreground">{stats.streakDays} Days</p>
            <p className="text-[10px] text-foreground/50 mt-0.5">Consecutive questing</p>
          </div>

          <div className="p-4 rounded-2xl bg-card/60 border border-border/30 text-center">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Quests</span>
            </div>
            <p className="text-2xl font-black text-foreground">{stats.totalTasksCompleted}</p>
            <p className="text-[10px] text-foreground/50 mt-0.5">Tasks completed</p>
          </div>

          <div className="p-4 rounded-2xl bg-card/60 border border-border/30 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Focus</span>
            </div>
            <p className="text-2xl font-black text-foreground">{Math.floor(stats.totalFocusMinutes / 60)}h {stats.totalFocusMinutes % 60}m</p>
            <p className="text-[10px] text-foreground/50 mt-0.5">Deep flow logged</p>
          </div>

          <div className="p-4 rounded-2xl bg-card/60 border border-border/30 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-300 mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Gold Coins</span>
            </div>
            <p className="text-2xl font-black text-amber-300">{stats.gold}</p>
            <p className="text-[10px] text-foreground/50 mt-0.5">Available currency</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Velocity Graph (Recharts) */}
      <div className="card-solid p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Weekly Quest Velocity & Focus Hours</span>
            </h3>
            <p className="text-xs text-foreground/60">Real-time productivity output across the past 7 days</p>
          </div>
          <span className="text-xs font-bold text-primary px-3 py-1 rounded-xl bg-primary/10 border border-primary/20">
            +3,740 XP This Week
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 24, 0.95)', 
                  borderColor: 'rgba(245, 166, 35, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="xpEarned" fill="var(--primary)" radius={[6, 6, 0, 0]} name="XP Earned" />
              <Bar dataKey="tasksCompleted" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Tasks Done" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span>Achievements Hall of Fame</span>
            </h3>
            <p className="text-xs text-foreground/60">
              Unlocked: <span className="text-primary font-bold">{unlockedAchievementsCount} / {totalAchievements}</span> badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const progressRatio = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

            return (
              <motion.div
                key={ach.id}
                whileHover={ach.unlocked ? { y: -4, scale: 1.02 } : {}}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  ach.unlocked
                    ? 'card-solid border-primary/40 shadow-lg shadow-primary/10'
                    : 'bg-card/30 border-border/30 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-card/80 border border-border/40 flex items-center justify-center text-2xl shadow-inner">
                      {ach.icon}
                    </div>
                    {ach.unlocked ? (
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase">
                        ✓ Unlocked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/50 text-[10px] font-semibold">
                        Locked
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-foreground">{ach.title}</h4>
                  <p className="text-xs text-foreground/60 mt-1 leading-relaxed">{ach.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-foreground/50">Progress</span>
                    <span className="text-primary font-mono">{ach.progress} / {ach.maxProgress}</span>
                  </div>
                  <Progress value={progressRatio} className="h-1.5" />
                  <div className="flex items-center justify-between text-[10px] text-foreground/50 pt-1">
                    <span className="text-amber-300 font-bold">+{ach.rewardGold} 🪙</span>
                    <span className="text-primary font-bold">+{ach.rewardXP} XP</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileAchievementsView;
