import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  DollarSign,
  AlertCircle,
  Tag,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useDotsStore } from '../../store/useDotsStore';
import { StartupType } from '../../types';

export const ProfileEditor: React.FC = () => {
  const { profile, updateProfile, confirmProfileAndGenerateTeam, startAnalysis, ideaInput } =
    useDotsStore();

  if (!profile) return null;

  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    updateProfile({ [field]: value });
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2000);
  };

  const startupTypes: { value: StartupType; label: string; badge: string }[] = [
    { value: 'saas', label: 'B2B SaaS / DevTools', badge: 'Software Architecture' },
    { value: 'marketplace', label: 'Two-Sided Marketplace', badge: 'Liquidity & Growth' },
    { value: 'hardware', label: 'Connected Hardware / IoT', badge: 'BOM & Supply Chain' },
    { value: 'service', label: 'Productized Service / Ops', badge: 'Automated SOPs' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Venture Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Verify & Customize Your Startup Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every parameter directly informs the autonomy bounds and specialized tooling of your AI team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => startAnalysis(ideaInput)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Analyze</span>
          </button>

          <button
            onClick={confirmProfileAndGenerateTeam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Generate AI Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isSavedAlert && (
        <div className="mb-6 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>Profile changes auto-saved to agent synthesis graph.</span>
        </div>
      )}

      {/* Main Grid: Form controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main parameters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Venture Title */}
          <div className="glass-panel p-5 rounded-2xl">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Venture Name & Title
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Problem Statement */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Core Problem Statement (The Wedge)
              </label>
            </div>
            <textarea
              rows={3}
              value={profile.problem}
              onChange={(e) => handleFieldChange('problem', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-white/30"
              placeholder="What core friction does this venture solve?"
            />
          </div>

          {/* Target Users */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Target Users & Ideal Customer Profile
              </label>
            </div>
            <textarea
              rows={2}
              value={profile.targetUsers}
              onChange={(e) => handleFieldChange('targetUsers', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-white/30"
              placeholder="Who are the primary buyers and end users?"
            />
          </div>

          {/* Product Mechanism */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Core Product Proposition
              </label>
            </div>
            <textarea
              rows={3}
              value={profile.product}
              onChange={(e) => handleFieldChange('product', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-white/30"
              placeholder="How does the product fundamentally solve this problem?"
            />
          </div>

          {/* Business Model */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Monetization & Business Model
              </label>
            </div>
            <textarea
              rows={2}
              value={profile.businessModel}
              onChange={(e) => handleFieldChange('businessModel', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-white/30"
              placeholder="Subscription tiers, take rates, hardware margins, or agency retainers..."
            />
          </div>

          {/* Constraints */}
          <div className="glass-panel p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Engineering, Regulatory & Budget Constraints
              </label>
            </div>
            <textarea
              rows={2}
              value={profile.constraints}
              onChange={(e) => handleFieldChange('constraints', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-slate-200 leading-relaxed focus:outline-none focus:border-white/30"
              placeholder="Compliance, latency constraints, battery limits, API quotas, or capex ceilings..."
            />
          </div>
        </div>

        {/* Right 1 Col: Metadata & Startup Archetype Selector */}
        <div className="space-y-6">
          {/* Startup Archetype Selector */}
          <div className="glass-panel p-5 rounded-2xl">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Startup Archetype
            </label>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Changing this dynamically recomposes your AI agent department hierarchy and task graph.
            </p>

            <div className="space-y-2">
              {startupTypes.map((st) => {
                const isSelected = profile.type === st.value;
                return (
                  <button
                    key={st.value}
                    type="button"
                    onClick={() => handleFieldChange('type', st.value)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{st.label}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{st.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industry & Keywords */}
          <div className="glass-panel p-5 rounded-2xl">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Industry Vertical
            </label>
            <input
              type="text"
              value={profile.industry}
              onChange={(e) => handleFieldChange('industry', e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white mb-4 focus:outline-none focus:border-white/30"
            />

            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Extracted Intent Signals
            </label>
            <div className="flex flex-wrap gap-1.5">
              {profile.detectedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Card */}
          <div className="p-5 rounded-2xl glass-panel border border-white/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
              Ready for Agent Assembly?
            </h4>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              DOTS will synthesize your team, provision their toolchains, and construct your dependency DAG.
            </p>
            <button
              onClick={confirmProfileAndGenerateTeam}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-sm transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Build AI Team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
