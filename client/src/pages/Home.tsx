import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FloatingWidgetSection } from '@/components/FloatingWidgetSection';
import { TaskDemoSection } from '@/components/TaskDemoSection';
import { GamificationSection } from '@/components/GamificationSection';
import { MemoryTimeline } from '@/components/MemoryTimeline';
import { ThemesSection } from '@/components/ThemesSection';
import { TechStackSection } from '@/components/TechStackSection';
import { Footer } from '@/components/Footer';
import { DividerSection } from '@/components/DividerSection';

/**
 * Clock-In Product Concept Website
 * 
 * Design Philosophy:
 * - Premium, organic, playful aesthetic
 * - Dark charcoal background with warm amber/gold accents
 * - Smooth, snappy animations that feel alive
 * - Every section reinforces progress and growth
 * - No clutter, just beautiful moments of accomplishment
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Floating Widget Section */}
      <FloatingWidgetSection />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Task Completion Demo */}
      <TaskDemoSection />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Gamification & Profile */}
      <GamificationSection />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Photo Memory Timeline */}
      <MemoryTimeline />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Themes & Cosmetics */}
      <ThemesSection />

      {/* Divider */}
      <div className="px-4"><DividerSection /></div>

      {/* Tech Stack */}
      <TechStackSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
