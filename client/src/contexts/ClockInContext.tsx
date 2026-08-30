import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Achievement, MemoryMilestone, ThemeOption, CosmeticItem, UserStats, DailyActivity } from '@/types/clockin';
import { soundFX } from '@/lib/audio';
import confetti from 'canvas-confetti';

const INITIAL_STATS: UserStats = {
  name: 'Hari',
  title: 'Focus Mage',
  level: 28,
  currentXP: 1543,
  xpToNextLevel: 1700,
  totalXP: 8543,
  gold: 480,
  streakDays: 15,
  totalTasksCompleted: 342,
  totalFocusMinutes: 128 * 60,
  soundEnabled: true,
  activeThemeId: 'amber-charcoal',
  selectedAvatar: '🧙‍♂️',
};

const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Finalize Clock-In Architecture & App System',
    category: 'work',
    priority: 'urgent',
    timeEstimate: '45m',
    xp: 120,
    gold: 50,
    emoji: '🚀',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    dueDate: 'Today, 6:00 PM',
    notes: 'Implement full companion app and gamification features',
  },
  {
    id: 't-2',
    title: 'Deep Work: Polish GSAP & Three.js animations',
    category: 'creative',
    priority: 'high',
    timeEstimate: '60m',
    xp: 150,
    gold: 60,
    emoji: '✨',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    dueDate: 'Today, 8:00 PM',
    notes: 'Smooth easing on floating widget and card interactions',
  },
  {
    id: 't-3',
    title: 'Gym & Mobility Session (Heavy Squats & Core)',
    category: 'health',
    priority: 'medium',
    timeEstimate: '75m',
    xp: 100,
    gold: 40,
    emoji: '💪',
    completed: true,
    completedAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    dueDate: 'Today, 5:00 PM',
    notes: 'Completed 5x5 squats and 15 min mobility drill',
  },
  {
    id: 't-4',
    title: 'Study Distributed Systems & Real-time Sync',
    category: 'study',
    priority: 'medium',
    timeEstimate: '30m',
    xp: 80,
    gold: 30,
    emoji: '📚',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    dueDate: 'Tomorrow, 10:00 AM',
    notes: 'Read chapter 4 on CRDTs and state machines',
  },
  {
    id: 't-5',
    title: 'Review Product Roadmap & Release Milestone',
    category: 'work',
    priority: 'low',
    timeEstimate: '20m',
    xp: 50,
    gold: 20,
    emoji: '🗺️',
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    dueDate: 'Tomorrow, 2:00 PM',
    notes: 'Prepare Q3 milestones and deliverables',
  },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a-first-clockin',
    title: 'First Clock-In',
    description: 'Complete your very first productivity quest',
    icon: '⚡',
    category: 'tasks',
    unlocked: true,
    unlockedAt: '2026-08-01',
    progress: 1,
    maxProgress: 1,
    rewardXP: 100,
    rewardGold: 50,
  },
  {
    id: 'a-daily-streak',
    title: 'Unstoppable Momentum',
    description: 'Maintain a 14-day consecutive active streak',
    icon: '🔥',
    category: 'streaks',
    unlocked: true,
    unlockedAt: '2026-08-28',
    progress: 15,
    maxProgress: 14,
    rewardXP: 500,
    rewardGold: 250,
  },
  {
    id: 'a-focus-master',
    title: 'Hyperfocus Master',
    description: 'Log over 100 hours of deep work focus sessions',
    icon: '🎯',
    category: 'focus',
    unlocked: true,
    unlockedAt: '2026-08-25',
    progress: 128,
    maxProgress: 100,
    rewardXP: 800,
    rewardGold: 400,
  },
  {
    id: 'a-night-owl',
    title: 'Midnight Architect',
    description: 'Clock-in and finish 5 tasks between 11 PM and 4 AM',
    icon: '🌙',
    category: 'tasks',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rewardXP: 250,
    rewardGold: 120,
  },
  {
    id: 'a-early-bird',
    title: 'Dawn Conqueror',
    description: 'Complete 3 tasks before 8:00 AM',
    icon: '🌅',
    category: 'tasks',
    unlocked: true,
    unlockedAt: '2026-08-20',
    progress: 3,
    maxProgress: 3,
    rewardXP: 300,
    rewardGold: 150,
  },
  {
    id: 'a-century-club',
    title: 'Grand Taskmaster (500)',
    description: 'Crush 500 total tasks in Clock-In',
    icon: '🏆',
    category: 'tasks',
    unlocked: false,
    progress: 342,
    maxProgress: 500,
    rewardXP: 1500,
    rewardGold: 750,
  },
  {
    id: 'a-level-30',
    title: 'Ascended Level 30',
    description: 'Attain Level 30 and unlock Grandmaster cosmetics',
    icon: '⭐',
    category: 'level',
    unlocked: false,
    progress: 28,
    maxProgress: 30,
    rewardXP: 1000,
    rewardGold: 500,
  },
  {
    id: 'a-gold-tycoon',
    title: 'Gold Tycoon',
    description: 'Accumulate 1,000 Gold Coins earned from quests',
    icon: '🪙',
    category: 'cosmetics',
    unlocked: false,
    progress: 480,
    maxProgress: 1000,
    rewardXP: 600,
    rewardGold: 300,
  },
  {
    id: 'a-theme-collector',
    title: 'Aesthetic Wizard',
    description: 'Unlock 4 or more custom workspace themes',
    icon: '🎨',
    category: 'cosmetics',
    unlocked: false,
    progress: 2,
    maxProgress: 4,
    rewardXP: 450,
    rewardGold: 200,
  },
];

