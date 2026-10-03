import React from 'react';
import { motion } from 'framer-motion';
import { Radar, Users, Cpu, FileCheck, Sparkles } from 'lucide-react';
import { useDotsStore } from '../../store/useDotsStore';

export const AnalyzingScreen: React.FC = () => {
  const { analyzingStep, ideaInput } = useDotsStore();

  const steps = [
    { num: 1, label: 'Extracting Problem & Customer Pain Vectors', icon: Radar },
    { num: 2, label: 'Identifying Primary & Secondary User Personas', icon: Users },
    { num: 3, label: 'Synthesizing Product Scope & Engineering Constraints', icon: Cpu },
    { num: 4, label: 'Structuring Startup Profile & Business Model', icon: FileCheck },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative">
      <div className="relative z-10 max-w-xl w-full text-center">
        {/* Animated Radar Pulse Core */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-40" />
          <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            DOTS Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Deconstructing Venture Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto line-clamp-2 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/10">
            "{ideaInput}"
          </p>
        </motion.div>

        {/* Sequential Step Progress List */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {steps.map((s) => {
            const isCompleted = analyzingStep > s.num;
            const isCurrent = analyzingStep === s.num;

            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: s.num * 0.1 }}
                className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                    : isCurrent
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/5 bg-white/[0.02] text-slate-500'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-slate-600'
                  }`}
                >
                  {isCompleted ? '✓' : s.num}
                </div>

                <div className="flex-1">
                  <div className="text-xs font-semibold">{s.label}</div>
                </div>

                {isCurrent && (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
