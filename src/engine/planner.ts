import { Node, Edge, MarkerType } from '@xyflow/react';
import { DotSpec, GraphNodeData } from '../types';

export interface TaskGraph {
  nodes: Node<GraphNodeData>[];
  edges: Edge[];
}

export const planTasks = async (dots: DotSpec[]): Promise<TaskGraph> => {
  // Simulate planning computation
  await new Promise((resolve) => setTimeout(resolve, 300));

  const nodes: Node<GraphNodeData>[] = [];
  const edges: Edge[] = [];

  // Group dots by stage to layout cleanly
  const stageGroups: { [key: number]: DotSpec[] } = { 1: [], 2: [], 3: [], 4: [] };
  dots.forEach((dot) => {
    const s = Math.min(Math.max(dot.stage || 2, 1), 4);
    if (!stageGroups[s]) stageGroups[s] = [];
    stageGroups[s].push(dot);
  });

  // Calculate layout coordinates
  const stageXCoordinates: { [key: number]: number } = {
    1: 40,
    2: 360,
    3: 680,
    4: 1000,
  };

  Object.entries(stageGroups).forEach(([stageStr, group]) => {
    const stageNum = parseInt(stageStr, 10);
    const x = stageXCoordinates[stageNum] || stageNum * 320;
    const totalInGroup = group.length;

    group.forEach((dot, index) => {
      // Stagger vertical spacing
      const verticalSpacing = 200;
      const startY = Math.max(40, 200 - ((totalInGroup - 1) * verticalSpacing) / 2);
      const y = startY + index * verticalSpacing;

      nodes.push({
        id: dot.id,
        type: 'dotNode',
        position: { x, y },
        data: {
          id: dot.id,
          label: dot.name,
          name: dot.name,
          icon: dot.icon,
          role: dot.role,
          status: dot.status,
          progress: dot.progress || 0,
          requiresApproval: dot.requiresApproval,
          color: dot.color || '#06b6d4',
          tools: dot.tools,
          dependsOn: dot.dependsOn,
          outputs: dot.outputs,
        },
      });
    });
  });

  // Create edges based on dependsOn
  dots.forEach((dot) => {
    dot.dependsOn.forEach((depId) => {
      // Check if target dot exists in current dots list
      const sourceExists = dots.some((d) => d.id === depId);
      if (sourceExists) {
        const isSourceDone = dots.find((d) => d.id === depId)?.status === 'done';
        const isTargetWorking = dot.status === 'working';

        edges.push({
          id: `edge-${depId}-to-${dot.id}`,
          source: depId,
          target: dot.id,
          animated: isTargetWorking || isSourceDone,
          style: {
            stroke: isSourceDone ? '#10b981' : isTargetWorking ? '#22d3ee' : 'rgba(148, 163, 184, 0.4)',
            strokeWidth: isTargetWorking ? 2.5 : 1.8,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isSourceDone ? '#10b981' : isTargetWorking ? '#22d3ee' : 'rgba(148, 163, 184, 0.5)',
            width: 16,
            height: 16,
          },
        });
      }
    });
  });

  return { nodes, edges };
};
