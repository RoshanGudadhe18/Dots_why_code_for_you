import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, FileText, Users, Network, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Idea Intake',
    icon: Lightbulb,
    desc: 'Input your raw vision, whether a two-sentence concept or a complex product thesis.',
  },
  {
    number: '02',
    title: 'Startup Profile',
    icon: FileText,
    desc: 'DOTS distills the problem, target audience, business model, and engineering constraints.',
  },
  {
    number: '03',
    title: 'Autonomous Team',
    icon: Users,
    desc: 'A tailored swarm of specialized AI agents (DOTs) is synthesized to match your domain.',
  },
  {
    number: '04',
    title: 'Dependency Graph',
    icon: Network,
    desc: 'Research, specs, architecture, and financials execute concurrently in dependency waves.',
  },
  {
    number: '05',
    title: 'Founder Review',
    icon: CheckCircle2,
    desc: 'You maintain absolute executive control: approve, reject, or request revised deliverables.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
          Architecture & Flow
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How DOTS Transforms Vision Into Execution
        </p>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal">
          A closed-loop autonomous operating cycle engineered to eliminate coordination drag.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {/* Connecting line behind desktop grid */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-8 pointer-events-none" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative p-5 rounded-xl glass-panel glass-panel-hover flex flex-col items-start transition-all"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <span className="font-mono text-xs font-semibold text-slate-500">{step.number}</span>
                <div className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
