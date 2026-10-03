import React from 'react';
import { useDotsStore, AppStep } from '../../store/useDotsStore';
import { RotateCcw, Sparkles, ChevronRight, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    profile,
    dots,
    isSimulating,
    loadDemoMode,
    resetAll,
    approvals,
    demoMode,
  } = useDotsStore();

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  const steps: { key: AppStep; label: string; enabled: boolean }[] = [
    { key: 'landing', label: 'Idea', enabled: true },
    { key: 'profile', label: 'Profile', enabled: !!profile },
    { key: 'team', label: 'AI Team', enabled: dots.length > 0 },
    { key: 'dashboard', label: 'Workspace', enabled: dots.length > 0 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090b10]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentStep('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center">
            <img src="/dots-bg.png" alt="DOTS" className="w-full h-full object-cover object-bottom transform scale-125" />
          </div>
          <div>
            <span className="font-bold tracking-wider text-lg text-white">
              DOTS
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              Startup OS
            </span>
          </div>
        </div>

        {/* Step Breadcrumbs */}
        {currentStep !== 'landing' && (
          <nav className="hidden md:flex items-center gap-1">
            {steps.map((s, idx) => {
              const isActive = currentStep === s.key;
              return (
                <React.Fragment key={s.key}>
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                  <button
                    disabled={!s.enabled}
                    onClick={() => setCurrentStep(s.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/20'
                        : s.enabled
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        : 'text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    {s.label}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Simulation status pill */}
          {currentStep === 'dashboard' && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-xs">
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-slate-200 font-medium">Orchestrating</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-300 font-medium">DAG Synchronized</span>
                </>
              )}
            </div>
          )}

          {/* Pending Approvals Badge */}
          {pendingApprovalsCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>{pendingApprovalsCount} Pending</span>
            </div>
          )}

          {/* 1-Click Demo Toggle */}
          <button
            onClick={loadDemoMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              demoMode
                ? 'bg-white text-slate-900 border-white'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-white/20'
            }`}
            title="Auto-run complete Student Internship demo venture"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Demo Mode</span>
          </button>

          {/* Reset / New Venture */}
          {currentStep !== 'landing' && (
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              title="Reset and start new venture"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
