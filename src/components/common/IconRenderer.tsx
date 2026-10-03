import React from 'react';
import {
  Radar,
  Users,
  Boxes,
  Cpu,
  TrendingUp,
  Rocket,
  Store,
  GitFork,
  ShieldCheck,
  CircleDollarSign,
  Flame,
  Truck,
  Terminal,
  Award,
  Coins,
  Sparkles,
  Workflow,
  Package,
  Activity,
  DollarSign,
  Target,
  Bot,
  Brain,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Radar,
  Users,
  Boxes,
  Cpu,
  TrendingUp,
  Rocket,
  Store,
  GitFork,
  ShieldCheck,
  CircleDollarSign,
  Flame,
  Truck,
  Terminal,
  Award,
  Coins,
  Sparkles,
  Workflow,
  Package,
  Activity,
  DollarSign,
  Target,
  Bot,
  Brain,
  Layers,
};

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  const IconComponent = iconMap[name] || Bot || HelpCircle;
  return <IconComponent className={className} size={size} />;
};
