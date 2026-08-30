import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { 
  Palette, 
  Sparkles, 
  Coins, 
  Check, 
  Lock, 
  ShoppingBag, 
  ShieldCheck, 
  Volume2, 
  Star,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CosmeticsStoreView() {
  const { 
    themes, 
    cosmetics, 
    stats, 
    applyTheme, 
    unlockTheme, 
    unlockCosmetic, 
    selectAvatar 
  } = useClockIn();

  const [selectedThemePreview, setSelectedThemePreview] = useState(
    themes.find((t) => t.id === stats.activeThemeId) || themes[0]
  );
  const [activeCategory, setActiveCategory] = useState<'themes' | 'avatars' | 'audio' | 'particles'>('themes');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleUnlockTheme = (themeId: string) => {
    const success = unlockTheme(themeId);
    if (success) {
      setFeedbackMsg({ text: '🎉 Theme Unlocked! Ready to apply.', success: true });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      setFeedbackMsg({ text: '⚠️ Not enough Gold Coins!', success: false });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const handleUnlockCosmetic = (cosmeticId: string) => {
    const success = unlockCosmetic(cosmeticId);
    if (success) {
      setFeedbackMsg({ text: '🎉 Cosmetic Item Unlocked!', success: true });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      setFeedbackMsg({ text: '⚠️ Not enough Gold Coins!', success: false });
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Vault Header & Gold Counter */}
      <div className="card-solid p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-primary/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Prestige Rewards & Aesthetic Customizer</span>
          </div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Cosmetics Vault & Themes
          </h2>
          <p className="text-sm text-foreground/60 max-w-lg mt-1">
            Spend your hard-earned quest bounty on live color themes, avatars, sound synthesis packs, and UI particles.
          </p>
        </div>

        {/* Gold Counter Display */}
        <div className="p-4 sm:px-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-3xl">
            🪙
          </div>
          <div>
            <p className="text-xs font-bold text-foreground/60 uppercase">Your Gold Balance</p>
            <p className="text-3xl font-black text-amber-300 font-mono">{stats.gold}</p>
          </div>
        </div>
      </div>

      {/* Feedback Alert */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl border text-center font-bold text-sm ${
              feedbackMsg.success
                ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20'
                : 'bg-destructive/20 border-destructive text-destructive'
            }`}
          >
            {feedbackMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-border/40 pb-2 overflow-x-auto">
        {[
          { id: 'themes', label: 'Workspace Themes (8)', icon: Palette },
          { id: 'avatars', label: 'RPG Avatars', icon: Star },
          { id: 'audio', label: 'Sound Packs', icon: Volume2 },
          { id: 'particles', label: 'Particle FX', icon: Sparkles },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-card/60 text-foreground/70 hover:text-foreground border border-border/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Themes View */}
      {activeCategory === 'themes' && (
        <div className="space-y-8">
          {/* Active Preview Strip */}
          <div className="card-solid p-6 rounded-3xl border border-primary/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Preview Selected</span>
                <h3 className="text-2xl font-black text-foreground flex items-center gap-2">
                  <span>{selectedThemePreview.emoji}</span>
                  <span>{selectedThemePreview.name}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {stats.activeThemeId === selectedThemePreview.id ? (
                  <span className="px-3 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Active Theme
                  </span>
                ) : selectedThemePreview.isUnlocked ? (
                  <Button
                    onClick={() => applyTheme(selectedThemePreview.id)}
                    className="bg-primary text-primary-foreground font-bold text-xs rounded-xl hover:bg-primary/90"
                  >
                    Apply Theme Now
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleUnlockTheme(selectedThemePreview.id)}
                    className="bg-amber-500 text-black font-extrabold text-xs rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Unlock for {selectedThemePreview.costGold} Gold</span>
                  </Button>
                )}
              </div>
            </div>

            <p className="text-sm text-foreground/70">{selectedThemePreview.description}</p>

            {/* Live Palette Visualizer */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              <div
                className="h-16 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md"
                style={{ backgroundColor: `oklch(${selectedThemePreview.primaryOklch})` }}
              >
                Primary Accent
              </div>
              <div
                className="h-16 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md"
                style={{ backgroundColor: `oklch(${selectedThemePreview.bgOklch})` }}
              >
                Background Canvas
              </div>
              <div
                className="h-16 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md"
                style={{ backgroundColor: `oklch(${selectedThemePreview.cardOklch})` }}
              >
                Card Elevation
              </div>
              <div
                className="h-16 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md border"
                style={{ backgroundColor: `oklch(${selectedThemePreview.cardOklch})`, borderColor: `oklch(${selectedThemePreview.borderOklch})` }}
              >
                Subtle Border
              </div>
            </div>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((th) => {
              const isCurrent = stats.activeThemeId === th.id;
              const isSelected = selectedThemePreview.id === th.id;

              return (
                <div
                  key={th.id}
                  onClick={() => setSelectedThemePreview(th)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary ring-2 ring-primary/40 card-solid shadow-xl'
                      : 'border-border/50 card-solid hover:border-primary/40'
                  }`}
                >
                  <div>
                    {/* Gradient Swatch */}
                    <div className={`w-full h-20 rounded-xl bg-gradient-to-r ${th.previewColor} mb-3 shadow relative flex items-end p-2.5`}>
                      <span className="text-2xl drop-shadow">{th.emoji}</span>
                      {isCurrent && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-primary text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-foreground">{th.name}</h4>
                    <p className="text-xs text-foreground/60 mt-1 leading-relaxed line-clamp-2">
                      {th.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                    {th.isUnlocked ? (
                      <span className="text-xs text-primary font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3 text-amber-400" /> {th.costGold} Gold
                      </span>
                    )}

                    {isCurrent ? (
                      <span className="text-[10px] font-bold text-foreground/50">Current</span>
                    ) : th.isUnlocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          applyTheme(th.id);
                        }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlockTheme(th.id);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold"
                      >
                        Unlock
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Avatars, Sound Packs & Particle Vault */}
      {activeCategory !== 'themes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cosmetics
            .filter((c) => {
              if (activeCategory === 'avatars') return c.category === 'avatar';
              if (activeCategory === 'audio') return c.category === 'sound';
              return c.category === 'particle' || c.category === 'badge';
            })
            .map((item) => {
              const isEquipped = stats.selectedAvatar === item.icon;

              return (
                <div
                  key={item.id}
                  className="card-solid p-5 rounded-2xl border border-border/50 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-card/80 border border-border/40 flex items-center justify-center text-3xl mb-3 shadow-inner">
                      {item.icon}
                    </div>
                    <h4 className="text-base font-bold text-foreground">{item.name}</h4>
                    <p className="text-xs text-foreground/60 mt-1">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                    {item.isUnlocked ? (
                      item.category === 'avatar' ? (
                        isEquipped ? (
                          <span className="text-xs font-bold text-primary">Equipped</span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => selectAvatar(item.icon)}
                            className="bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold h-8 rounded-lg"
                          >
                            Equip
                          </Button>
                        )
                      ) : (
                        <span className="text-xs font-semibold text-primary">✓ Unlocked</span>
                      )
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleUnlockCosmetic(item.id)}
                        className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs h-8 rounded-lg flex items-center gap-1"
                      >
                        <Coins className="w-3 h-3" />
                        <span>{item.costGold}</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default CosmeticsStoreView;
