import React from 'react';
import { useDotsStore } from './store/useDotsStore';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/landing/Hero';
import { HowItWorks } from './components/landing/HowItWorks';
import { EvolutionSection } from './components/landing/EvolutionSection';
import { AnalyzingScreen } from './components/analyzing/AnalyzingScreen';
import { ProfileEditor } from './components/analyzing/ProfileEditor';
import { TeamGeneration } from './components/team/TeamGeneration';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

import { BackgroundTransition } from './components/common/BackgroundTransition';

export function App() {
  const { currentStep } = useDotsStore();

  return (
    <div className="relative min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Global Background Layer with Stage 1 -> Stage 2 Transition Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <BackgroundTransition autoCycle={true} cycleInterval={8000} />
      </div>
      {/* Subtle overlay to ensure perfect readability */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#090b10]/80 via-transparent to-[#090b10]/90" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Main Flow Stage */}
        {currentStep === 'landing' && (
          <main className="flex-1">
            <Hero />
            <HowItWorks />
            <EvolutionSection />
            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-4 text-center text-xs text-slate-500">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="font-bold text-white">DOTS</span>
                  <span>— Autonomous AI-Native Startup Operating System</span>
                </div>
                <div className="flex items-center gap-6 text-slate-400 font-mono text-[11px]">
                  <span>React 19</span>
                  <span>•</span>
                  <span>React Flow</span>
                  <span>•</span>
                  <span>LangGraph Ready</span>
                </div>
              </div>
            </footer>
          </main>
        )}

        {currentStep === 'analyzing' && <AnalyzingScreen />}

        {currentStep === 'profile' && <ProfileEditor />}

        {currentStep === 'team' && <TeamGeneration />}

        {currentStep === 'dashboard' && <DashboardLayout />}
      </div>
    </div>
  );
}

export default App;