const INITIAL_MEMORIES: MemoryMilestone[] = [
  {
    id: 'm-1',
    title: 'Shipped Portfolio 3.0',
    description: 'Crafted with custom shaders, responsive physics, and high typography. Received 5k+ visitors on launch day!',
    date: 'March 15, 2026',
    month: 'March',
    emoji: '🎨',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    color: 'from-amber-500/20 to-orange-600/20',
    tags: ['Design', 'Launch', 'Milestone'],
  },
  {
    id: 'm-2',
    title: 'Global AI Hackathon Champion',
    description: 'Built autonomous AI developer companion in 48 hours. Won 1st place out of 800+ international teams!',
    date: 'April 22, 2026',
    month: 'April',
    emoji: '🏆',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    color: 'from-purple-500/20 to-indigo-600/20',
    tags: ['Hackathon', 'AI', 'Victory'],
  },
  {
    id: 'm-3',
    title: '150kg Squat & Fitness Peak',
    description: 'Hit all-time PR after 6 months of disciplined linear progression and nutrition tracking.',
    date: 'May 30, 2026',
    month: 'May',
    emoji: '💪',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60',
    color: 'from-red-500/20 to-rose-600/20',
    tags: ['Fitness', 'Health', 'PR'],
  },
  {
    id: 'm-4',
    title: 'Distributed Systems Mastery',
    description: 'Completed 120 hours of deep reading on raft consensus, CRDTs, and zero-downtime database migrations.',
    date: 'June 28, 2026',
    month: 'June',
    emoji: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    color: 'from-emerald-500/20 to-green-600/20',
    tags: ['Study', 'Engineering'],
  },
  {
    id: 'm-5',
    title: 'Clock-In Design System V1',
    description: 'Designed the unified dark charcoal and amber visual identity with OKLCH color spaces and soft radii.',
    date: 'July 19, 2026',
    month: 'July',
    emoji: '🪄',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60',
    color: 'from-pink-500/20 to-rose-600/20',
    tags: ['Design System', 'UI/UX'],
  },
  {
    id: 'm-6',
    title: 'Level 28 Reached & 15-Day Streak!',
    description: 'Reached 8,500+ XP milestone. Work no longer feels burdensome—it feels like an RPG quest.',
    date: 'August 30, 2026',
    month: 'August',
    emoji: '⭐',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60',
    color: 'from-yellow-500/20 to-amber-600/20',
    tags: ['RPG Level', 'Streak'],
  },
];

