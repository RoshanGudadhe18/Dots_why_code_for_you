import React, { useState } from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { MemoryType } from '../../types';
import {
  Database,
  Search,
  CheckCircle2,
  HelpCircle,
  Bookmark,
  Bot,
} from 'lucide-react';

export const SharedMemoryView: React.FC = () => {
  const { memory } = useDotsStore();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMemory = memory.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.content.toLowerCase().includes(q) ||
        item.sourceDotName.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getTypeBadge = (type: MemoryType) => {
    switch (type) {
      case 'fact':
        return {
          bg: 'bg-white/10 text-white border-white/20',
          icon: CheckCircle2,
          label: 'Fact',
        };
      case 'decision':
        return {
          bg: 'bg-white/10 text-slate-200 border-white/20',
          icon: Bookmark,
          label: 'Decision',
        };
      case 'assumption':
      default:
        return {
          bg: 'bg-amber-500/10 text-amber-300 border-amber-400/30',
          icon: HelpCircle,
          label: 'Assumption',
        };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#090b10] rounded-2xl border border-white/10 overflow-hidden">
      {/* Header and Controls */}
      <div className="p-4 border-b border-white/10 bg-[#0d1017]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-300" />
            <span>Shared Memory Ledger ({memory.length} entries)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Immutable collective context: facts, strategic decisions, and operational assumptions written by DOTs.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collective memory..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1">
            {['all', 'fact', 'decision', 'assumption'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-white/15 text-white border border-white/25'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memory items grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredMemory.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6">
            <Database className="w-10 h-10 text-slate-600 mb-2" />
            <p className="text-sm text-slate-400 font-medium">Memory ledger is currently empty.</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              As DOTs execute tasks in the workspace DAG, they append verified facts, decisions, and assumptions here.
            </p>
          </div>
        ) : (
          filteredMemory.map((item) => {
            const badge = getTypeBadge(item.type);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${badge.bg}`}
                    >
                      <BadgeIcon className="w-2.5 h-2.5" />
                      <span>{badge.label}</span>
                    </span>

                    {item.category && (
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    {item.confidence && (
                      <span className="text-emerald-400 font-medium">
                        {Math.round(item.confidence * 100)}% conf
                      </span>
                    )}
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal mb-3">
                  {item.content}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-slate-400" />
                    <span>Authored by: </span>
                    <span className="text-white font-medium">{item.sourceDotName}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{item.id}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
