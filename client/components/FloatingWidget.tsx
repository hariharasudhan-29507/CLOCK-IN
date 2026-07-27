import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Circle, Minus, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function FloatingWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const tasks = [
    { id: 1, title: 'Finish Portfolio', completed: false, emoji: '🎨' },
    { id: 2, title: 'Learn GSAP', completed: false, emoji: '📚' },
    { id: 3, title: 'Gym', completed: true, emoji: '💪' },
  ];

  return (
    <motion.div
      className="relative w-full max-w-sm"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Container */}
      <div className="card-solid overflow-hidden shadow-2xl shadow-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h3 className="font-semibold text-foreground">Clock-In</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-foreground/20" />
            <X className="w-4 h-4 text-foreground/40 cursor-pointer hover:text-foreground/60" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-foreground/70">👋 Good Evening Hari</p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground/60">Today</span>
              <span className="text-xs font-semibold text-primary">67%</span>
            </div>
            <Progress value={67} className="h-1.5" />
          </motion.div>

          {/* Today's Focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-xs font-semibold text-foreground/70">Today's Focus</p>
            <div className="space-y-2">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-card/50 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    {task.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                      >
                        <span className="text-xs text-primary-foreground">✓</span>
                      </motion.div>
                    ) : (
                      <Circle className="w-4 h-4 text-foreground/30" />
                    )}
                  </div>
                  <span className={`text-xs flex-1 ${task.completed ? 'line-through text-foreground/40' : 'text-foreground/70'}`}>
                    {task.title}
                  </span>
                  <span className="text-sm">{task.emoji}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* New Task Button */}
          <motion.button
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Plus className="w-4 h-4" />
            New Task
          </motion.button>
        </div>
      </div>

      {/* Glow Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/5 blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

export default FloatingWidget;