export const THEMES: ThemeOption[] = [
  {
    id: 'amber-charcoal',
    name: 'Amber Charcoal (Default)',
    description: 'Deep midnight charcoal with vibrant warm amber XP glow',
    previewColor: 'from-amber-500 to-yellow-600',
    emoji: '✨',
    primaryOklch: '0.65 0.2 60',
    accentOklch: '0.65 0.2 60',
    bgOklch: '0.08 0.01 280',
    cardOklch: '0.12 0.01 280',
    textOklch: '0.92 0.01 80',
    borderOklch: '0.2 0.01 280',
    unlockLevel: 1,
    costGold: 0,
    isUnlocked: true,
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'High-voltage electric magenta and cyber cyan for night owls',
    previewColor: 'from-fuchsia-600 to-cyan-500',
    emoji: '🤖',
    primaryOklch: '0.7 0.28 320',
    accentOklch: '0.75 0.22 200',
    bgOklch: '0.07 0.03 290',
    cardOklch: '0.12 0.04 290',
    textOklch: '0.95 0.02 300',
    borderOklch: '0.25 0.05 310',
    unlockLevel: 5,
    costGold: 150,
    isUnlocked: true,
  },
  {
    id: 'forest-realm',
    name: 'Forest Realm',
    description: 'Serene emerald and pine botanicals for calm, grounded focus',
    previewColor: 'from-emerald-500 to-green-700',
    emoji: '🌲',
    primaryOklch: '0.65 0.2 150',
    accentOklch: '0.7 0.18 140',
    bgOklch: '0.08 0.02 150',
    cardOklch: '0.12 0.025 150',
    textOklch: '0.92 0.02 130',
    borderOklch: '0.2 0.03 150',
    unlockLevel: 10,
    costGold: 250,
    isUnlocked: false,
  },
  {
    id: 'oceanic-deep',
    name: 'Oceanic Abyssal',
    description: 'Submerged navy blue with bioluminescent cyan accents',
    previewColor: 'from-blue-600 to-cyan-400',
    emoji: '🌊',
    primaryOklch: '0.65 0.19 230',
    accentOklch: '0.75 0.17 210',
    bgOklch: '0.07 0.02 240',
    cardOklch: '0.11 0.03 240',
    textOklch: '0.92 0.01 220',
    borderOklch: '0.2 0.02 240',
    unlockLevel: 15,
    costGold: 300,
    isUnlocked: false,
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    description: 'Fiery crimson and sunburst orange for intense energy',
    previewColor: 'from-red-500 to-orange-500',
    emoji: '🔥',
    primaryOklch: '0.65 0.24 35',
    accentOklch: '0.7 0.22 45',
    bgOklch: '0.08 0.02 25',
    cardOklch: '0.13 0.025 30',
    textOklch: '0.94 0.01 50',
    borderOklch: '0.22 0.03 30',
    unlockLevel: 20,
    costGold: 400,
    isUnlocked: false,
  },
  {
    id: 'velvet-royal',
    name: 'Velvet Royal',
    description: 'Regal amethyst purple with radiant lavender highlights',
    previewColor: 'from-purple-600 to-violet-400',
    emoji: '👑',
    primaryOklch: '0.65 0.23 290',
    accentOklch: '0.75 0.18 300',
    bgOklch: '0.08 0.02 285',
    cardOklch: '0.12 0.03 285',
    textOklch: '0.94 0.01 280',
    borderOklch: '0.22 0.03 285',
    unlockLevel: 25,
    costGold: 450,
    isUnlocked: false,
  },
  {
    id: 'midnight-eclipse',
    name: 'Midnight Eclipse',
    description: 'Pure OLED black with cold titanium accents',
    previewColor: 'from-zinc-700 to-zinc-900',
    emoji: '🌑',
    primaryOklch: '0.75 0.01 250',
    accentOklch: '0.85 0.01 250',
    bgOklch: '0.02 0 0',
    cardOklch: '0.07 0 0',
    textOklch: '0.92 0 0',
    borderOklch: '0.15 0 0',
    unlockLevel: 28,
    costGold: 500,
    isUnlocked: false,
  },
  {
    id: 'retro-arcade',
    name: 'Retro Arcade 8-Bit',
    description: 'High saturated arcade synthwave with lime green & hot pink',
    previewColor: 'from-lime-400 to-fuchsia-500',
    emoji: '👾',
    primaryOklch: '0.75 0.25 130',
    accentOklch: '0.7 0.28 330',
    bgOklch: '0.06 0.02 120',
    cardOklch: '0.11 0.03 130',
    textOklch: '0.95 0.02 110',
    borderOklch: '0.25 0.05 130',
    unlockLevel: 30,
    costGold: 600,
    isUnlocked: false,
  },
];

