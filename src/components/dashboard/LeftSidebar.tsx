import React from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { IconRenderer } from '../common/IconRenderer';
import { Play, Check, ShieldAlert, Plus } from 'lucide-react';

interface LeftSidebarProps {
  onOpenAddModal: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onOpenAddModal }) => {
  const {
    dots,
    selectedDotId,
    setSelectedDotId,
    runSingleDot,
    setActiveTab,
    isSimulating,
  } = useDotsStore();

  const handleSelectDot = (dotId: string) => {
    setSelectedDotId(dotId);
    setActiveTab('outputs');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'working':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-200 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            Working
          </span>
        );
      case 'waiting_approval':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-400/40 px-2 py-0.5 rounded-full">
            <ShieldAlert className="w-2.5 h-2.5 text-amber-400" />
            Review
          </span>
        );
      case 'done':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-400/40 px-2 py-0.5 rounded-full">
            <Check className="w-2.5 h-2.5 text-emerald-400" />
            Done
          </span>
        );
      case 'idle':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Idle
          </span>
        );
    }
  };

  return (
    <aside className="w-72 shrink-0 flex flex-col bg-[#0b0e16] border-r border-white/10 h-full p-4 overflow-hidden">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-500 block">
            Autonomous Swarm
          </span>
          <h3 className="text-sm font-bold text-white">Active DOTs ({dots.length})</h3>
        </div>
        <button
          onClick={onOpenAddModal}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
          title="Add New DOT"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* List of DOTs */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {dots.map((dot) => {
          const isSelected = selectedDotId === dot.id;
          return (
            <div
              key={dot.id}
              onClick={() => handleSelectDot(dot.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer group ${
                isSelected
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center p-1.5 border border-white/10 bg-white/5 text-slate-300">
                    <IconRenderer name={dot.icon} className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-slate-100 transition-colors line-clamp-1">
                      {dot.name}
                    </h4>
                  </div>
                </div>

                {/* Quick single-run button if idle */}
                {dot.status === 'idle' && !isSimulating && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      runSingleDot(dot.id);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                    title="Run single DOT"
                  >
                    <Play className="w-3 h-3" />
                  </button>
                )}
              </div>

              <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">{dot.role}</p>

              <div className="flex items-center justify-between">
                {getStatusBadge(dot.status)}
                {dot.status === 'working' && (
                  <span className="text-[10px] font-mono text-slate-300">{dot.progress || 0}%</span>
                )}
              </div>

              {dot.status === 'working' && (
                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${dot.progress || 10}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Quick Add CTA */}
      <div className="pt-3 mt-2 border-t border-white/10">
        <button
          onClick={onOpenAddModal}
          className="w-full py-2.5 rounded-xl border border-dashed border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom DOT</span>
        </button>
      </div>
    </aside>
  );
};
