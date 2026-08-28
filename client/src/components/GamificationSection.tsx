import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

const achievements = [
  { id: 1, name: 'Daily Streak', icon: '🔥', unlocked: true },
  { id: 2, name: 'Focus Master', icon: '🎯', unlocked: true },
  { id: 3, name: 'Night Owl', icon: '🌙', unlocked: false },
  { id: 4, name: 'Early Bird', icon: '🌅', unlocked: true },
  { id: 5, name: '100 Tasks', icon: '✅', unlocked: false },
  { id: 6, name: 'Level 10', icon: '⭐', unlocked: true },
];

export function GamificationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-heading text-foreground mb-2">Your Profile</h2>
            <p className="text-foreground/60">Progress made visible</p>
          </div>

          {/* Profile Card */}
          <div className="card-solid p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-1">Hari</h3>
                <p className="text-primary font-semibold">Focus Mage</p>
              </div>
              <div className="text-5xl">✨</div>
            </div>

            {/* Level and XP */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">Level 28</span>
                <span className="text-sm text-foreground/60">1543 / 1700 XP</span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ originX: 0 }}
              >
                <Progress value={91} className="h-3" />
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              {[
                { label: 'Daily Streak', value: '15 days', icon: '🔥' },
                { label: 'Total Tasks', value: '342', icon: '✅' },
                { label: 'Focus Hours', value: '128h', icon: '⏱️' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="text-xs text-foreground/60 mb-1">{stat.label}</p>
                  <p className="font-bold text-foreground">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-heading text-foreground mb-2">Achievements</h2>
            <p className="text-foreground/60">Unlocked rewards and milestones</p>
          </div>

          {/* Achievement Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={achievement.unlocked ? { y: -8, scale: 1.05 } : {}}
                className={`p-6 rounded-lg border text-center transition-all ${
                  achievement.unlocked
                    ? 'card-solid hover:shadow-lg hover:shadow-primary/20 cursor-pointer'
                    : 'bg-foreground/5 border-border/30 opacity-50'
                }`}
              >
                <motion.div
                  className="text-4xl mb-3"
                  animate={achievement.unlocked ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {achievement.icon}
                </motion.div>
                <p className="text-sm font-semibold text-foreground">{achievement.name}</p>
                {!achievement.unlocked && (
                  <p className="text-xs text-foreground/40 mt-2">Locked</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-heading text-foreground mb-2">Statistics</h2>
            <p className="text-foreground/60">Your productivity at a glance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Tasks Completed', value: '342', subtitle: 'this month', icon: '📊' },
              { title: 'Focus Hours', value: '128', subtitle: 'hours logged', icon: '⏱️' },
              { title: 'Total XP', value: '8,543', subtitle: 'earned', icon: '⭐' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="card-solid p-6 text-center space-y-3"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-foreground/60">{stat.subtitle}</p>
                </div>
                <p className="text-xs font-semibold text-foreground/70">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GamificationSection;
