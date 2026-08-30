import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClockIn } from '@/contexts/ClockInContext';
import { soundFX } from '@/lib/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CloudRain, 
  Rocket, 
  Coffee, 
  Waves, 
  CheckCircle2,
  Clock,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FocusTimerView() {
  const { logFocusSession, stats } = useClockIn();

  const [presetMinutes, setPresetMinutes] = useState<number>(25);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<'rain' | 'space' | 'white' | 'none'>('none');
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);
  const [focusTag, setFocusTag] = useState<string>('Deep Coding');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set preset
  const handleSelectPreset = (mins: number) => {
    setIsRunning(false);
    setPresetMinutes(mins);
    setTimeLeftSeconds(mins * 60);
    setSessionCompleted(false);
    if (stats.soundEnabled) soundFX.playClick();
  };

  // Toggle timer
  const handleToggleTimer = () => {
    if (!isRunning && stats.soundEnabled) {
      soundFX.playClick();
    }
    setIsRunning(!isRunning);
  };

  // Reset timer
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeftSeconds(presetMinutes * 60);
    setSessionCompleted(false);
    if (stats.soundEnabled) soundFX.playClick();
  };

  // Ambient sound selector
  const handleAmbientChange = (type: 'rain' | 'space' | 'white' | 'none') => {
    setAmbientSound(type);
    soundFX.setAmbientSound(type, 0.12);
  };

  // Timer loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setSessionCompleted(true);
            logFocusSession(presetMinutes);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, presetMinutes]);

  // Clean up ambient sound on unmount
  useEffect(() => {
    return () => {
      soundFX.stopAmbient();
    };
  }, []);

  const totalSeconds = presetMinutes * 60;
  const progressRatio = (totalSeconds - timeLeftSeconds) / totalSeconds;
  const strokeDashoffset = 754 * (1 - progressRatio);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const ambientOptions = [
    { id: 'none', label: 'Mute Soundscape', icon: VolumeX },
    { id: 'rain', label: 'Rainfall & Thunder', icon: CloudRain },
    { id: 'space', label: 'Cosmic Deep Space', icon: Rocket },
    { id: 'white', label: 'Lo-Fi White Noise', icon: Waves },
  ] as const;

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hyperfocus Hyperdrive</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Deep Focus Sanctuary
        </h2>
        <p className="text-sm text-foreground/60 max-w-md mx-auto">
          Block out distractions, lock into flow, and earn +4 XP & +1.5 Gold for every minute focused.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { mins: 25, label: '25m Pomodoro' },
          { mins: 50, label: '50m Deep Sprint' },
          { mins: 15, label: '15m Quick Blitz' },
          { mins: 5, label: '5m Power Rest' },
        ].map((preset) => (
          <button
            key={preset.mins}
            onClick={() => handleSelectPreset(preset.mins)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              presetMinutes === preset.mins
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-card border border-border/60 text-foreground/70 hover:border-primary/40'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Circular Timer Display */}
      <div className="relative flex flex-col items-center justify-center my-6">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Radial Glow */}
          <div className={`absolute inset-4 rounded-full transition-all duration-700 -z-10 ${
            isRunning ? 'bg-primary/20 blur-3xl animate-pulse' : 'bg-transparent'
          }`} />

          {/* SVG Progress Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 260 260">
            {/* Background Ring */}
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke="currentColor"
              strokeWidth="10"
              className="text-card stroke-border/40"
              fill="transparent"
            />
            {/* Animated Active Ring */}
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray="754"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary transition-all duration-500 ease-out"
              fill="transparent"
            />
          </svg>

          {/* Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-2">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">
              {isRunning ? 'Flow State Active' : sessionCompleted ? 'Quest Finished' : 'Ready to Clock-In'}
            </span>

            <div className="text-5xl sm:text-6xl font-black text-foreground tracking-tighter font-mono">
              {formattedTime}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-semibold">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>+{presetMinutes * 4} XP on finish</span>
            </div>
          </div>
        </div>

        {/* Play/Pause/Reset Controls */}
        <div className="flex items-center gap-3 mt-6">
          <Button
            size="lg"
            onClick={handleToggleTimer}
            className={`px-8 py-6 rounded-2xl text-base font-bold shadow-xl flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause Flow</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Session</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="w-14 h-14 rounded-2xl border-border/60 hover:bg-foreground/5 text-foreground/70"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {sessionCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-amber-500/10 to-primary/20 border border-primary/40 text-center space-y-2 shadow-xl shadow-primary/20"
          >
            <h3 className="text-xl font-extrabold text-foreground">🎉 Deep Work Sprint Complete!</h3>
            <p className="text-sm text-foreground/70">
              You logged <span className="text-primary font-bold">{presetMinutes} minutes</span> of uninterrupted focus and earned{' '}
              <span className="text-primary font-bold">+{presetMinutes * 4} XP</span> &{' '}
              <span className="text-amber-300 font-bold">+{Math.floor(presetMinutes * 1.5)} Gold</span>!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Soundscapes Card */}
      <div className="card-solid p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">Procedural Ambient Soundscapes</h3>
            <p className="text-xs text-foreground/60">Synthesized white noise directly in your browser</p>
          </div>
          <Volume2 className="w-5 h-5 text-primary" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ambientOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = ambientSound === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleAmbientChange(opt.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all ${
                  isSelected
                    ? 'bg-primary/15 border-primary text-primary shadow-md shadow-primary/20'
                    : 'bg-card/50 border-border/50 text-foreground/70 hover:border-primary/40'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-foreground/40'}`} />
                <span className="text-xs font-bold leading-tight">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FocusTimerView;
