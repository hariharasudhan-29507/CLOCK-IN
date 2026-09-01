export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export type TaskCategory = 'work' | 'study' | 'health' | 'creative' | 'general';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  timeEstimate?: string;
  xp: number;
  gold: number;
  emoji: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  dueDate?: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'tasks' | 'streaks' | 'focus' | 'level' | 'cosmetics';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  rewardXP: number;
  rewardGold: number;
}

export interface MemoryMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  month: string;
  emoji: string;
  imageUrl?: string;
  color: string;
  tags: string[];
}

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  previewColor: string;
  emoji: string;
  primaryOklch: string;
  accentOklch: string;
  bgOklch: string;
  cardOklch: string;
  textOklch: string;
  borderOklch: string;
  unlockLevel: number;
  costGold: number;
  isUnlocked: boolean;
}

export interface CosmeticItem {
  id: string;
  name: string;
  category: 'avatar' | 'sound' | 'particle' | 'badge';
  icon: string;
  description: string;
  costGold: number;
  isUnlocked: boolean;
}

export interface UserStats {
  name: string;
  title: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  gold: number;
  streakDays: number;
  totalTasksCompleted: number;
  totalFocusMinutes: number;
  soundEnabled: boolean;
  activeThemeId: string;
  selectedAvatar: string;
}

export interface DailyActivity {
  day: string;
  tasksCompleted: number;
  xpEarned: number;
  focusMinutes: number;
}
