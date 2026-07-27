import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { StarField } from './StarField';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-display text-primary mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          CLOCK-IN
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-foreground/80 mb-8 font-light"
        >
          Grow your life.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Every completed task builds your future. A gamified desktop companion that transforms work into meaningful progress.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
          >
            Continue with Google
          </Button>
        </motion.div>

        {/* Feature Preview Cards - Below fold */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {[
            { icon: '📋', label: 'Tasks' },
            { icon: '🏆', label: 'Achievements' },
            { icon: '📷', label: 'Photos' },
            { icon: '🔥', label: 'Streak' },
            { icon: '📊', label: 'Level' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="card-glass p-4 flex flex-col items-center justify-center"
              whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(245, 166, 35, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm text-foreground/70 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
