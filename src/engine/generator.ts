import { DotSpec, StartupProfile } from '../types';
import { saasDotsTemplate } from './templates/saas';
import { marketplaceDotsTemplate } from './templates/marketplace';
import { hardwareDotsTemplate } from './templates/hardware';
import { serviceDotsTemplate } from './templates/service';

export const generateDots = async (profile: StartupProfile): Promise<DotSpec[]> => {
  // Simulate intelligent team generation delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  let baseTemplate: DotSpec[];

  switch (profile.type) {
    case 'hardware':
      baseTemplate = hardwareDotsTemplate;
      break;
    case 'marketplace':
      baseTemplate = marketplaceDotsTemplate;
      break;
    case 'service':
      baseTemplate = serviceDotsTemplate;
      break;
    case 'saas':
    default:
      baseTemplate = saasDotsTemplate;
      break;
  }

  // Deep clone and tailor to startup profile
  return baseTemplate.map((dot) => {
    let customGoal = dot.goal;

    if (profile.title && !customGoal.includes(profile.title)) {
      if (dot.id.includes('research') || dot.id.includes('market') || dot.id.includes('supply')) {
        customGoal = `${dot.goal} Target niche: ${profile.targetUsers.slice(0, 70)}...`;
      } else if (dot.id.includes('product') || dot.id.includes('liquidity') || dot.id.includes('firmware')) {
        customGoal = `${dot.goal} Aligning with core proposition: ${profile.product.slice(0, 80)}...`;
      }
    }

    return {
      ...dot,
      goal: customGoal,
      status: 'idle',
      progress: 0,
    };
  });
};

export const createCustomDot = (
  name: string,
  role: string,
  goal: string,
  tools: string[],
  dependsOn: string[],
  stage: number = 3,
  requiresApproval: boolean = false
): DotSpec => {
  const cleanId = `dot-custom-${Date.now().toString(36)}`;
  return {
    id: cleanId,
    name,
    icon: 'Bot',
    role,
    goal,
    tools: tools.length > 0 ? tools : ['AgentBrowser', 'DataSynthesizer', 'APIConnector'],
    dependsOn,
    outputs: ['custom_report'],
    requiresApproval,
    status: 'idle',
    progress: 0,
    color: '#06b6d4',
    stage,
  };
};
