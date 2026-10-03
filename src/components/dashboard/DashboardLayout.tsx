import React, { useState } from 'react';
import { useDotsStore, DashboardTab } from '../../store/useDotsStore';
import { LeftSidebar } from './LeftSidebar';
import { TaskGraphView } from './TaskGraphView';
import { ActivityFeed } from './ActivityFeed';
import { OutputsView } from './OutputsView';
import { SharedMemoryView } from './SharedMemoryView';
import { ApprovalsPanel } from './ApprovalsPanel';
import { AddDotModal } from '../team/AddDotModal';
import { Network, Activity, FileSpreadsheet, Database } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    outputs,
    activities,
    memory,
  } = useDotsStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const tabs: { key: DashboardTab; label: string; icon: React.ElementType; count?: number }[] = [
    { key: 'graph', label: 'Task Graph', icon: Network },
    { key: 'feed', label: 'Activity Feed', icon: Activity, count: activities.length },
    { key: 'outputs', label: 'Deliverables', icon: FileSpreadsheet, count: Object.keys(outputs).length },
    { key: 'memory', label: 'Shared Memory', icon: Database, count: memory.length },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-[#090b10]">
      {/* Workspace Sub-header */}
      <div className="shrink-0 h-12 px-6 border-b border-white/10 bg-[#0d1017] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
            Venture:
          </span>
          <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
            {profile?.title || 'Autonomous Venture'}
          </h2>
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 uppercase">
            {profile?.type}
          </span>
        </div>

        {/* Center Tabs Switcher */}
        <div className="flex items-center gap-1 bg-[#090b10] p-1 rounded-xl border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] font-mono px-1 rounded bg-white/10 text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar onOpenAddModal={() => setIsAddModalOpen(true)} />

        {/* Center Tabbed Workspace */}
        <main className="flex-1 p-3 overflow-hidden flex flex-col min-w-0">
          {activeTab === 'graph' && (
            <TaskGraphView onOpenAddModal={() => setIsAddModalOpen(true)} />
          )}
          {activeTab === 'feed' && <ActivityFeed />}
          {activeTab === 'outputs' && <OutputsView />}
          {activeTab === 'memory' && <SharedMemoryView />}
        </main>

        {/* Right Approvals Panel */}
        <ApprovalsPanel />
      </div>

      {/* Add Custom DOT Modal */}
      <AddDotModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
