import React, { useState } from 'react';
import { useDotsStore } from '../../store/useDotsStore';
import { IconRenderer } from '../common/IconRenderer';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const ApprovalsPanel: React.FC = () => {
  const {
    approvals,
    approveDeliverable,
    requestChanges,
    setSelectedDotId,
    setActiveTab,
  } = useDotsStore();

  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState<string>('');

  const pendingApprovals = approvals.filter((a) => a.status === 'pending');
  const pastApprovals = approvals.filter((a) => a.status !== 'pending');

  const handleApprove = async (id: string) => {
    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7, x: 0.8 },
        colors: ['#ffffff', '#cbd5e1', '#10b981'],
      });
    } catch {
      // safe fallback
    }

    await approveDeliverable(id);
  };

  const handleRejectOrRevise = async (id: string) => {
    if (!feedbackComment.trim()) return;
    await requestChanges(id, feedbackComment.trim());
    setActiveFeedbackId(null);
    setFeedbackComment('');
  };

  const handleViewDeliverable = (dotId: string) => {
    setSelectedDotId(dotId);
    setActiveTab('outputs');
  };

  return (
    <aside className="w-80 shrink-0 flex flex-col bg-[#0b0e16] border-l border-white/10 h-full p-4 overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400 block">
            Executive Control
          </span>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Founder Approvals</span>
            {pendingApprovals.length > 0 && (
              <span className="px-2 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                {pendingApprovals.length}
              </span>
            )}
          </h3>
        </div>
      </div>

      {/* Pending Reviews Queue */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {pendingApprovals.length === 0 ? (
          <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] text-center my-4">
            <CheckCircle2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">Queue Clear</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              When a gated DOT produces a deliverable, it will pause and request your executive review here before downstream tasks proceed.
            </p>
          </div>
        ) : (
          pendingApprovals.map((appr) => {
            const isFeedbackOpen = activeFeedbackId === appr.id;

            return (
              <div
                key={appr.id}
                className="p-3.5 rounded-xl border border-white/15 bg-white/[0.03] transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center p-1">
                      <IconRenderer name={appr.dotIcon} className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {appr.dotName}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">{appr.timestamp}</span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium uppercase font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Pending
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 mb-1">
                  {appr.deliverableTitle}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal mb-3">
                  {appr.summary}
                </p>

                {/* Inspect deliverable button */}
                <button
                  onClick={() => handleViewDeliverable(appr.dotId)}
                  className="w-full mb-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect Deliverable</span>
                </button>

                {/* Action Buttons */}
                {!isFeedbackOpen ? (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleApprove(appr.id)}
                      className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveFeedbackId(appr.id);
                        setFeedbackComment('');
                      }}
                      className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-[11px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Changes</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <label className="text-[10px] uppercase font-mono font-medium text-slate-400 block">
                      Founder Revision Feedback:
                    </label>
                    <textarea
                      rows={2}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="e.g. Focus on Seed-stage startups, add automated video pitch scoring, or change monthly subscription to $19/mo..."
                      className="w-full text-xs bg-black/50 border border-white/20 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:border-white/40"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveFeedbackId(null)}
                        className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRejectOrRevise(appr.id)}
                        disabled={!feedbackComment.trim()}
                        className="px-3 py-1 rounded bg-white hover:bg-slate-200 disabled:opacity-50 text-slate-900 font-semibold text-[11px] flex items-center gap-1 transition-all"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-Run DOT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* History of Past Approvals */}
        {pastApprovals.length > 0 && (
          <div className="pt-4 mt-4 border-t border-white/10">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-slate-400 block mb-2">
              Decision History
            </span>
            <div className="space-y-2">
              {pastApprovals.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] text-[11px]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-300">{item.dotName}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium uppercase ${
                        item.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{item.deliverableTitle}</div>
                  {item.founderComment && (
                    <div className="text-[10px] text-amber-300/80 italic mt-1 line-clamp-2">
                      Feedback: "{item.founderComment}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
