import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { Sparkles, Trophy, Coins, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LevelUpModal() {
  const { levelUpModal, closeLevelUpModal, setActiveTab } = useClockIn();

  if (!levelUpModal || !levelUpModal.show) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md card-solid border-2 border-primary/50 shadow-2xl shadow-primary/30 p-8 text-center overflow-hidden"
        >
          {/* Animated Background Rays */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"
          />

          {/* Level Badge Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.15 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-primary to-amber-300 flex items-center justify-center text-4xl shadow-xl shadow-primary/40 mb-4"
          >
            ⭐
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-2">
              Level Up Ascended!
            </span>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Level {levelUpModal.level} Achieved!
            </h2>
            <p className="text-primary text-lg font-bold mt-1">
              Title: {levelUpModal.title}
            </p>
          </motion.div>

          {/* Rewards Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="my-6 p-4 rounded-2xl bg-card/80 border border-border/60 flex items-center justify-around gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-foreground/50 font-medium">Level Bonus</p>
                <p className="text-base font-bold text-amber-300">+{levelUpModal.rewardGold} Gold</p>
              </div>
            </div>

            <div className="w-px h-8 bg-border/60" />

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-foreground/50 font-medium">Stat Growth</p>
                <p className="text-base font-bold text-foreground">Power +5%</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              onClick={closeLevelUpModal}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-5 rounded-xl shadow-lg shadow-primary/30"
            >
              Continue Questing
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                closeLevelUpModal();
                setActiveTab('store');
              }}
              className="border-border/60 hover:bg-foreground/5 text-foreground font-semibold py-5 rounded-xl flex items-center gap-1.5"
            >
              <span>Visit Vault</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default LevelUpModal;
