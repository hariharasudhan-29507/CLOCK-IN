import React, { useState } from 'react';
import { motion } from 'framer-motion';

const themes = [
  { id: 1, name: 'Forest', color: 'from-green-600 to-green-800', emoji: '🌲' },
  { id: 2, name: 'Cyberpunk', color: 'from-purple-600 to-pink-600', emoji: '🤖' },
  { id: 3, name: 'Ocean', color: 'from-blue-500 to-cyan-500', emoji: '🌊' },
  { id: 4, name: 'Minimal', color: 'from-gray-400 to-gray-600', emoji: '⚪' },
  { id: 5, name: 'Midnight', color: 'from-slate-900 to-slate-700', emoji: '🌙' },
  { id: 6, name: 'Coffee', color: 'from-amber-700 to-amber-900', emoji: '☕' },
  { id: 7, name: 'Aurora', color: 'from-pink-400 to-purple-500', emoji: '🌌' },
  { id: 8, name: 'Paper', color: 'from-yellow-100 to-orange-100', emoji: '📄' },
];

export function ThemesSection() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
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
          <h2 className="text-heading text-foreground mb-2">Themes & Cosmetics</h2>
          <p className="text-foreground/60">Unlock themes as you level up</p>
        </motion.div>

        {/* Theme Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              variants={itemVariants}
              onClick={() => setSelectedTheme(theme)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTheme.id === theme.id
                  ? 'border-primary shadow-lg shadow-primary/30'
                  : 'border-border/50 hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-full h-16 rounded-md bg-gradient-to-br ${theme.color} mb-3`} />
              <p className="text-sm font-semibold text-foreground">{theme.name}</p>
              <p className="text-xl mt-1">{theme.emoji}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Preview */}
        <motion.div
          key={selectedTheme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center">
            <p className="text-sm text-foreground/60 mb-2">Preview</p>
            <h3 className="text-2xl font-bold text-foreground">{selectedTheme.name}</h3>
          </div>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-lg bg-gradient-to-br ${selectedTheme.color} opacity-20 border border-border/50`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-32 rounded-md bg-foreground/5 flex items-center justify-center">
                  <span className="text-foreground/40">Preview {idx}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Theme Description */}
          <motion.div
            className="p-6 rounded-lg card-solid text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-foreground/70">
              {selectedTheme.name} theme unlocks at Level {Math.floor(Math.random() * 20) + 10}
            </p>
            <p className="text-sm text-foreground/50 mt-2">
              Customize your workspace with unique color schemes and visual styles
            </p>
          </motion.div>
        </motion.div>

        {/* Unlockable Items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-subheading text-foreground text-center">Unlockable Items</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Themes', 'Backgrounds', 'Icons', 'Pets', 'Music', 'Badges', 'Avatar Skins', 'Particles'].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg card-solid text-center hover:shadow-lg hover:shadow-primary/20 transition-all"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl mb-2">
                  {
                    {
                      Themes: '🎨',
                      Backgrounds: '🖼️',
                      Icons: '⭐',
                      Pets: '🐾',
                      Music: '🎵',
                      Badges: '🏅',
                      'Avatar Skins': '👤',
                      Particles: '✨',
                    }[item]
                  }
                </p>
                <p className="text-sm font-semibold text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ThemesSection;
