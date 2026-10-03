import { StartupProfile, StartupType } from '../types';

export const analyzeIdea = async (idea: string): Promise<StartupProfile> => {
  // Simulate intelligent heuristic analysis or call real LLM if configured
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = idea.toLowerCase();

  // Keyword detection for startup type
  let type: StartupType = 'saas';
  const detectedKeywords: string[] = [];

  const hardwareKeywords = [
    'hardware', 'device', 'wearable', 'iot', 'sensor', 'gadget',
    'pcb', 'chip', 'physical', 'ring', 'collar', 'tracker', 'camera', 'robot', 'drone'
  ];
  const marketplaceKeywords = [
    'marketplace', 'connect buyers', 'two-sided', 'freelancers', 'platform connecting',
    'p2p', 'peer-to-peer', 'rent', 'booking', 'matching students', 'hire', 'exchange', 'creators and brands'
  ];
  const serviceKeywords = [
    'agency', 'consulting', 'concierge', 'bookkeeping', 'service', 'audit',
    'done-for-you', 'operations', 'workflow outsourcing'
  ];

  for (const kw of hardwareKeywords) {
    if (lower.includes(kw)) {
      type = 'hardware';
      detectedKeywords.push(kw);
    }
  }
  if (type !== 'hardware') {
    for (const kw of marketplaceKeywords) {
      if (lower.includes(kw)) {
        type = 'marketplace';
        detectedKeywords.push(kw);
      }
    }
  }
  if (type === 'saas') {
    for (const kw of serviceKeywords) {
      if (lower.includes(kw)) {
        type = 'service';
        detectedKeywords.push(kw);
      }
    }
  }

  // Detect industry & extract title
  let industry = 'Technology & Software';
  if (lower.includes('college') || lower.includes('student') || lower.includes('internship') || lower.includes('education') || lower.includes('learn')) {
    industry = 'EdTech / CareerTech';
    detectedKeywords.push('CareerTech');
  } else if (lower.includes('health') || lower.includes('sleep') || lower.includes('bio') || lower.includes('medical') || lower.includes('fitness')) {
    industry = 'HealthTech & Bio-Sensing';
    detectedKeywords.push('HealthTech');
  } else if (lower.includes('finance') || lower.includes('crypto') || lower.includes('payment') || lower.includes('invest')) {
    industry = 'FinTech & Payments';
    detectedKeywords.push('FinTech');
  } else if (lower.includes('dev') || lower.includes('code') || lower.includes('api') || lower.includes('deploy')) {
    industry = 'Developer Tools & Infra';
    detectedKeywords.push('DevTools');
  }

  // Generate structured title
  let title = 'Autonomous Venture';
  if (lower.includes('internship') || (lower.includes('student') && lower.includes('find'))) {
    title = 'TalentOrbit AI — Student Internship Engine';
    type = 'marketplace'; // Can also be marketplace or SaaS
  } else if (lower.includes('smart ring') || lower.includes('ring') || (type === 'hardware' && lower.includes('sleep'))) {
    title = 'AuraRing — Circadian Bio-Sensing Ring';
    type = 'hardware';
  } else if (lower.includes('freelance') || lower.includes('designer') || lower.includes('marketplace')) {
    title = 'GuildSphere — Vetted Talent Marketplace';
    type = 'marketplace';
  } else if (idea.length > 5) {
    const words = idea.split(' ').slice(0, 4).join(' ');
    title = words.charAt(0).toUpperCase() + words.slice(1);
  }

  // Structured profile fields synthesized
  let problem = '';
  let targetUsers = '';
  let product = '';
  let businessModel = '';
  let constraints = '';

  if (type === 'marketplace' || lower.includes('internship')) {
    problem = 'College students spend 40+ hours crafting repetitive resumes for ghost job postings, while growth-stage startups lack bandwidth to screen unproven entry-level candidates.';
    targetUsers = 'Primary: University students & recent grads looking for remote/hybrid internships. Secondary: Seed to Series B founders and engineering leads.';
    product = 'Two-sided AI platform featuring proof-of-work skill assessments, dynamic match-scoring, and one-click interview scheduling with verified startup offers.';
    businessModel = 'Freemium for students ($0 for basic, $12/mo for AI portfolio builder & mock interviewer); 15% first-month placement fee or $249/mo subscription for employers.';
    constraints = 'Must comply with university career fair policies, FERPA/student privacy compliance, and prevent ghosting on both supply and demand sides.';
  } else if (type === 'hardware') {
    problem = 'Current consumer health trackers are bulky wristwatches that disrupt sleep cycles, lack multi-day battery endurance, and lock raw biometric data behind walled gardens.';
    targetUsers = 'Health optimizers, athletes, shift workers, and biohackers seeking continuous sleep architecture and HRV tracking in an ultra-discreet titanium form factor.';
    product = 'Titanium smart ring with medical-grade photoplethysmography (PPG) sensors, skin temperature telemetry, and 7-day battery life with on-device sleep stage classification.';
    businessModel = 'Hardware purchase ($249 landed MSRP) + optional $7.99/mo premium circadian coaching & metabolic insights subscription.';
    constraints = 'Tooling capex ($45k minimum mold cost), BLE RF compliance (FCC/CE Part 15), waterproof sealing IP68, and component supply chain lead times of 12-16 weeks.';
  } else if (type === 'service') {
    problem = 'B2B agencies spend 60% of senior bandwidth on repetitive client intake, manual report generation, and status check-ins rather than high-leverage strategic execution.';
    targetUsers = 'Digital marketing agencies, SEO consultancies, and boutique advisory firms with 5-30 employees.';
    product = 'Autonomous client delivery operating system that turns SOPs into self-driving agent pipelines with white-labeled executive reporting dashboards.';
    businessModel = '$1,499/month per agency workspace with up to 25 active client pipelines; 85%+ software gross margins.';
    constraints = 'Requires seamless zero-code integration with Slack, Notion, Google Drive, and HubSpot without leaking confidential client data across workspaces.';
  } else {
    // SaaS default
    problem = `Founders and teams struggle with fragmented workflows and high manual coordination costs: "${idea.slice(0, 100)}..."`;
    targetUsers = 'B2B knowledge workers, early-stage operators, engineering leads, and autonomous solo-founders.';
    product = `AI-native SaaS application providing real-time synthesis, automated pipeline execution, and unified orchestration for ${title}.`;
    businessModel = 'Tiered SaaS subscription: Starter ($29/user/mo), Pro ($79/user/mo), and Enterprise volume licensing with custom agent seats.';
    constraints = 'Zero-latency sync, SOC2 compliance readiness, fine-grained role-based permissions, and resilient multi-model LLM fallbacks.';
  }

  return {
    title,
    type,
    problem,
    targetUsers,
    product,
    businessModel,
    constraints,
    industry,
    detectedKeywords: Array.from(new Set(detectedKeywords)),
  };
};
