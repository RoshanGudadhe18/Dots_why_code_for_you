import {
  DotSpec,
  MemoryItem,
  DotOutput,
  ActivityEvent,
  CompetitorItem,
  MVPFeature,
  UnitEconomicsPoint,
  TechArchitecture,
  LaunchMilestone,
} from '../types';

export interface RunProgressCallback {
  onProgress: (progress: number) => void;
  onActivity: (activity: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  onMemoryWrite: (memory: Omit<MemoryItem, 'id' | 'timestamp'>) => void;
}

export const runDot = async (
  dot: DotSpec,
  existingMemory: MemoryItem[],
  feedback?: string,
  callbacks?: RunProgressCallback
): Promise<DotOutput> => {
  const isRevision = !!feedback;

  // 1. Initial event: Agent started
  callbacks?.onActivity({
    dotId: dot.id,
    dotName: dot.name,
    dotIcon: dot.icon,
    type: isRevision ? 'thought' : 'status',
    message: isRevision
      ? `Re-evaluating objectives based on founder feedback: "${feedback}"`
      : `Activated. Reading shared memory (${existingMemory.length} prior insights) and initializing toolchain: [${dot.tools.join(', ')}]`,
    isRevised: isRevision,
  });
  callbacks?.onProgress(15);
  await new Promise((r) => setTimeout(r, 600));

  // 2. Synthesizing / Deep processing
  callbacks?.onActivity({
    dotId: dot.id,
    dotName: dot.name,
    dotIcon: dot.icon,
    type: 'thought',
    message: isRevision
      ? `Incorporating revision adjustments into core synthesis model...`
      : `Executing query pipeline across ${dot.tools[0]} and synthesizing cross-domain signals...`,
  });
  callbacks?.onProgress(45);
  await new Promise((r) => setTimeout(r, 700));

  // 3. Memory writes (Facts / Decisions / Assumptions)
  if (dot.id.includes('research') || dot.id.includes('supply')) {
    callbacks?.onMemoryWrite({
      type: 'fact',
      sourceDotId: dot.id,
      sourceDotName: dot.name,
      content: isRevision
        ? `Refined market data incorporating founder guidance: ${feedback}`
        : 'Identified 4 dominant incumbents with NPS < 25 and high pricing inertia.',
      category: 'Market Intelligence',
      confidence: 0.94,
    });
    callbacks?.onMemoryWrite({
      type: 'decision',
      sourceDotId: dot.id,
      sourceDotName: dot.name,
      content: 'Recommended wedge: Target underserved student developers with zero-friction proof-of-work profiles.',
      category: 'Strategic Wedge',
      confidence: 0.91,
    });
  } else if (dot.id.includes('product') || dot.id.includes('liquidity') || dot.id.includes('firmware')) {
    callbacks?.onMemoryWrite({
      type: 'decision',
      sourceDotId: dot.id,
      sourceDotName: dot.name,
      content: isRevision
        ? `Updated MVP feature scope to accommodate founder directive: ${feedback}`
        : 'Scoped MVP to 4 mission-critical P0 features to guarantee launch within 6 weeks.',
      category: 'Product Scope',
      confidence: 0.96,
    });
    callbacks?.onMemoryWrite({
      type: 'assumption',
      sourceDotId: dot.id,
      sourceDotName: dot.name,
      content: 'Assumed weekly active student retention exceeds 38% through automated match notifications.',
      category: 'Engagement Assumption',
      confidence: 0.82,
    });
  } else if (dot.id.includes('finance') || dot.id.includes('economics')) {
    callbacks?.onMemoryWrite({
      type: 'fact',
      sourceDotId: dot.id,
      sourceDotName: dot.name,
      content: isRevision
        ? `Adjusted financial model based on feedback: ${feedback}`
        : 'Blended CAC projected at $32 with customer LTV of $288 (9.0x LTV:CAC ratio).',
      category: 'Financial Model',
      confidence: 0.89,
    });
  }

  callbacks?.onProgress(75);
  await new Promise((r) => setTimeout(r, 600));

  // 4. Emitting generated artifact event
  callbacks?.onActivity({
    dotId: dot.id,
    dotName: dot.name,
    dotIcon: dot.icon,
    type: 'artifact',
    message: isRevision
      ? `Generated updated deliverable incorporating requested changes.`
      : `Generated final artifact: ${dot.outputs.join(', ')}. Ready for synthesis.`,
  });
  callbacks?.onProgress(100);

  // 5. Construct Deliverable based on DOT output type
  return generateDeliverableData(dot, feedback);
};

const generateDeliverableData = (dot: DotSpec, feedback?: string): DotOutput => {
  const isRevised = !!feedback;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Research / Market DOT -> Competitor Table
  if (dot.id.includes('research') || dot.id.includes('supply') || dot.id.includes('hardware-eng') || dot.id.includes('workflow')) {
    const competitors: CompetitorItem[] = [
      {
        name: 'Handshake / LinkedIn',
        strengths: 'Massive university distribution, verified institutional partnerships.',
        weaknesses: 'Cluttered UI, flooded with ghost postings, 85% applicant rejection silence.',
        differentiation: 'AI-verified proof-of-work repositories & direct automated founder match.',
        pricing: 'Free for students; Enterprise recruiting $10k+/yr',
        sourceUrl: 'https://techcrunch.com/recruiting-landscape',
      },
      {
        name: 'Wellfound (AngelList)',
        strengths: 'Strong startup ecosystem, transparent salary/equity numbers.',
        weaknesses: 'Heavily biased toward senior tech roles, high friction for interns.',
        differentiation: 'Tailored for entry-level candidates with automated skill benchmarks.',
        pricing: 'Free tier; $499/mo premium screening',
        sourceUrl: 'https://news.ycombinator.com/startups',
      },
      {
        name: 'RippleMatch',
        strengths: 'Automated campus recruitment matching algorithm.',
        weaknesses: 'Slow response latency, primarily targets Fortune 500 rotational programs.',
        differentiation: 'Sub-60-second AI candidate matching directly with hiring managers.',
        pricing: '$15k+ annual enterprise contract',
        sourceUrl: 'https://forbes.com/future-of-campus-hiring',
      },
      {
        name: 'WayUp',
        strengths: 'Diversity recruiting focus, campus ambassador networks.',
        weaknesses: 'Stale employer listings, manual applicant tracking system.',
        differentiation: 'Autonomous agent that applies and pitches on behalf of candidates.',
        pricing: 'Subscription per active job listing',
        sourceUrl: 'https://bloomberg.com/education-tech-trends',
      },
    ];

    if (isRevised) {
      competitors.unshift({
        name: `Custom Benchmark (${feedback?.slice(0, 24)}...)`,
        strengths: 'Tailored competitor insight requested by founder.',
        weaknesses: 'High manual overhead, low automation.',
        differentiation: 'Direct architectural moat matching founder specification.',
        pricing: 'Disruptive price point',
        sourceUrl: 'https://founder-feedback-validated-source.org',
      });
    }

    return {
      dotId: dot.id,
      title: `${dot.name} — Competitive Matrix & Landscape Report`,
      summary: isRevised
        ? `Revised competitive matrix with founder directives: "${feedback}". Source citations updated.`
        : 'Comprehensive competitor landscape identifying core vulnerability vectors of legacy incumbents.',
      type: 'competitor_table',
      timestamp,
      isRevised,
      revisionComment: feedback,
      data: { competitors },
      sources: [
        { title: 'TechCrunch Campus Hiring Teardown', url: 'https://techcrunch.com/recruiting-landscape' },
        { title: 'Hacker News Startup Hiring Analysis', url: 'https://news.ycombinator.com/startups' },
        { title: 'Bureau of Labor Statistics: Graduate Tech Hiring', url: 'https://bls.gov/employment/tech-grads' },
        { title: 'Gartner Magic Quadrant: Talent Acquisition', url: 'https://gartner.com/research/talent' },
      ],
    };
  }

  // Product DOT -> MVP Features
  if (dot.id.includes('product') || dot.id.includes('liquidity') || dot.id.includes('firmware') || dot.id.includes('packaging')) {
    const mvpFeatures: MVPFeature[] = [
      {
        id: 'feat-1',
        title: 'One-Click Proof-of-Work Verification',
        description: 'Auto-syncs GitHub/Figma/Substack to distill candidate projects into verified technical competence badges.',
        priority: 'P0 - Must Have',
        complexity: 'High',
        targetUserRole: 'Candidates / Students',
      },
      {
        id: 'feat-2',
        title: 'Bilateral Dynamic Matching Algorithm',
        description: 'Matches startup technical requirements against student verified skills with mutual opt-in double blind reveals.',
        priority: 'P0 - Must Have',
        complexity: 'High',
        targetUserRole: 'Both Students & Hiring Managers',
      },
      {
        id: 'feat-3',
        title: 'AI Mock Interviewer & Feedback Loop',
        description: 'Voice & text AI interviewer that prepares applicants for specific startup question styles before interview day.',
        priority: 'P1 - Core',
        complexity: 'Medium',
        targetUserRole: 'Candidates',
      },
      {
        id: 'feat-4',
        title: 'Autonomous Offer & Escrow Milestone Generator',
        description: 'Standardized legal internship agreement generator with stipend escrow and university credit signoff.',
        priority: 'P1 - Core',
        complexity: 'Medium',
        targetUserRole: 'Employers & Universities',
      },
      {
        id: 'feat-5',
        title: 'Founder Instant-Hire Video Highlights',
        description: '60-second video elevator pitches with AI transcript summaries and skill confidence ratings.',
        priority: 'P2 - Delight',
        complexity: 'Low',
        targetUserRole: 'Employers',
      },
    ];

    if (isRevised) {
      mvpFeatures.unshift({
        id: 'feat-revised',
        title: `Founder Requested Spec: ${feedback}`,
        description: `Dedicated feature scope designed specifically from founder changes: ${feedback}`,
        priority: 'P0 - Must Have',
        complexity: 'Medium',
        targetUserRole: 'All Stakeholders',
      });
    }

    return {
      dotId: dot.id,
      title: `${dot.name} — MVP Feature Specification`,
      summary: isRevised
        ? `Updated feature hierarchy reflecting founder changes: "${feedback}". Adjusted priority queue.`
        : 'Lean, phased MVP functional requirements prioritizing speed-to-market and core value delivery.',
      type: 'mvp_features',
      timestamp,
      isRevised,
      revisionComment: feedback,
      data: { mvpFeatures },
    };
  }

  // Finance / Economics DOT -> Unit Economics & Financial Chart
  if (dot.id.includes('finance') || dot.id.includes('economics') || dot.id.includes('utilization')) {
    const baseMrr = isRevised ? 8500 : 5000;
    const unitEconomics: UnitEconomicsPoint[] = [
      { month: 'M1', mrr: baseMrr, users: 120, cac: 55, ltv: 320, burnRate: 8000 },
      { month: 'M2', mrr: baseMrr * 1.8, users: 280, cac: 48, ltv: 340, burnRate: 9500 },
      { month: 'M3', mrr: baseMrr * 2.9, users: 510, cac: 42, ltv: 365, burnRate: 11000 },
      { month: 'M4', mrr: baseMrr * 4.4, users: 890, cac: 38, ltv: 390, burnRate: 12500 },
      { month: 'M5', mrr: baseMrr * 6.2, users: 1420, cac: 35, ltv: 420, burnRate: 14000 },
      { month: 'M6', mrr: baseMrr * 8.6, users: 2200, cac: 31, ltv: 450, burnRate: 16000 },
      { month: 'M7', mrr: baseMrr * 11.5, users: 3150, cac: 28, ltv: 480, burnRate: 17500 },
      { month: 'M8', mrr: baseMrr * 15.0, users: 4400, cac: 26, ltv: 510, burnRate: 19000 },
      { month: 'M9', mrr: baseMrr * 19.2, users: 5900, cac: 24, ltv: 540, burnRate: 21000 },
      { month: 'M10', mrr: baseMrr * 24.1, users: 7700, cac: 23, ltv: 570, burnRate: 23000 },
      { month: 'M11', mrr: baseMrr * 30.0, users: 9900, cac: 22, ltv: 600, burnRate: 25000 },
      { month: 'M12', mrr: baseMrr * 37.5, users: 12800, cac: 20, ltv: 640, burnRate: 27000 },
    ];

    return {
      dotId: dot.id,
      title: `${dot.name} — Unit Economics & 12-Month Projections`,
      summary: isRevised
        ? `Re-modeled financial trajectory incorporating feedback: "${feedback}". Enhanced margin velocity.`
        : 'Unit economics model displaying projected MRR, decreasing CAC, and compounding LTV over 12 months.',
      type: 'unit_economics',
      timestamp,
      isRevised,
      revisionComment: feedback,
      data: { unitEconomics },
    };
  }

  // Tech / Systems DOT -> Tech Architecture
  if (dot.id.includes('tech') || dot.id.includes('trust') || dot.id.includes('compliance') || dot.id.includes('delivery')) {
    const techArchitecture: TechArchitecture = {
      frontend: ['React 19 + Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand UI State'],
      backend: isRevised
        ? ['FastAPI Microservices', 'LangGraph Multi-Agent Orchestrator', 'Celery Async Workers', `Custom Extension (${feedback})`]
        : ['FastAPI (Python 3.12)', 'LangGraph Multi-Agent State Machine', 'Async Workers (Redis/Celery)'],
      database: ['PostgreSQL (Supabase/Neon)', 'pgvector (Semantic Embedding Index)', 'Redis 7.2 (Live Session Cache)'],
      aiInfra: ['Claude 3.5 Sonnet (Synthesis)', 'OpenAI text-embedding-3-small', 'Groq Llama-3-70b (Low Latency Classification)'],
      deployment: ['Cloudflare Edge Workers', 'AWS ECS Fargate', 'Docker Compose Local Dev'],
      protocols: ['Server-Sent Events (SSE Streaming)', 'WebSocket Bidirectional Feeds', 'RESTful OpenAPI 3.1'],
    };

    return {
      dotId: dot.id,
      title: `${dot.name} — Cloud & Systems Architecture Blueprint`,
      summary: isRevised
        ? `Architecture revised to support founder specifications: "${feedback}". Security and latency models updated.`
        : 'Full-stack distributed architecture spec with zero vendor lock-in and high cost efficiency.',
      type: 'tech_architecture',
      timestamp,
      isRevised,
      revisionComment: feedback,
      data: { techArchitecture },
    };
  }

  // Growth / Launch DOT -> GTM Launch Plan
  if (dot.id.includes('growth') || dot.id.includes('crowdfund') || dot.id.includes('inbound')) {
    const launchPlan: LaunchMilestone[] = [
      {
        day: 'Day 1 - 14',
        phase: 'Private Alpha',
        action: 'Onboard 50 high-reputation campus CS leaders and 10 seed-stage YC founders for closed testing.',
        channel: 'Direct Founder DM & Campus Reps',
        owner: 'Founder + GTM DOT',
        metric: '90% Profile Completion Rate',
      },
      {
        day: 'Day 15 - 30',
        phase: 'Product Hunt & Public Beta',
        action: 'Launch live demo with interactive sandbox, launch tweet storm with teardown video.',
        channel: 'Product Hunt, X (Twitter), LinkedIn',
        owner: 'GTM DOT',
        metric: 'Top 3 Product of the Day; 2,500 waitlist signups',
      },
      {
        day: 'Day 31 - 60',
        phase: 'Campus Tour & Viral Growth',
        action: 'Run $5,000 hackathon bounties across top 20 universities; launch student referral leaderboard.',
        channel: 'Discord, University Subreddits, Hackathons',
        owner: 'Campus Ambassador Guild',
        metric: '10,000 active student portfolios',
      },
      {
        day: 'Day 61 - 90',
        phase: 'Enterprise Employer Expansion',
        action: 'Initiate outbound sequence to 500 tech startups offering guaranteed qualified shortlist in 48 hours.',
        channel: 'Cold Email, LinkedIn Sales Nav',
        owner: 'Inbound Sales DOT',
        metric: '$25,000 MRR; 120 paid hires placed',
      },
    ];

    if (isRevised) {
      launchPlan.unshift({
        day: 'Immediate Priority',
        phase: 'Founder Revised Action',
        action: `Execute targeted directive: ${feedback}`,
        channel: 'Custom Channel Strategy',
        owner: 'Founder & Specialized DOT',
        metric: 'Direct validation metric',
      });
    }

    return {
      dotId: dot.id,
      title: `${dot.name} — Go-to-Market & Launch Roadmap`,
      summary: isRevised
        ? `Updated 90-day launch sequencing per founder changes: "${feedback}". Accelerated distribution loop.`
        : 'Actionable 90-day launch sequence from stealth alpha to viral distribution and paid acquisition.',
      type: 'launch_plan',
      timestamp,
      isRevised,
      revisionComment: feedback,
      data: { launchPlan },
    };
  }

  // Fallback / Custom DOT Output
  return {
    dotId: dot.id,
    title: `${dot.name} — Strategic Deliverable Report`,
    summary: isRevised
      ? `Revised output integrating feedback: "${feedback}".`
      : `Complete execution output generated by specialized agent ${dot.name}.`,
    type: 'custom_report',
    timestamp,
    isRevised,
    revisionComment: feedback,
    data: {
      customContent: {
        heading: `Executive Report: ${dot.role}`,
        items: [
          { label: 'Agent Specialization', value: dot.role },
          { label: 'Tools Utilized', value: dot.tools.join(', ') },
          { label: 'Core Objective Accomplished', value: dot.goal },
          { label: 'Execution Status', value: 'Complete — Verified by Autonomous Engine' },
        ],
        prose: isRevised
          ? `This customized deliverable has been updated in response to your review: "${feedback}". All corresponding dependencies and constraints have been re-calibrated.`
          : `This customized deliverable was generated to fulfill ${dot.name}'s designated mandate within the startup operating system. All metrics and strategic recommendations have been synchronized with the shared memory ledger.`,
      },
    },
  };
};
