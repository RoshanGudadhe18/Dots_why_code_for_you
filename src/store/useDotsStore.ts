import { create } from 'zustand';
import {
  StartupProfile,
  DotSpec,
  DotStatus,
  MemoryItem,
  ActivityEvent,
  DotOutput,
  FounderApproval,
} from '../types';
import { analyzeIdea, generateDots, planTasks, runDot, TaskGraph, createCustomDot } from '../engine';

export type AppStep = 'landing' | 'analyzing' | 'profile' | 'team' | 'dashboard';
export type DashboardTab = 'graph' | 'feed' | 'outputs' | 'memory';

interface DotsState {
  // Navigation & View
  currentStep: AppStep;
  activeTab: DashboardTab;
  selectedDotId: string | null;
  demoMode: boolean;

  // Startup Data
  ideaInput: string;
  profile: StartupProfile | null;
  dots: DotSpec[];
  graph: TaskGraph | null;

  // Simulation & Runtime state
  isAnalyzing: boolean;
  analyzingStep: number;
  isSimulating: boolean;
  simulationAborted: boolean;

  // Artifacts & Collaboration
  memory: MemoryItem[];
  activities: ActivityEvent[];
  outputs: Record<string, DotOutput>;
  approvals: FounderApproval[];

  // Actions
  setIdeaInput: (idea: string) => void;
  setCurrentStep: (step: AppStep) => void;
  setActiveTab: (tab: DashboardTab) => void;
  setSelectedDotId: (id: string | null) => void;
  setDemoMode: (enabled: boolean) => void;

  // Workflow steps
  startAnalysis: (ideaText?: string) => Promise<void>;
  updateProfile: (updated: Partial<StartupProfile>) => void;
  confirmProfileAndGenerateTeam: () => Promise<void>;
  updateDot: (id: string, updates: Partial<DotSpec>) => Promise<void>;
  removeDot: (id: string) => Promise<void>;
  addCustomDot: (name: string, role: string, goal: string, tools: string[], dependsOn: string[]) => Promise<void>;
  proceedToDashboard: () => Promise<void>;

  // Simulation
  runEntireOrganization: () => Promise<void>;
  runSingleDot: (dotId: string, feedback?: string) => Promise<void>;
  abortSimulation: () => void;

  // Approvals
  approveDeliverable: (approvalId: string) => Promise<void>;
  rejectDeliverable: (approvalId: string, comment: string) => Promise<void>;
  requestChanges: (approvalId: string, comment: string) => Promise<void>;

  // Demo mode
  loadDemoMode: () => Promise<void>;
  resetAll: () => void;
}

