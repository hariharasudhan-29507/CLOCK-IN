import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Plus, 
  Circle, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  Flame, 
  Check, 
  ChevronRight,
  GripHorizontal
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TaskCategory, TaskPriority } from '@/types/clockin';

export function FloatingWidgetOverlay() {
  const { 
    isFloatingOpen, 
    setIsFloatingOpen, 
    stats, 
    tasks, 
    toggleTask, 
    addTask, 
    setActiveTab 
  } = useClockIn();

  const [isMinimized, setIsMinimized] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!isFloatingOpen) return null;

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    addTask({
      title: quickTitle.trim(),
      category: 'work',
      priority: 'high',
      xp: 80,
      gold: 30,
      emoji: '⚡',
      notes: 'Added from Floating Dock',
    });
    setQuickTitle('');
    setIsAdding(false);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 50 }}
      className="fixed bottom-6 right-6 z-50 select-none cursor-default"
      style={{ touchAction: 'none' }}
    >
      <div className="relative w-80 sm:w-96 card-solid border border-primary/40 shadow-2xl shadow-primary/20 rounded-2xl overflow-hidden backdrop-blur-2xl">
        {/* Header with drag handle */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/90 cursor-move">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="font-bold text-sm text-foreground tracking-tight">Clock-In Dock</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-bold">
              LVL {stats.level}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsFloatingOpen(false)}
              className="p-1 rounded-lg hover:bg-destructive/20 text-foreground/60 hover:text-destructive transition-colors"
              title="Close Dock"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimized View */}
        {isMinimized ? (
          <div className="p-3 flex items-center justify-between bg-background/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">{stats.selectedAvatar || '🧙‍♂️'}</span>
              <div>
                <p className="text-xs font-bold text-foreground">
                  {completedTasks.length}/{totalTasks} Completed
                </p>
                <p className="text-[10px] text-primary font-semibold">{progressPercent}% Progress</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(false)}
              className="text-xs text-primary font-bold hover:underline flex items-center"
            >
              View Quests <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          /* Expanded Body */
          <div className="p-4 space-y-4 max-h-[460px] overflow-y-auto bg-background/40">
            {/* Greeting & Streak */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-foreground/60 font-medium">👋 {greeting},</p>
                <h4 className="text-base font-extrabold text-foreground tracking-tight">{stats.name}</h4>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{stats.streakDays}d Streak</span>
              </div>
            </div>

            {/* Today's Progress Bar */}
            <div className="space-y-1.5 p-3 rounded-xl bg-card/60 border border-border/40">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground/70">Today's Momentum</span>
                <span className="font-bold text-primary">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <div className="flex items-center justify-between text-[10px] text-foreground/50 pt-0.5">
                <span>{completedTasks.length} done</span>
                <span>{activeTasks.length} remaining</span>
              </div>
            </div>

            {/* Focus Tasks List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Active Quests</p>
                <button
                  onClick={() => setActiveTab('workspace')}
                  className="text-[10px] text-primary font-semibold hover:underline"
                >
                  Full Board &rarr;
                </button>
              </div>

              {activeTasks.length === 0 ? (
                <div className="p-4 text-center rounded-xl bg-card/40 border border-border/30">
                  <p className="text-sm font-semibold text-primary">🎉 All quests crushed!</p>
                  <p className="text-xs text-foreground/50 mt-0.5">Enjoy your momentum or add a new task.</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeTasks.slice(0, 4).map((task) => (
                    <motion.div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-card/50 hover:bg-card border border-border/40 hover:border-primary/40 transition-all cursor-pointer group"
                    >
                      <button className="flex-shrink-0 w-5 h-5 rounded-lg border-2 border-foreground/30 group-hover:border-primary flex items-center justify-center transition-colors">
                        <Check className="w-3 h-3 text-transparent group-hover:text-primary/50" />
                      </button>
                      <span className="text-base">{task.emoji}</span>
                      <span className="text-xs font-medium text-foreground flex-1 truncate">
                        {task.title}
                      </span>
                      <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                        +{task.xp} XP
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Add Task Input */}
            {isAdding ? (
              <form onSubmit={handleQuickAdd} className="flex gap-2">
                <input
                  type="text"
                  autoFocus
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="New quest title..."
                  className="flex-1 bg-card/80 border border-primary/50 text-foreground text-xs rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="p-2 rounded-xl bg-card border border-border/50 text-foreground/60 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all border border-primary/20 hover:border-primary/40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add Task</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default FloatingWidgetOverlay;
