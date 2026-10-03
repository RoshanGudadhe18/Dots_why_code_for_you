import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useDotsStore } from '../../store/useDotsStore';
import { DotGraphNode } from './DotGraphNode';
import { Play, Pause, Plus } from 'lucide-react';

interface TaskGraphViewProps {
  onOpenAddModal: () => void;
}

export const TaskGraphView: React.FC<TaskGraphViewProps> = ({ onOpenAddModal }) => {
  const {
    graph,
    isSimulating,
    runEntireOrganization,
    abortSimulation,
    selectedDotId,
  } = useDotsStore();

  const nodeTypes = useMemo(() => ({ dotNode: DotGraphNode }), []);

  const nodes = useMemo(() => {
    if (!graph) return [];
    return graph.nodes.map((node) => ({
      ...node,
      selected: node.id === selectedDotId,
    }));
  }, [graph, selectedDotId]);

  const edges = useMemo(() => {
    if (!graph) return [];
    return graph.edges;
  }, [graph]);

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col bg-[#090b10] rounded-2xl border border-white/10 overflow-hidden">
      {/* Graph Toolbar */}
      <div className="z-10 p-3.5 border-b border-white/10 bg-[#0d1017]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Stage Legend */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Stage 1: Discovery (Parallel)</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Stage 2: Product & Scope</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span>Stage 3: Deep Tech / Architecture</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <span>Stage 4: Economics & GTM</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 ml-auto">
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add DOT</span>
          </button>

          {isSimulating ? (
            <button
              onClick={abortSimulation}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide transition-all cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Run</span>
            </button>
          ) : (
            <button
              onClick={runEntireOrganization}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs tracking-wide shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Run Organization</span>
            </button>
          )}
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 w-full h-[620px] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.4}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            color="#ffffff"
            gap={28}
            size={1}
            className="opacity-[0.04]"
            variant={BackgroundVariant.Dots}
          />
          <Controls className="bg-[#121622] border border-white/10 rounded-xl fill-slate-300 text-slate-300 overflow-hidden shadow-md" />
          <MiniMap
            nodeColor="#334155"
            maskColor="rgba(9, 11, 16, 0.85)"
            className="bg-[#0e121c] border border-white/10 rounded-xl overflow-hidden hidden sm:block"
          />
        </ReactFlow>
      </div>
    </div>
  );
};