export const COSMETICS: CosmeticItem[] = [
  { id: 'c-wiz', name: 'Focus Mage Avatar', category: 'avatar', icon: '🧙‍♂️', description: 'Master of deep arcane focus', costGold: 0, isUnlocked: true },
  { id: 'c-ninja', name: 'Task Shinobi Avatar', category: 'avatar', icon: '🥷', description: 'Silent execution, zero friction', costGold: 100, isUnlocked: true },
  { id: 'c-cyber', name: 'Cyborg 2077 Avatar', category: 'avatar', icon: '🤖', description: 'Upgraded neural productivity chips', costGold: 150, isUnlocked: false },
  { id: 'c-dragon', name: 'Cosmic Dragon Avatar', category: 'avatar', icon: '🐉', description: 'Legendary aura for high streaks', costGold: 300, isUnlocked: false },
  { id: 'c-sound-arcade', name: '8-Bit Synth Soundpack', category: 'sound', icon: '🎵', description: 'Retro chimes for completing tasks', costGold: 200, isUnlocked: false },
  { id: 'c-sound-zen', name: 'Zen Garden Soundpack', category: 'sound', icon: '🎐', description: 'Calming wind chime and gong frequencies', costGold: 200, isUnlocked: false },
  { id: 'c-part-gold', name: 'Golden Star Particles', category: 'particle', icon: '✨', description: 'Gold sparkle bursts on mouse move', costGold: 250, isUnlocked: false },
  { id: 'c-badge-titan', name: 'Titan Guild Badge', category: 'badge', icon: '🛡️', description: 'Special prestige profile insignia', costGold: 350, isUnlocked: false },
];

export const DAILY_ACTIVITY: DailyActivity[] = [
  { day: 'Mon', tasksCompleted: 6, xpEarned: 480, focusMinutes: 180 },
  { day: 'Tue', tasksCompleted: 8, xpEarned: 620, focusMinutes: 240 },
  { day: 'Wed', tasksCompleted: 5, xpEarned: 390, focusMinutes: 150 },
  { day: 'Thu', tasksCompleted: 9, xpEarned: 710, focusMinutes: 270 },
  { day: 'Fri', tasksCompleted: 7, xpEarned: 540, focusMinutes: 210 },
  { day: 'Sat', tasksCompleted: 4, xpEarned: 320, focusMinutes: 120 },
  { day: 'Sun', tasksCompleted: 8, xpEarned: 680, focusMinutes: 260 },
];

interface ClockInContextType {
  stats: UserStats;
  tasks: Task[];
  achievements: Achievement[];
  memories: MemoryMilestone[];
  themes: ThemeOption[];
  cosmetics: CosmeticItem[];
  dailyActivity: DailyActivity[];
  activeTab: 'showcase' | 'workspace' | 'focus' | 'profile' | 'memories' | 'store';
  isFloatingOpen: boolean;
  levelUpModal: { show: boolean; level: number; title: string; rewardGold: number } | null;
  setActiveTab: (tab: 'showcase' | 'workspace' | 'focus' | 'profile' | 'memories' | 'store') => void;
  setIsFloatingOpen: (open: boolean) => void;
  closeLevelUpModal: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  logFocusSession: (minutes: number) => void;
  applyTheme: (themeId: string) => void;
  unlockTheme: (themeId: string) => boolean;
  unlockCosmetic: (cosmeticId: string) => boolean;
  selectAvatar: (avatarIcon: string) => void;
  toggleSound: () => void;
  addMemory: (memory: Omit<MemoryMilestone, 'id'>) => void;
  resetToDefaults: () => void;
}

const ClockInContext = createContext<ClockInContextType | null>(null);

