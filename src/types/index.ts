export type StartupType = 'saas' | 'marketplace' | 'hardware' | 'service';

export interface StartupProfile {
  title: string;
  type: StartupType;
  problem: string;
  targetUsers: string;
  product: string;
  businessModel: string;
  constraints: string;
  industry: string;
  detectedKeywords: string[];
}

export type DotStatus = 'idle' | 'working' | 'waiting_approval' | 'done' | 'failed';

export interface DotSpec {
  id: string;
  name: string;
  icon: string;
  role: string;
  goal: string;
  tools: string[];
  dependsOn: string[];
  outputs: string[];
  requiresApproval: boolean;
  status: DotStatus;
  progress?: number; // 0 - 100
  color?: string;
  stage: number; // 1: Research, 2: Product/Specs, 3: Deep Tech/Ops, 4: GTM/Finance
}

export type MemoryType = 'fact' | 'decision' | 'assumption';

export interface MemoryItem {
  id: string;
  type: MemoryType;
  content: string;
  sourceDotId: string;
  sourceDotName: string;
  timestamp: string;
  category?: string;
  confidence?: number;
}

export type ActivityType = 'status' | 'message' | 'artifact' | 'thought' | 'approval_request' | 'system';

export interface ActivityEvent {
  id: string;
  timestamp: string;
  dotId: string;
  dotName: string;
  dotIcon: string;
  type: ActivityType;
  message: string;
  targetDotId?: string;
  targetDotName?: string;
  isRevised?: boolean;
}

export interface CompetitorItem {
  name: string;
  strengths: string;
  weaknesses: string;
  differentiation: string;
  pricing: string;
  sourceUrl: string;
}

export interface MVPFeature {
  id: string;
  title: string;
  description: string;
  priority: 'P0 - Must Have' | 'P1 - Core' | 'P2 - Delight';
  complexity: 'Low' | 'Medium' | 'High';
  targetUserRole: string;
}

export interface UnitEconomicsPoint {
  month: string;
  mrr: number;
  users: number;
  cac: number;
  ltv: number;
  burnRate: number;
}

export interface TechArchitecture {
  frontend: string[];
  backend: string[];
  database: string[];
  aiInfra: string[];
  deployment: string[];
  protocols: string[];
}

export interface LaunchMilestone {
  day: string;
  phase: string;
  action: string;
  channel: string;
  owner: string;
  metric: string;
}

export interface DotOutput {
  dotId: string;
  title: string;
  summary: string;
  type: 'competitor_table' | 'mvp_features' | 'unit_economics' | 'tech_architecture' | 'launch_plan' | 'custom_report';
  timestamp: string;
  isRevised?: boolean;
  revisionComment?: string;
  data: {
    competitors?: CompetitorItem[];
    mvpFeatures?: MVPFeature[];
    unitEconomics?: UnitEconomicsPoint[];
    techArchitecture?: TechArchitecture;
    launchPlan?: LaunchMilestone[];
    customContent?: {
      heading: string;
      items: { label: string; value: string }[];
      prose: string;
    };
  };
  sources?: { title: string; url: string }[];
}

export interface FounderApproval {
  id: string;
  dotId: string;
  dotName: string;
  dotIcon: string;
  deliverableTitle: string;
  summary: string;
  status: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  founderComment?: string;
  timestamp: string;
  outputId?: string;
}

export interface GraphNodeData {
  [key: string]: unknown;
  id: string;
  label: string;
  name: string;
  icon: string;
  role: string;
  status: DotStatus;
  progress?: number;
  requiresApproval: boolean;
  color?: string;
  tools: string[];
  dependsOn: string[];
  outputs: string[];
}
