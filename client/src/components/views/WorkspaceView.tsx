import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Check, 
  Trash2, 
  Flame, 
  Sparkles, 
  Coins, 
  Clock, 
  Calendar, 
  Tag, 
  AlertCircle,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TaskCategory, TaskPriority } from '@/types/clockin';

export function WorkspaceView() {
  const { tasks, addTask, toggleTask, deleteTask, stats } = useClockIn();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [timeEstimate, setTimeEstimate] = useState('30m');
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('🎯');

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.notes && t.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || t.priority === selectedPriority;
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && !t.completed) || 
      (filterStatus === 'completed' && t.completed);

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Calculate XP and Gold reward based on priority
    const priorityRewards: Record<TaskPriority, { xp: number; gold: number }> = {
      urgent: { xp: 180, gold: 80 },
      high: { xp: 120, gold: 50 },
      medium: { xp: 80, gold: 30 },
      low: { xp: 40, gold: 15 },
    };

    addTask({
      title: title.trim(),
      category,
      priority,
      timeEstimate,
      xp: priorityRewards[priority].xp,
      gold: priorityRewards[priority].gold,
      emoji: emoji || '🎯',
      notes: notes.trim(),
      dueDate: 'Today, 6:00 PM',
    });

    setTitle('');
    setNotes('');
    setIsNewTaskOpen(false);
  };

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'urgent':
        return <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[10px] font-extrabold uppercase border border-red-500/30">Urgent</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase border border-blue-500/30">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 rounded-md bg-zinc-500/20 text-zinc-400 text-[10px] font-extrabold uppercase border border-zinc-500/30">Low</span>;
    }
  };

  const getCategoryEmoji = (c: TaskCategory) => {
    switch (c) {
      case 'work': return '💼 Work';
      case 'study': return '📚 Study';
      case 'health': return '💪 Health';
      case 'creative': return '🎨 Creative';
      case 'general': return '📌 General';
    }
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Quest Momentum Card */}
        <div className="md:col-span-2 card-solid p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase">Active Quest Command</span>
              <h2 className="text-2xl font-extrabold text-foreground mt-1">Daily Task Horizon</h2>
              <p className="text-xs text-foreground/60 mt-1">
                Every checked box feeds your character stats and levels up your progress.
              </p>
            </div>
            <div className="text-3xl">⚔️</div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-foreground/70">Daily Quest Completion</span>
              <span className="text-primary font-bold">{completedCount} of {totalCount} ({progressPercent}%)</span>
            </div>
            <Progress value={progressPercent} className="h-2.5" />
          </div>
        </div>

        {/* Total Available XP */}
        <div className="card-solid p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground/60 uppercase">Available Bounty</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary">
              +{tasks.filter((t) => !t.completed).reduce((acc, t) => acc + t.xp, 0)} XP
            </div>
            <p className="text-xs text-foreground/50 mt-1">{activeCount} pending quests to claim</p>
          </div>
        </div>

        {/* Gold In Scope */}
        <div className="card-solid p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground/60 uppercase">Gold Rewards</span>
            <Coins className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-300">
              +{tasks.filter((t) => !t.completed).reduce((acc, t) => acc + t.gold, 0)} 🪙
            </div>
            <p className="text-xs text-foreground/50 mt-1">Spendable in the Cosmetics Vault</p>
          </div>
        </div>
      </div>

      {/* Control Strip & Filters */}
      <div className="card-solid p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests or notes..."
              className="w-full pl-9 pr-4 py-2 bg-background/50 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* New Task Button */}
          <Button
            onClick={() => setIsNewTaskOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 py-2 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Quest</span>
          </Button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-background/40 p-1 rounded-lg border border-border/40">
            {(['all', 'active', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-md font-semibold capitalize transition-all ${
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-foreground/40 font-medium mr-1">Category:</span>
            {['all', 'work', 'study', 'health', 'creative'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-semibold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary/20 text-primary border border-primary/40'
                    : 'bg-card/40 text-foreground/60 border border-border/30 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-foreground/70 uppercase tracking-wider flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-primary" />
            <span>Quests ({filteredTasks.length})</span>
          </h3>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="card-solid p-12 text-center space-y-3">
            <div className="text-4xl">📜</div>
            <h4 className="text-lg font-bold text-foreground">No Quests Match Filter</h4>
            <p className="text-sm text-foreground/60 max-w-sm mx-auto">
              Clear your search filters or summon a new productivity quest to start earning XP!
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPriority('all');
                setFilterStatus('all');
              }}
              variant="outline"
              className="mt-2 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                    task.completed
                      ? 'bg-card/30 border-border/30 opacity-70'
                      : 'card-solid hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10'
                  }`}
                >
                  {/* Custom Completion Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/30'
                        : 'border-foreground/30 hover:border-primary bg-background/50'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  {/* Task Icon & Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xl">{task.emoji}</span>
                      <h4
                        className={`text-base font-bold tracking-tight ${
                          task.completed ? 'line-through text-foreground/40' : 'text-foreground'
                        }`}
                      >
                        {task.title}
                      </h4>
                      {getPriorityBadge(task.priority)}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-foreground/5 border border-border/40 text-foreground/60 font-semibold">
                        {getCategoryEmoji(task.category)}
                      </span>
                    </div>

                    {task.notes && (
                      <p className={`text-xs mt-1 ${task.completed ? 'text-foreground/30' : 'text-foreground/60'}`}>
                        {task.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-2 text-[11px] text-foreground/50">
                      {task.timeEstimate && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-foreground/40" />
                          {task.timeEstimate}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-foreground/40" />
                          {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rewards & Delete Action */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                        +{task.xp} XP
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
                        +{task.gold} 🪙
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-lg text-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete Quest"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* New Task Modal */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg card-solid border border-primary/40 shadow-2xl p-6 rounded-2xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Summon New Quest</h3>
                <p className="text-xs text-foreground/60">Configure your task objective and rewards</p>
              </div>
              <span className="text-2xl">{emoji}</span>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-foreground/80 mb-1">Quest Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build WebGL Starfield Shader..."
                  className="w-full px-3.5 py-2.5 bg-background/60 border border-border/60 rounded-xl text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Category, Priority & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="work">💼 Work</option>
                    <option value="study">📚 Study</option>
                    <option value="health">💪 Health</option>
                    <option value="creative">🎨 Creative</option>
                    <option value="general">📌 General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  >
                    <option value="urgent">🔥 Urgent (+180 XP)</option>
                    <option value="high">⚡ High (+120 XP)</option>
                    <option value="medium">🎯 Medium (+80 XP)</option>
                    <option value="low">☕ Low (+40 XP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Time Estimate</label>
                  <input
                    type="text"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                    placeholder="e.g. 45m"
                    className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Emoji & Notes */}
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Emoji Icon</label>
                  <input
                    type="text"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="w-full text-center text-lg px-2 py-1.5 bg-background/60 border border-border/60 rounded-xl outline-none focus:border-primary"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-foreground/80 mb-1">Notes / Sub-steps</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional details or key goals..."
                    className="w-full px-3 py-2 bg-background/60 border border-border/60 rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewTaskOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  Add Quest
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default WorkspaceView;
