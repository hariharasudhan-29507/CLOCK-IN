import React from 'react';
import { motion } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Sparkles, 
  Flame, 
  Coins, 
  Volume2, 
  VolumeX, 
  Layers, 
  CheckSquare, 
  Timer, 
  Trophy, 
  Image as ImageIcon, 
  ShoppingBag, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function Navbar() {
  const { 
    stats, 
    activeTab, 
    setActiveTab, 
    toggleSound, 
    isFloatingOpen, 
    setIsFloatingOpen,
    resetToDefaults
  } = useClockIn();

  const xpPercent = Math.min(100, Math.round((stats.currentXP / stats.xpToNextLevel) * 100));

  const navItems = [
    { id: 'showcase', label: 'Concept Overview', icon: Layers },
    { id: 'workspace', label: 'Quest Workspace', icon: CheckSquare },
    { id: 'focus', label: 'Deep Focus', icon: Timer },
    { id: 'profile', label: 'RPG & Stats', icon: Trophy },
    { id: 'memories', label: 'Memory Journal', icon: ImageIcon },
    { id: 'store', label: 'Vault & Themes', icon: ShoppingBag },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Avatar */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('showcase')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-primary/80 to-amber-300 flex items-center justify-center text-xl shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              {stats.selectedAvatar || '⏰'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground tracking-tight text-lg group-hover:text-primary transition-colors">
                  CLOCK-IN
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-semibold tracking-wider">
                  V2
                </span>
              </div>
              <p className="text-xs text-foreground/50 hidden sm:block font-medium">
                {stats.name} • {stats.title}
              </p>
            </div>
          </button>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-card/60 rounded-xl border border-border/40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive 
                    ? 'text-primary-foreground font-bold' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-md shadow-primary/30"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Action Hub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Level & XP Mini Bar */}
          <div 
            onClick={() => setActiveTab('profile')} 
            className="hidden md:flex flex-col items-end cursor-pointer group bg-card/40 hover:bg-card/80 border border-border/40 px-3 py-1 rounded-xl transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <span className="text-primary font-extrabold">LVL {stats.level}</span>
              <span className="text-[10px] text-foreground/50">({stats.currentXP}/{stats.xpToNextLevel} XP)</span>
            </div>
            <div className="w-24 mt-1">
              <Progress value={xpPercent} className="h-1.5 bg-foreground/10" />
            </div>
          </div>

          {/* Streak Badge */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold"
            title={`${stats.streakDays} Day Streak`}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>{stats.streakDays}d</span>
          </div>

          {/* Gold Balance */}
          <div 
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-colors"
            title="Gold Coins (Click to open Vault & Store)"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{stats.gold}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              stats.soundEnabled
                ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20'
                : 'bg-card/50 border-border/50 text-foreground/40 hover:text-foreground'
            }`}
            title={stats.soundEnabled ? 'Audio Effects: ON' : 'Audio Effects: MUTED'}
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Floating Companion Launcher */}
          <button
            onClick={() => setIsFloatingOpen(!isFloatingOpen)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isFloatingOpen
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30'
                : 'bg-card border-border/60 text-foreground/80 hover:border-primary/50 hover:text-foreground'
            }`}
            title="Toggle Live Floating Companion Widget"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Floating Dock</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar Strip */}
      <div className="lg:hidden border-t border-border/40 px-2 py-1.5 flex items-center justify-around overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex flex-col items-center gap-0.5 transition-all ${
                isActive ? 'text-primary font-bold bg-primary/10' : 'text-foreground/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] whitespace-nowrap">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Navbar;
