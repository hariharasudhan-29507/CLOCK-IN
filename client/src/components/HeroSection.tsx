import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Sparkles, Play } from 'lucide-react';
import { StarField } from './StarField';
import { useClockIn } from '@/contexts/ClockInContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
    },
  },
};

export function HeroSection() {
  const { setActiveTab, setIsFloatingOpen } = useClockIn();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
      {/* 3D Star Field Background */}
      <StarField count={1200} speed={0.0002} />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Gamified Desktop Companion V2</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-display text-primary mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          CLOCK-IN
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-foreground/90 mb-6 font-semibold"
        >
          Grow your life. Progress made visible.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Every completed task earns XP, unlocks achievements, and logs photo memories. Experience productivity redesigned as an epic RPG quest.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={() => setActiveTab('workspace')}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 active:scale-95 flex items-center gap-2"
          >
            <span>Launch Quest Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsFloatingOpen(true)}
            className="w-full sm:w-auto border-border/60 hover:bg-foreground/5 text-foreground px-6 py-6 text-base font-bold rounded-xl flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-primary" />
            <span>Open Floating Dock</span>
          </Button>
        </motion.div>

        {/* Feature Preview Cards - Clickable Navigators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3"
        >
          {[
            { icon: '📋', label: 'Quests', tab: 'workspace' as const },
            { icon: '⏱️', label: 'Deep Focus', tab: 'focus' as const },
            { icon: '🏆', label: 'Achievements', tab: 'profile' as const },
            { icon: '📷', label: 'Memories', tab: 'memories' as const },
            { icon: '🎨', label: 'Cosmetics', tab: 'store' as const },
          ].map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="card-glass p-4 flex flex-col items-center justify-center cursor-pointer transition-all border border-border/50 hover:border-primary/50"
              whileHover={{ y: -4, scale: 1.05, boxShadow: '0 20px 25px -5px rgba(245, 166, 35, 0.2)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl mb-1.5">{item.icon}</div>
              <p className="text-xs text-foreground/80 font-bold">{item.label}</p>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5 text-primary/60" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