export const useDotsStore = create<DotsState>((set, get) => ({
  currentStep: 'landing',
  activeTab: 'graph',
  selectedDotId: null,
  demoMode: false,

  ideaInput: '',
  profile: null,
  dots: [],
  graph: null,

  isAnalyzing: false,
  analyzingStep: 0,
  isSimulating: false,
  simulationAborted: false,

  memory: [],
  activities: [],
  outputs: {},
  approvals: [],

  setIdeaInput: (idea) => set({ ideaInput: idea }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedDotId: (id) => set({ selectedDotId: id }),
  setDemoMode: (enabled) => set({ demoMode: enabled }),

  startAnalysis: async (ideaText) => {
    const text = ideaText || get().ideaInput || 'AI platform that helps college students find internships';
    set({
      ideaInput: text,
      currentStep: 'analyzing',
      isAnalyzing: true,
      analyzingStep: 1,
    });

    // Animate scanning steps
    await new Promise((r) => setTimeout(r, 650));
    set({ analyzingStep: 2 });
    await new Promise((r) => setTimeout(r, 650));
    set({ analyzingStep: 3 });

    const analyzedProfile = await analyzeIdea(text);

    await new Promise((r) => setTimeout(r, 500));
    set({
      profile: analyzedProfile,
      isAnalyzing: false,
      analyzingStep: 4,
      currentStep: 'profile',
    });
  },

  updateProfile: (updated) => {
    const current = get().profile;
    if (!current) return;
    set({ profile: { ...current, ...updated } });
  },

  confirmProfileAndGenerateTeam: async () => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    set({ currentStep: 'team' });
    const generatedDots = await generateDots(currentProfile);
    const initialGraph = await planTasks(generatedDots);

    set({
      dots: generatedDots,
      graph: initialGraph,
    });
  },

  updateDot: async (id, updates) => {
    const updatedDots = get().dots.map((d) => (d.id === id ? { ...d, ...updates } : d));
    const updatedGraph = await planTasks(updatedDots);
    set({ dots: updatedDots, graph: updatedGraph });
  },

  removeDot: async (id) => {
    const remainingDots = get().dots.filter((d) => d.id !== id);
    // Remove dependencies pointing to the removed dot
    const cleanedDots = remainingDots.map((d) => ({
      ...d,
      dependsOn: d.dependsOn.filter((depId) => depId !== id),
    }));
    const updatedGraph = await planTasks(cleanedDots);
    set({ dots: cleanedDots, graph: updatedGraph });
  },

  addCustomDot: async (name, role, goal, tools, dependsOn) => {
    const newDot = createCustomDot(name, role, goal, tools, dependsOn, 3, false);
    const updatedDots = [...get().dots, newDot];
    const updatedGraph = await planTasks(updatedDots);
    set({ dots: updatedDots, graph: updatedGraph });
  },

  proceedToDashboard: async () => {
    const dots = get().dots;
    const graph = await planTasks(dots);
    set({
      currentStep: 'dashboard',
      graph,
      activeTab: 'graph',
    });
  },

  abortSimulation: () => {
    set({ simulationAborted: true, isSimulating: false });
  },

  runSingleDot: async (dotId: string, feedback?: string) => {
    const currentDots = get().dots;
    const targetDot = currentDots.find((d) => d.id === dotId);
    if (!targetDot) return;

    // Set dot to working
    set({
      dots: get().dots.map((d) => (d.id === dotId ? { ...d, status: 'working', progress: 5 } : d)),
    });

    // Re-plan graph to show glowing active state
    const workingGraph = await planTasks(get().dots);
    set({ graph: workingGraph });

    const output = await runDot(targetDot, get().memory, feedback, {
      onProgress: (p) => {
        set({
          dots: get().dots.map((d) => (d.id === dotId ? { ...d, progress: p } : d)),
        });
      },
      onActivity: (act) => {
        const newAct: ActivityEvent = {
          id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ...act,
        };
        set({ activities: [newAct, ...get().activities] });
      },
      onMemoryWrite: (mem) => {
        const newMem: MemoryItem = {
          id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ...mem,
        };
        set({ memory: [newMem, ...get().memory] });
      },
    });

    // Determine final status: if requiresApproval, mark 'waiting_approval', else 'done'
    const finalStatus: DotStatus = targetDot.requiresApproval ? 'waiting_approval' : 'done';

    // If waiting for approval, add approval item to queue
    let updatedApprovals = [...get().approvals];
    if (targetDot.requiresApproval) {
      // Remove any existing pending approval for this dot
      updatedApprovals = updatedApprovals.filter((a) => a.dotId !== dotId);
      updatedApprovals.unshift({
        id: `appr-${dotId}-${Date.now()}`,
        dotId: targetDot.id,
        dotName: targetDot.name,
        dotIcon: targetDot.icon,
        deliverableTitle: output.title,
        summary: output.summary,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        outputId: dotId,
      });
    }

    const finalDots = get().dots.map((d) =>
      d.id === dotId ? { ...d, status: finalStatus, progress: 100 } : d
    );
    const finalOutputs = { ...get().outputs, [dotId]: output };
    const finalGraph = await planTasks(finalDots);

    set({
      dots: finalDots,
      outputs: finalOutputs,
      approvals: updatedApprovals,
      graph: finalGraph,
    });
  },

  runEntireOrganization: async () => {
    if (get().isSimulating) return;

    set({ isSimulating: true, simulationAborted: false });

    // Helper to check if dot can run: its dependencies are either empty or all 'done'
    const canRun = (dot: DotSpec, dotsState: DotSpec[]) => {
      if (dot.status === 'done' || dot.status === 'working' || dot.status === 'waiting_approval') {
        return false;
      }
      if (dot.dependsOn.length === 0) return true;
      return dot.dependsOn.every((depId) => {
        const dep = dotsState.find((d) => d.id === depId);
        return dep ? dep.status === 'done' : true;
      });
    };

    // System announcement
    const startAct: ActivityEvent = {
      id: `act-sys-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dotId: 'system',
      dotName: 'DOTS Core Orchestrator',
      dotIcon: 'Sparkles',
      type: 'system',
      message: 'Autonomous organization simulation initiated. Resolving execution DAG and parallel agent slots...',
    };
    set({ activities: [startAct, ...get().activities] });

    // Loop until all runnable dots are done or waiting approval
    while (get().isSimulating && !get().simulationAborted) {
      const currentDots = get().dots;
      const readyDots = currentDots.filter((d) => canRun(d, currentDots));

      if (readyDots.length === 0) {
        // Check if any dots are currently working or if we're done/waiting for approval
        const anyWorking = currentDots.some((d) => d.status === 'working');
        if (!anyWorking) {
          // Simulation round completed
          break;
        }
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }

      // Execute ready dots in parallel! (For example Research & User Research in parallel)
      await Promise.all(
        readyDots.map((dot) => get().runSingleDot(dot.id))
      );

      // Short breathing room between dependency waves
      await new Promise((r) => setTimeout(r, 400));
    }

    set({ isSimulating: false });
  },

  approveDeliverable: async (approvalId: string) => {
    const approval = get().approvals.find((a) => a.id === approvalId);
    if (!approval) return;

    // Mark approval as approved
    const updatedApprovals = get().approvals.map((a) =>
      a.id === approvalId ? { ...a, status: 'approved' as const } : a
    );

    // Mark corresponding DOT as done
    const updatedDots = get().dots.map((d) =>
      d.id === approval.dotId ? { ...d, status: 'done' as const } : d
    );
    const updatedGraph = await planTasks(updatedDots);

    // Announce approval
    const approvalAct: ActivityEvent = {
      id: `act-appr-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dotId: approval.dotId,
      dotName: approval.dotName,
      dotIcon: approval.dotIcon,
      type: 'system',
      message: `Founder approved deliverable: "${approval.deliverableTitle}". Unlocking downstream dependent agents.`,
    };

    set({
      approvals: updatedApprovals,
      dots: updatedDots,
      graph: updatedGraph,
      activities: [approvalAct, ...get().activities],
    });

    // Check if auto-run should continue to unlock downstream nodes
    if (get().isSimulating) {
      get().runEntireOrganization();
    }
  },

  rejectDeliverable: async (approvalId: string, comment: string) => {
    const approval = get().approvals.find((a) => a.id === approvalId);
    if (!approval) return;

    const updatedApprovals = get().approvals.map((a) =>
      a.id === approvalId
        ? { ...a, status: 'rejected' as const, founderComment: comment }
        : a
    );

    const rejectAct: ActivityEvent = {
      id: `act-rej-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      dotId: approval.dotId,
      dotName: approval.dotName,
      dotIcon: approval.dotIcon,
      type: 'thought',
      message: `Founder rejected deliverable with guidance: "${comment}". Re-running synthesis...`,
    };

    set({
      approvals: updatedApprovals,
      activities: [rejectAct, ...get().activities],
    });

    // Re-run the dot with feedback!
    await get().runSingleDot(approval.dotId, comment);
  },

  requestChanges: async (approvalId: string, comment: string) => {
    await get().rejectDeliverable(approvalId, comment);
  },

  loadDemoMode: async () => {
    const demoIdea = 'AI platform that helps college students find internships';
    set({ demoMode: true });
    await get().startAnalysis(demoIdea);
    await get().confirmProfileAndGenerateTeam();
    await get().proceedToDashboard();
    // Automatically trigger run to show complete live simulation
    await get().runEntireOrganization();
  },

  resetAll: () => {
    set({
      currentStep: 'landing',
      activeTab: 'graph',
      selectedDotId: null,
      demoMode: false,
      ideaInput: '',
      profile: null,
      dots: [],
      graph: null,
      isAnalyzing: false,
      analyzingStep: 0,
      isSimulating: false,
      simulationAborted: false,
      memory: [],
      activities: [],
      outputs: {},
      approvals: [],
    });
  },
}));