export function ClockInProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('clockin_user_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('clockin_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('clockin_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [memories, setMemories] = useState<MemoryMilestone[]>(() => {
    const saved = localStorage.getItem('clockin_memories');
    return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
  });

  const [themes, setThemes] = useState<ThemeOption[]>(() => {
    const saved = localStorage.getItem('clockin_themes');
    return saved ? JSON.parse(saved) : THEMES;
  });

  const [cosmetics, setCosmetics] = useState<CosmeticItem[]>(() => {
    const saved = localStorage.getItem('clockin_cosmetics');
    return saved ? JSON.parse(saved) : COSMETICS;
  });

  const [activeTab, setActiveTab] = useState<'showcase' | 'workspace' | 'focus' | 'profile' | 'memories' | 'store'>('showcase');
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [levelUpModal, setLevelUpModal] = useState<{ show: boolean; level: number; title: string; rewardGold: number } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('clockin_user_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('clockin_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('clockin_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('clockin_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('clockin_themes', JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem('clockin_cosmetics', JSON.stringify(cosmetics));
  }, [cosmetics]);

  // Apply active theme CSS variables to document root
  useEffect(() => {
    const currentTheme = themes.find((t) => t.id === stats.activeThemeId) || themes[0];
    const root = document.documentElement;

    root.style.setProperty('--primary', `oklch(${currentTheme.primaryOklch})`);
    root.style.setProperty('--accent', `oklch(${currentTheme.accentOklch})`);
    root.style.setProperty('--background', `oklch(${currentTheme.bgOklch})`);
    root.style.setProperty('--card', `oklch(${currentTheme.cardOklch})`);
    root.style.setProperty('--popover', `oklch(${currentTheme.cardOklch})`);
    root.style.setProperty('--foreground', `oklch(${currentTheme.textOklch})`);
    root.style.setProperty('--card-foreground', `oklch(${currentTheme.textOklch})`);
    root.style.setProperty('--border', `oklch(${currentTheme.borderOklch})`);
    root.style.setProperty('--ring', `oklch(${currentTheme.primaryOklch})`);
    root.style.setProperty('--sidebar-primary', `oklch(${currentTheme.primaryOklch})`);
  }, [stats.activeThemeId, themes]);

  // Handle XP & Leveling logic
  const grantRewards = (xpEarned: number, goldEarned: number) => {
    setStats((prev) => {
      let newCurrentXP = prev.currentXP + xpEarned;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;
      let newTotalXP = prev.totalXP + xpEarned;
      let newGold = prev.gold + goldEarned;
      let leveledUp = false;

      while (newCurrentXP >= newXpToNext) {
        newCurrentXP -= newXpToNext;
        newLevel += 1;
        newXpToNext = Math.floor(100 * Math.pow(1.15, newLevel));
        newGold += 100; // Bonus gold for leveling up
        leveledUp = true;
      }

      if (leveledUp) {
        const titles = ['Focus Novice', 'Quest Seeker', 'Task Vanguard', 'Hyperfocus Apprentice', 'Flow Specialist', 'Focus Mage', 'Grandmaster Overlord'];
        const titleIdx = Math.min(Math.floor(newLevel / 5), titles.length - 1);
        const newTitle = titles[titleIdx];

        if (prev.soundEnabled) {
          soundFX.playLevelUp();
        }

        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f5a623', '#ffd700', '#ff5722', '#00e5ff'],
        });

        setLevelUpModal({
          show: true,
          level: newLevel,
          title: newTitle,
          rewardGold: 100,
        });

        return {
          ...prev,
          level: newLevel,
          title: newTitle,
          currentXP: newCurrentXP,
          xpToNextLevel: newXpToNext,
          totalXP: newTotalXP,
          gold: newGold,
        };
      }

      return {
        ...prev,
        currentXP: newCurrentXP,
        totalXP: newTotalXP,
        gold: newGold,
      };
    });
  };

  const checkAchievements = (completedTasksCount: number, focusHours: number) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.unlocked) return ach;
        let shouldUnlock = false;
        let currentProg = ach.progress;

        if (ach.id === 'a-century-club') {
          currentProg = completedTasksCount;
          if (currentProg >= ach.maxProgress) shouldUnlock = true;
        } else if (ach.id === 'a-focus-master') {
          currentProg = Math.floor(focusHours);
          if (currentProg >= ach.maxProgress) shouldUnlock = true;
        }

        if (shouldUnlock) {
          grantRewards(ach.rewardXP, ach.rewardGold);
          return {
            ...ach,
            unlocked: true,
            unlockedAt: new Date().toISOString().split('T')[0],
            progress: ach.maxProgress,
          };
        }

        return { ...ach, progress: currentProg };
      })
    );
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed' | 'completedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    if (stats.soundEnabled) soundFX.playClick();
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const willBeCompleted = !t.completed;

        if (willBeCompleted) {
          if (stats.soundEnabled) {
            soundFX.playTaskComplete();
            soundFX.playXpPop();
          }
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#f5a623', '#ffd700', '#4ade80'],
          });
          grantRewards(t.xp, t.gold);
          setStats((s) => {
            const nextCompleted = s.totalTasksCompleted + 1;
            checkAchievements(nextCompleted, s.totalFocusMinutes / 60);
            return {
              ...s,
              totalTasksCompleted: nextCompleted,
            };
          });

          return {
            ...t,
            completed: true,
            completedAt: new Date().toISOString(),
          };
        } else {
          return {
            ...t,
            completed: false,
            completedAt: undefined,
          };
        }
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (stats.soundEnabled) soundFX.playClick();
  };

  const logFocusSession = (minutes: number) => {
    const xpReward = Math.floor(minutes * 4);
    const goldReward = Math.floor(minutes * 1.5);
    grantRewards(xpReward, goldReward);

    setStats((prev) => {
      const nextFocus = prev.totalFocusMinutes + minutes;
      checkAchievements(prev.totalTasksCompleted, nextFocus / 60);
      return {
        ...prev,
        totalFocusMinutes: nextFocus,
      };
    });

    if (stats.soundEnabled) {
      soundFX.playTaskComplete();
    }
  };

  const applyTheme = (themeId: string) => {
    const targetTheme = themes.find((t) => t.id === themeId);
    if (!targetTheme || !targetTheme.isUnlocked) return;
    setStats((prev) => ({ ...prev, activeThemeId: themeId }));
    if (stats.soundEnabled) soundFX.playClick();
  };

  const unlockTheme = (themeId: string): boolean => {
    const targetTheme = themes.find((t) => t.id === themeId);
    if (!targetTheme || targetTheme.isUnlocked) return false;
    if (stats.gold < targetTheme.costGold) return false;

    setStats((prev) => ({ ...prev, gold: prev.gold - targetTheme.costGold }));
    setThemes((prev) =>
      prev.map((t) => (t.id === themeId ? { ...t, isUnlocked: true } : t))
    );
    if (stats.soundEnabled) soundFX.playTaskComplete();
    return true;
  };

  const unlockCosmetic = (cosmeticId: string): boolean => {
    const item = cosmetics.find((c) => c.id === cosmeticId);
    if (!item || item.isUnlocked) return false;
    if (stats.gold < item.costGold) return false;

    setStats((prev) => ({ ...prev, gold: prev.gold - item.costGold }));
    setCosmetics((prev) =>
      prev.map((c) => (c.id === cosmeticId ? { ...c, isUnlocked: true } : c))
    );
    if (stats.soundEnabled) soundFX.playTaskComplete();
    return true;
  };

  const selectAvatar = (avatarIcon: string) => {
    setStats((prev) => ({ ...prev, selectedAvatar: avatarIcon }));
    if (stats.soundEnabled) soundFX.playClick();
  };

  const toggleSound = () => {
    setStats((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const addMemory = (memoryData: Omit<MemoryMilestone, 'id'>) => {
    const newMemory: MemoryMilestone = {
      ...memoryData,
      id: `mem-${Date.now()}`,
    };
    setMemories((prev) => [newMemory, ...prev]);
    grantRewards(150, 50);
    if (stats.soundEnabled) soundFX.playTaskComplete();
  };

  const closeLevelUpModal = () => {
    setLevelUpModal(null);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setStats(INITIAL_STATS);
    setTasks(INITIAL_TASKS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setMemories(INITIAL_MEMORIES);
    setThemes(THEMES);
    setCosmetics(COSMETICS);
    if (stats.soundEnabled) soundFX.playClick();
  };

  return (
    <ClockInContext.Provider
      value={{
        stats,
        tasks,
        achievements,
        memories,
        themes,
        cosmetics,
        dailyActivity: DAILY_ACTIVITY,
        activeTab,
        isFloatingOpen,
        levelUpModal,
        setActiveTab,
        setIsFloatingOpen,
        closeLevelUpModal,
        addTask,
        toggleTask,
        deleteTask,
        logFocusSession,
        applyTheme,
        unlockTheme,
        unlockCosmetic,
        selectAvatar,
        toggleSound,
        addMemory,
        resetToDefaults,
      }}
    >
      {children}
    </ClockInContext.Provider>
  );
}

export function useClockIn() {
  const context = useContext(ClockInContext);
  if (!context) {
    throw new Error('useClockIn must be used within a ClockInProvider');
  }
  return context;
}
