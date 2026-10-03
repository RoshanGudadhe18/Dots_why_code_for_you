import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DotSpec } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { Trash2, Edit3, ShieldAlert, Check, Wrench, GitFork } from 'lucide-react';
import { useDotsStore } from '../../store/useDotsStore';

interface DotCardProps {
  dot: DotSpec;
  index: number;
}

export const DotCard: React.FC<DotCardProps> = ({ dot, index }) => {
  const { updateDot, removeDot, dots } = useDotsStore();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState(dot.goal);

  const handleSaveGoal = () => {
    updateDot(dot.id, { goal: goalText });
    setIsEditingGoal(false);
  };

  const toggleApproval = () => {
    updateDot(dot.id, { requiresApproval: !dot.requiresApproval });
  };

  // Find human-readable names for dependencies
  const dependencyNames = dot.dependsOn
    .map((depId) => dots.find((d) => d.id === depId)?.name || depId)
    .join(', ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="relative rounded-2xl p-5 glass-panel glass-panel-hover flex flex-col justify-between border-t border-white/10 transition-all duration-200 group"
    >
      {/* Top Bar: Icon, Name, Role, Actions */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border border-white/10 bg-white/5 text-slate-200">
              <IconRenderer name={dot.icon} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white group-hover:text-slate-100 transition-colors">
                  {dot.name}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">{dot.role}</p>
            </div>
          </div>

          {/* Remove DOT */}
          <button
            onClick={() => removeDot(dot.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Remove DOT"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Goal section (Editable) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Agent Mandate
            </span>
            {!isEditingGoal && (
              <button
                onClick={() => setIsEditingGoal(true)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 font-medium cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Goal</span>
              </button>
            )}
          </div>

          {isEditingGoal ? (
            <div className="space-y-2 mt-1">
              <textarea
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                rows={2}
                className="w-full text-xs bg-black/40 border border-white/20 rounded-lg p-2 text-white focus:outline-none focus:border-white/40"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingGoal(false)}
                  className="px-2.5 py-1 rounded text-[11px] text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoal}
                  className="px-2.5 py-1 rounded text-[11px] bg-white hover:bg-slate-200 text-slate-900 font-semibold flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed font-normal bg-black/20 p-2.5 rounded-xl border border-white/5">
              {dot.goal}
            </p>
          )}
        </div>

        {/* Tools */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-1.5">
            <Wrench className="w-3 h-3 text-slate-400" />
            <span>Integrated Tools</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {dot.tools.map((tool, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Dependencies & Approval Badge */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate max-w-[55%]">
          <GitFork className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            {dot.dependsOn.length > 0 ? dependencyNames : 'Root Wave (Stage 1)'}
          </span>
        </div>

        {/* Approval required toggle badge */}
        <button
          onClick={toggleApproval}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer ${
            dot.requiresApproval
              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
              : 'bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200'
          }`}
          title="Click to toggle founder approval requirement"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>{dot.requiresApproval ? 'Approval Required' : 'Autonomous'}</span>
        </button>
      </div>
    </motion.div>
  );
};
