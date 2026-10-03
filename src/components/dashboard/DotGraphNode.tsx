import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { GraphNodeData } from '../../types';
import { IconRenderer } from '../common/IconRenderer';
import { ShieldAlert } from 'lucide-react';
import { useDotsStore } from '../../store/useDotsStore';

interface DotGraphNodeProps {
  data: GraphNodeData;
  selected?: boolean;
}

export const DotGraphNode: React.FC<DotGraphNodeProps> = ({ data, selected }) => {
  const { setSelectedDotId, setActiveTab } = useDotsStore();

  const getStatusStyles = () => {
    switch (data.status) {
      case 'working':
        return {
          container: 'border-white/40 bg-white/10 ring-1 ring-white/20 shadow-md',
          badge: 'bg-white/15 text-white border-white/20',
          badgeText: 'Working',
        };
      case 'waiting_approval':
        return {
          container: 'border-amber-400/40 bg-amber-950/30 ring-1 ring-amber-400/30 shadow-md',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-400/30',
          badgeText: 'Needs Review',
        };
      case 'done':
        return {
          container: 'border-emerald-500/40 bg-emerald-950/20 shadow-sm',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          badgeText: 'Done',
        };
      case 'idle':
      default:
        return {
          container: 'border-white/10 bg-[#0e121c] hover:border-white/20',
          badge: 'bg-white/5 text-slate-400 border-white/10',
          badgeText: 'Idle',
        };
    }
  };

  const statusStyle = getStatusStyles();

  const handleNodeClick = () => {
    setSelectedDotId(data.id);
    if (data.status === 'done' || data.status === 'waiting_approval') {
      setActiveTab('outputs');
    }
  };

  return (
    <div
      onClick={handleNodeClick}
      className={`relative w-64 rounded-2xl p-4 border transition-all duration-200 backdrop-blur-xl cursor-pointer ${
        statusStyle.container
      } ${selected ? 'ring-2 ring-white/50' : ''}`}
    >
      {/* Target input handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-slate-300 border-2 border-[#090b10] rounded-full transition-transform hover:scale-125"
      />

      {/* Top row: Icon, Name, Status Pill */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5 border border-white/10 bg-white/5 text-slate-200">
            <IconRenderer name={data.icon} className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">
              {data.name}
            </h4>
            <p className="text-[10px] text-slate-400 line-clamp-1">{data.role}</p>
          </div>
        </div>
      </div>

      {/* Status & Progress bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-medium uppercase tracking-wider ${statusStyle.badge}`}>
            {statusStyle.badgeText}
          </span>
          {data.status === 'working' && (
            <span className="text-slate-200 font-medium">{data.progress || 0}%</span>
          )}
        </div>

        {data.status === 'working' && (
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${data.progress || 10}%` }}
            />
          </div>
        )}
      </div>

      {/* Footer Info: Dependencies & Badges */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span className="truncate">
          {data.dependsOn.length > 0 ? `${data.dependsOn.length} deps` : 'Root Wave'}
        </span>
        {data.requiresApproval && (
          <span className="flex items-center gap-0.5 text-amber-400/90 text-[9px] font-medium">
            <ShieldAlert className="w-2.5 h-2.5" />
            <span>Gate</span>
          </span>
        )}
      </div>

      {/* Source output handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-slate-300 border-2 border-[#090b10] rounded-full transition-transform hover:scale-125"
      />
    </div>
  );
};
