import React, { useState } from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { DotCard } from './DotCard';
import { AddDotModal } from './AddDotModal';
import { Plus, ArrowRight, Sparkles, Network, ArrowLeft } from 'lucide-react';

export const TeamGeneration: React.FC = () => {
  const { profile, dots, proceedToDashboard, setCurrentStep } = useDotsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Organization Synthesized
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {dots.length} Specialized Agents
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Custom AI Organization for {profile.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
            Engineered specifically for your <span className="text-slate-200 font-medium capitalize">{profile.type}</span> venture archetype.
            Review goals, adjust approval gates, or insert custom agents before spinning up the execution DAG.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentStep('profile')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom DOT</span>
          </button>

          <button
            onClick={proceedToDashboard}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Open Workspace & Graph</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Agent Cards with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {dots.map((dot, index) => (
          <DotCard key={dot.id} dot={dot} index={index} />
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Automated Dependency Orchestration</h4>
            <p className="text-xs text-slate-400">
              Stage 1 research agents will run in parallel, unblocking downstream product, technical architecture, and unit economics.
            </p>
          </div>
        </div>

        <button
          onClick={proceedToDashboard}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Launch Workspace DAG</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Add Custom DOT Modal */}
      <AddDotModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
