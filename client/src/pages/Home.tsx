import React from 'react';
import { useClockIn } from '@/contexts/ClockInContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FloatingWidgetSection } from '@/components/FloatingWidgetSection';
import { TaskDemoSection } from '@/components/TaskDemoSection';
import { GamificationSection } from '@/components/GamificationSection';
import { MemoryTimeline } from '@/components/MemoryTimeline';
import { ThemesSection } from '@/components/ThemesSection';
import { TechStackSection } from '@/components/TechStackSection';
import { Footer } from '@/components/Footer';
import { DividerSection } from '@/components/DividerSection';
import { WorkspaceView } from '@/components/views/WorkspaceView';
import { FocusTimerView } from '@/components/views/FocusTimerView';
import { ProfileAchievementsView } from '@/components/views/ProfileAchievementsView';
import { MemoryJournalView } from '@/components/views/MemoryJournalView';
import { CosmeticsStoreView } from '@/components/views/CosmeticsStoreView';
import { FloatingWidgetOverlay } from '@/components/FloatingWidgetOverlay';
import { LevelUpModal } from '@/components/LevelUpModal';

export default function Home() {
  const { activeTab } = useClockIn();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating Desktop Companion Overlay */}
      <FloatingWidgetOverlay />

      {/* Level Up Celebration Modal */}
      <LevelUpModal />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'workspace' && <WorkspaceView />}
        {activeTab === 'focus' && <FocusTimerView />}
        {activeTab === 'profile' && <ProfileAchievementsView />}
        {activeTab === 'memories' && <MemoryJournalView />}
        {activeTab === 'store' && <CosmeticsStoreView />}

        {activeTab === 'showcase' && (
          <>
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
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
