import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cpu, ShoppingBag, Sparkles, Users } from 'lucide-react';
import { Constellation } from './Constellation';
import { useDotsStore } from '../../store/useDotsStore';

import { BackgroundTransition } from '../common/BackgroundTransition';

const exampleIdeas = [
  {
    type: 'SaaS',
    icon: Zap,
    title: 'Autonomous Incident SRE',
    prompt: 'AI-native cloud reliability platform that auto-detects microservice regressions, performs root cause analysis, and pushes safe canary fixes.',
  },
  {
    type: 'Marketplace',
    icon: ShoppingBag,
    title: 'Student Startup Internships',
    prompt: 'Two-sided AI marketplace connecting university students with fast-growing tech startups through verified proof-of-work project challenges.',
  },
  {
    type: 'Hardware',
    icon: Cpu,
    title: 'Circadian Bio-Sensing Ring',
    prompt: 'Smart titanium ring with medical-grade PPG sensors and on-device TinyML to monitor circadian rhythms, HRV, and sleep architecture.',
  },
];

export const Hero: React.FC = () => {
  const { ideaInput, setIdeaInput, startAnalysis, isAnalyzing, loadDemoMode } = useDotsStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ideaInput.trim() && !isAnalyzing) {
      setIdeaInput('AI platform that helps college students find internships');
    }
    setIsSubmitting(true);
    await startAnalysis(ideaInput.trim() || 'AI platform that helps college students find internships');
  };

  const selectExample = (prompt: string) => {
    setIdeaInput(prompt);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Artwork Layer with Stage 1 -> Stage 2 Transition Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-35 select-none">
        <BackgroundTransition autoCycle={true} cycleInterval={6500} />
      </div>

      {/* Subtle interactive constellation */}
      <Constellation connecting={isSubmitting || isAnalyzing} />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Proposition badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-xs font-medium backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="tracking-wide uppercase text-[11px] text-slate-400 font-semibold">Autonomous Venture OS</span>
          <span className="text-slate-600">|</span>
          <span>Zero to One-Person Startup</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6"
        >
          The founder provides the vision. <br />
          <span className="text-slate-200">
            DOTS builds the AI team
          </span>{' '}
          required to execute it.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Type your startup idea. In seconds, DOTS analyzes the problem space, designs a customized swarm of specialized AI agents, generates your execution graph, and produces production-ready deliverables.
        </motion.p>

        {/* Idea Input Box */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-2xl mx-auto mb-8 w-full"
        >
          <div className="relative rounded-2xl p-1 bg-white/[0.08] border border-white/15 focus-within:border-white/30 transition-all duration-200">
            <div className="relative flex flex-col sm:flex-row items-stretch bg-[#0e121c]/95 backdrop-blur-md rounded-[13px] p-2 sm:p-2.5">
              <textarea
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Describe your startup idea (e.g. AI platform that helps college students find internships, smart ring for sleep tracking, or autonomous B2B ops)..."
                rows={2}
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base px-3.5 py-3 resize-none focus:outline-none font-normal"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <div className="flex sm:flex-col justify-end items-end sm:justify-center pt-2 sm:pt-0 sm:pl-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isAnalyzing}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-sm transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer shadow-sm"
                >
                  {isSubmitting || isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate DOTS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* 3 Clickable Example Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-left max-w-3xl mx-auto mb-10"
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              Click an example to test dynamic team generation:
            </span>
            <button
              type="button"
              onClick={loadDemoMode}
              className="text-xs text-slate-300 hover:text-white font-medium underline underline-offset-4 cursor-pointer"
            >
              Or Launch 1-Click Demo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {exampleIdeas.map((example) => {
              const Icon = example.icon;
              const isSelected = ideaInput === example.prompt;
              return (
                <button
                  key={example.type}
                  type="button"
                  onClick={() => selectExample(example.prompt)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-white/40 bg-white/10 text-white'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white">{example.type}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">Preset</span>
                  </div>
                  <div className="text-xs font-semibold text-white mb-1 line-clamp-1">{example.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {example.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Mascot Character Swarm Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative max-w-3xl mx-auto rounded-2xl border border-white/10 bg-[#0e121c]/80 backdrop-blur-md p-4 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block">
                Meet Your AI Team
              </span>
              <h4 className="text-sm font-bold text-white">
                Autonomous Specialized Agents
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Product, Research, Architecture, and Unit Economics swarms ready to execute.
              </p>
            </div>
            <div className="relative h-16 w-44 rounded-xl overflow-hidden border border-white/10 shrink-0">
              <BackgroundTransition autoCycle={true} cycleInterval={5000} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
