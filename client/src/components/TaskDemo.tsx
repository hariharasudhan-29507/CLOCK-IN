import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';

interface Task {
  id: number;
  title: string;
  time: string;
  xp: number;
  emoji: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, title: 'Finish Portfolio', time: 'Today 6 PM', xp: 80, emoji: '🎨', completed: false },
  { id: 2, title: 'Learn GSAP', time: 'Today 8 PM', xp: 120, emoji: '📚', completed: false },
  { id: 3, title: 'Gym Session', time: 'Today 5 PM', xp: 100, emoji: '💪', completed: false },
];

export function TaskDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedCount, setCompletedCount] = useState(0);
  const [showXP, setShowXP] = useState<{ id: number; xp: number } | null>(null);
  const [totalXP, setTotalXP] = useState(0);

  const handleCompleteTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // Update task
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
    setCompletedCount(prev => prev + 1);
    setTotalXP(prev => prev + task.xp);

    // Show XP pop
    setShowXP({ id: taskId, xp: task.xp });
    setTimeout(() => setShowXP(null), 1500);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f5a623', '#ffd700', '#ffed4e'],
    });
  };

  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-subheading text-foreground">Today's Progress</h3>
          <span className="text-lg font-bold text-primary">{completedCount}/{tasks.length}</span>
        </div>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Progress value={progress} className="h-2" />
        </motion.div>
        <div className="flex items-center justify-between text-sm text-foreground/60">
          <span>Total XP Earned</span>
          <motion.span
            key={totalXP}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-semibold text-primary"
          >
            +{totalXP} XP
          </motion.span>
        </div>
      </motion.div>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        <AnimatePresence>
          {tasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.button
                onClick={() => handleCompleteTask(task.id)}
                disabled={task.completed}
                className={`w-full p-4 rounded-lg border transition-all duration-300 text-left group ${
                  task.completed
                    ? 'bg-primary/10 border-primary/30 opacity-60'
                    : 'card-solid hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
                }`}
                whileHover={!task.completed ? { y: -4 } : {}}
                whileTap={!task.completed ? { scale: 0.98 } : {}}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <motion.div
                    className="flex-shrink-0 mt-1"
                    initial={false}
                    animate={task.completed ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {task.completed ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center"
                      >
                        <span className="text-sm text-primary-foreground">✓</span>
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rounded-lg border-2 border-foreground/20 group-hover:border-primary/50 transition-colors" />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{task.emoji}</span>
                      <h4 className={`font-semibold ${task.completed ? 'line-through text-foreground/40' : 'text-foreground'}`}>
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/60">{task.time}</p>
                  </div>

                  {/* XP Badge */}
                  <motion.div
                    className="flex-shrink-0 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm"
                    whileHover={!task.completed ? { scale: 1.05 } : {}}
                  >
                    +{task.xp} XP
                  </motion.div>
                </div>
              </motion.button>

              {/* XP Pop Animation */}
              <AnimatePresence>
                {showXP?.id === task.id && (
                  <motion.div
                    className="absolute top-0 right-4 text-2xl font-bold text-primary pointer-events-none"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -60 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    +{showXP.xp} XP
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {completedCount === tasks.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-center"
          >
            <motion.p
              className="text-lg font-semibold text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🎉 Amazing! You finished everything today!
            </motion.p>
            <p className="text-sm text-foreground/60 mt-2">
              You earned {totalXP} XP and leveled up your progress!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Button */}
      {completedCount === tasks.length && (
        <motion.button
          onClick={() => {
            setTasks(initialTasks);
            setCompletedCount(0);
            setTotalXP(0);
          }}
          className="w-full py-2 px-4 rounded-lg bg-foreground/10 hover:bg-foreground/20 text-foreground font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset Demo
        </motion.button>
      )}
    </div>
  );
}

export default TaskDemo;
