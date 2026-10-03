import React, { useState } from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { IconRenderer } from '../common/IconRenderer';
import { ActivityType } from '../../types';
import {
  Sparkles,
  Bot,
  Brain,
  FileText,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { activities } = useDotsStore();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'all') return true;
    if (filterType === 'thought') return act.type === 'thought';
    if (filterType === 'artifact') return act.type === 'artifact';
    if (filterType === 'system') return act.type === 'system';
    return true;
  });

  const getBadgeStyle = (type: ActivityType) => {
    switch (type) {
      case 'thought':
        return {
          bg: 'bg-white/10 border-white/15 text-slate-300',
          icon: Brain,
          label: 'Thought Stream',
        };
      case 'artifact':
        return {
          bg: 'bg-white/15 border-white/20 text-white',
          icon: FileText,
          label: 'Artifact Generated',
        };
      case 'system':
        return {
          bg: 'bg-white/5 border-white/10 text-slate-400',
          icon: Sparkles,
          label: 'System DAG',
        };
      case 'approval_request':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          icon: CheckCircle2,
          label: 'Approval Requested',
        };
      case 'status':
      default:
        return {
          bg: 'bg-white/5 border-white/10 text-slate-300',
          icon: Bot,
          label: 'Action',
        };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#090b10] rounded-2xl border border-white/10 overflow-hidden">
      {/* Top Header & Filters */}
      <div className="p-4 border-b border-white/10 bg-[#0d1017]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Agent-to-Agent Activity Feed</span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time inter-agent messaging, heuristic reasoning traces, and deliverable handoffs.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5">
          {['all', 'thought', 'artifact', 'system'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6">
            <Bot className="w-10 h-10 text-slate-600 mb-2" />
            <p className="text-sm text-slate-400 font-medium">No activity events recorded yet.</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Click "Run Organization" to start agent execution and view autonomous inter-agent collaboration.
            </p>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const badge = getBadgeStyle(act.type);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={act.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  act.isRevised
                    ? 'border-amber-500/30 bg-amber-950/20'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 p-1">
                      <IconRenderer name={act.dotIcon} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white">{act.dotName}</span>
                    {act.targetDotName && (
                      <span className="text-xs text-slate-400">
                        → <span className="text-slate-200 font-medium">{act.targetDotName}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {act.isRevised && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-amber-300 bg-amber-950/80 border border-amber-400/40 px-2 py-0.5 rounded-md">
                        <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                        Revised on Feedback
                      </span>
                    )}

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md border ${badge.bg}`}
                    >
                      <BadgeIcon className="w-2.5 h-2.5" />
                      <span>{badge.label}</span>
                    </span>

                    <span className="text-[10px] text-slate-500 font-mono">{act.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-mono leading-relaxed pl-8">
                  {act.message}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
