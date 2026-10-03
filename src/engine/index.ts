import { analyzeIdea } from './analyzer';
import { generateDots, createCustomDot } from './generator';
import { planTasks, TaskGraph } from './planner';
import { runDot, RunProgressCallback } from './runner';
import { StartupProfile, DotSpec, MemoryItem, DotOutput } from '../types';

/**
 * Flag to switch between local mock engine and real FastAPI + LangGraph / LLM backend.
 * When true, engine calls can be directed to a live API endpoint.
 */
export const USE_REAL_LLM = false;

export interface EngineConfig {
  apiUrl?: string;
  apiKey?: string;
  model?: string;
}

export const engineConfig: EngineConfig = {
  apiUrl: 'http://localhost:8000/api/v1',
  apiKey: '',
  model: 'gpt-4o',
};

export const configureEngine = (newConfig: Partial<EngineConfig>) => {
  Object.assign(engineConfig, newConfig);
};

export {
  analyzeIdea,
  generateDots,
  createCustomDot,
  planTasks,
  runDot,
};

export type { TaskGraph, RunProgressCallback };
