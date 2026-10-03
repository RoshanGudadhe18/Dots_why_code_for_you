import React, { useState } from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { X, Plus, Bot, Check } from 'lucide-react';

interface AddDotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDotModal: React.FC<AddDotModalProps> = ({ isOpen, onClose }) => {
  const { addCustomDot, dots } = useDotsStore();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [toolsInput, setToolsInput] = useState('AgentBrowser, APIConnector, DataSynthesizer');
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !goal.trim()) return;

    const tools = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await addCustomDot(name.trim(), role.trim(), goal.trim(), tools, selectedDependencies);
    onClose();
  };

  const toggleDependency = (dotId: string) => {
    if (selectedDependencies.includes(dotId)) {
      setSelectedDependencies(selectedDependencies.filter((id) => id !== dotId));
    } else {
      setSelectedDependencies([...selectedDependencies, dotId]);
    }
  };

  const presets = [
    {
      name: 'B2B Sales Outbound DOT',
      role: 'Automated Cold Outreach & Lead Qualification',
      goal: 'Identify ICP prospects on LinkedIn, draft hyper-personalized teardown pitches, and book demo calls.',
      tools: 'ApolloScraper, HunterAPI, ColdEmailPipeline',
    },
    {
      name: 'Legal & IP Shield DOT',
      role: 'Patent, Terms of Service & Privacy Architect',
      goal: 'Draft GDPR/FERPA compliant terms, review open-source licensing risks, and generate NDA templates.',
      tools: 'ContractAnalyzer, SECFilingMiner, ComplianceChecker',
    },
    {
      name: 'Community & Viral Growth DOT',
      role: 'Campus Ambassador & Reddit/Discord Orchestration',
      goal: 'Engage in organic niche subreddits, coordinate campus ambassadors, and amplify launch announcements.',
      tools: 'RedditBotEngine, DiscordWebhookHub, SocialSentimentModel',
    },
  ];

  const applyPreset = (preset: (typeof presets)[0]) => {
    setName(preset.name);
    setRole(preset.role);
    setGoal(preset.goal);
    setToolsInput(preset.tools);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-panel bg-[#0e121c] border border-white/15 rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Deploy Custom DOT</h3>
              <p className="text-xs text-slate-400">Add a specialized autonomous agent to your startup DAG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Suggested Agent Roles:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyPreset(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium transition-colors"
              >
                + {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Agent Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Inbound Sales DOT"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Specialization / Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Lead Qualification & Account Outreach"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Autonomous Mandate (Goal)</label>
            <textarea
              required
              rows={3}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe what specific deliverables or actions this DOT executes..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Integrated Tooling (comma-separated)</label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              placeholder="WebSearch, ApolloAPI, DiscordWebhook"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Prerequisite Dependencies
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-1">
              {dots.map((d) => {
                const isSelected = selectedDependencies.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDependency(d.id)}
                    className={`flex items-center justify-between p-2 rounded-lg text-left border text-xs transition-all ${
                      isSelected
                        ? 'border-white/40 bg-white/15 text-white'
                        : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="truncate">{d.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Deploy DOT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
