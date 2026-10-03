import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Users, Cpu } from 'lucide-react';

const evolutionStages = [
  {
    era: '2022',
    name: 'AI Assistant',
    subtitle: 'Chatbot Paradigm',
    icon: MessageSquare,
    badge: 'Single Prompt',
    features: ['Linear question & answer', 'No tool execution', 'Context lost on tab close'],
    flaw: 'The founder does all the coordination and assembly.',
    cardClass: 'border-white/10 bg-white/[0.02]',
    iconClass: 'text-slate-400 bg-white/5 border-white/10',
  },
  {
    era: '2023',
    name: 'AI Agent',
    subtitle: 'Tool Calling Loop',
    icon: Bot,
    badge: 'Autonomous Loop',
    features: ['ReAct tool invocation', 'Web browsing & bash execution', 'Linear task progression'],
    flaw: 'Single agent bottleneck: hallucinates or spins in loops.',
    cardClass: 'border-white/10 bg-white/[0.02]',
    iconClass: 'text-slate-300 bg-white/5 border-white/10',
  },
  {
    era: '2024',
    name: 'Multi-Agent Team',
    subtitle: 'Static Presets',
    icon: Users,
    badge: 'Fixed Swarms',
    features: ['Pre-programmed roles', 'Peer-to-peer message exchanges', 'Specialized prompts'],
    flaw: 'Inflexible templates: cannot adapt to niche hardware or novel business models.',
    cardClass: 'border-white/10 bg-white/[0.02]',
    iconClass: 'text-slate-300 bg-white/5 border-white/10',
  },
  {
    era: 'NOW (DOTS)',
    name: 'Dynamic AI Org',
    subtitle: 'Autonomous Startup OS',
    icon: Cpu,
    badge: 'State of the Art',
    features: [
      'Just-in-time team generation per vision',
      'Typed Shared Memory ledger (Facts/Decisions)',
      'DAG task orchestration with parallel pipelines',
      'Founder-in-the-loop executive gatekeeping',
    ],
    flaw: null,
    cardClass: 'border-white/20 bg-white/[0.06]',
    iconClass: 'text-white bg-white/10 border-white/20',
  },
];

export const EvolutionSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-medium uppercase tracking-wider mb-4">
          Paradigm Shift
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Evolution of Autonomous Work
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal">
          Moving from isolated chatbots to self-assembling, goal-directed AI organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {evolutionStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isLatest = idx === 3;
          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative rounded-xl p-6 border transition-all flex flex-col justify-between ${stage.cardClass}`}
            >
              {isLatest && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm">
                  DOTS Operating System
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-widest">
                    {stage.era}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                    {stage.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg border ${stage.iconClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{stage.name}</h3>
                    <p className="text-xs text-slate-400">{stage.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {stage.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {stage.flaw ? (
                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] text-slate-400 font-normal leading-tight block">
                    Bottleneck: {stage.flaw}
                  </span>
                </div>
              ) : (
                <div className="pt-3 border-t border-white/10">
                  <span className="text-[11px] text-slate-200 font-medium leading-tight">
                    Zero coordination drag. Maximum scalability.
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
