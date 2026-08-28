import React from 'react';
import { motion } from 'framer-motion';

const memories = [
  { id: 1, month: 'March', title: 'Finished Portfolio', emoji: '🎨', color: 'from-blue-500/20 to-blue-600/20' },
  { id: 2, month: 'April', title: 'Hackathon Victory', emoji: '🏆', color: 'from-purple-500/20 to-purple-600/20' },
  { id: 3, month: 'May', title: 'Gym Milestone', emoji: '💪', color: 'from-red-500/20 to-red-600/20' },
  { id: 4, month: 'June', title: 'Learning Spree', emoji: '📚', color: 'from-green-500/20 to-green-600/20' },
  { id: 5, month: 'July', title: 'Design System', emoji: '🎨', color: 'from-pink-500/20 to-pink-600/20' },
  { id: 6, month: 'August', title: 'Level 30!', emoji: '⭐', color: 'from-yellow-500/20 to-yellow-600/20' },
];

export function MemoryTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-heading text-foreground mb-2">Photo Memories</h2>
          <p className="text-foreground/60">See your progress, not your failures</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {memories.map((memory, idx) => (
            <motion.div
              key={memory.id}
              variants={itemVariants}
              className="flex gap-6 items-start"
            >
              {/* Timeline Marker */}
              <div className="flex flex-col items-center flex-shrink-0">
                <motion.div
                  className="w-4 h-4 rounded-full bg-primary"
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.2 }}
                />
                {idx < memories.length - 1 && (
                  <div className="w-0.5 h-24 bg-gradient-to-b from-primary/50 to-primary/10 mt-4" />
                )}
              </div>

              {/* Content Card */}
              <motion.div
                className={`flex-1 p-6 rounded-lg bg-gradient-to-br ${memory.color} border border-border/50 card-solid`}
                whileHover={{ x: 8, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{memory.month}</p>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{memory.title}</h3>
                  </div>
                  <div className="text-3xl">{memory.emoji}</div>
                </div>
                <p className="text-sm text-foreground/60">
                  A milestone in your journey. Every step forward counts.
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center p-8 rounded-lg bg-primary/10 border border-primary/30"
        >
          <p className="text-foreground/80 font-medium">
            Every completed task becomes a memory. Build your visual story of growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default MemoryTimeline;
