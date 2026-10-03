# DOTS — AI-Native Startup Operating System

> **"The founder provides the vision. DOTS builds the AI team required to execute it."**

DOTS is an interactive AI-native operating system designed for single-operator startups and autonomous venture execution. A founder inputs a startup concept, and DOTS dynamically extracts the problem space, crafts a structured Startup Profile, synthesizes a domain-tailored swarm of specialized AI agents ("DOTs"), schedules an execution DAG (Dependency Graph), and coordinates parallel work with human-in-the-loop founder approvals.

---

## 🌟 Key Features

1. **Intelligent Idea Decomposition & Scanning HUD**
   - Heuristic and keyword analysis extracts core problem vectors, ideal customer personas (ICP), product scope, monetization models, and engineering/regulatory constraints.
   - Animated radar scanning HUD with step-by-step progressive feedback.
   - Structured Startup Profile with full inline editing for every field before team generation.

2. **Domain-Adaptive Team Synthesis**
   - Different startup archetypes produce visibly distinct AI teams:
     - **Two-Sided Marketplace**: Supply-Side Growth DOT, Demand-Side Acquisition DOT, Liquidity & Matching DOT, Trust & Escrow DOT, Take-Rate & GMV DOT, and Constrained Launch DOT.
     - **Connected Hardware / IoT**: Hardware Systems DOT (PCB/MCU), Supply Chain & BOM DOT, Firmware & Edge AI DOT, Regulatory & FCC Compliance DOT, Tooling Capex & COGS DOT, and Pre-Order Launch DOT.
     - **B2B SaaS / DevTools**: Market Intelligence DOT, Persona & ICP DOT, Product Architect DOT, Full-Stack Systems DOT, Unit Economics DOT, and GTM Launch DOT.
     - **Productized Service**: Workflow Automation DOT, Productized Scope DOT, Autonomous Delivery DOT, Gross Margin DOT, and Inbound Sales DOT.
   - Each DOT card showcases its icon, role, autonomous mandate (editable inline), integrated toolchains, dependency constraints, and approval gate status.
   - Founders can deploy custom DOTs (e.g. Sales Outbound, Legal Shield, Community Ambassador) with instant DAG re-planning.

3. **Autonomous Dependency Workspace (DAG)**
   - **Interactive Task Graph (React Flow)**: Visual dependency graph with live glow states (`idle`, `working`, `waiting_approval`, `done`).
   - **Multi-Stage Wave Concurrency**: Stage 1 discovery and research agents run in parallel, unblocking downstream Product Architecture, Systems Architecture, and Financial Models.
   - **Live Activity Feed**: Real-time log of agent-to-agent collaboration, heuristic reasoning traces, and deliverable handoffs.
   - **Shared Memory Ledger**: Filterable and searchable blackboard storing verified Facts, Strategic Decisions, and Operational Assumptions tagged by author DOT with confidence scores.
   - **Per-DOT Production Deliverables**:
     - Competitor Landscape Matrix with clickable source links.
     - MVP Functional Requirements (P0 Must-Have, P1 Core, P2 Delight).
     - 12-Month Unit Economics Chart (Recharts) modeling MRR, CAC, LTV, and net burn.
     - Cloud & Distributed Systems Architecture Blueprint.
     - 90-Day Go-To-Market Roadmap.

4. **Executive Founder Approvals (Human-in-the-Loop)**
   - Gated DOTs submit deliverables to the founder review queue.
   - **Approve**: Unlocks downstream dependent agents and triggers celebratory launch effects.
   - **Request Changes / Reject**: Founder types targeted guidance into the comment box. The DOT immediately re-runs with high priority, incorporating the feedback into a visibly revised deliverable marked with an audit trail.

5. **1-Click Demo Mode**
   - Instantly populates and runs the flagship venture: *"AI platform that helps college students find internships"*.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom dark-space theme (`#07090e`), glowing cyan/purple accent halos, and glassmorphism panels
- **Motion & Micro-interactions**: Framer Motion
- **Task & Dependency Graph**: React Flow (`@xyflow/react`)
- **State Management**: Zustand
- **Financial Visualizations**: Recharts
- **Iconography**: Lucide React
- **Celebrations**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/RoshanGudadhe18/Dots_why_code_for_you.git
cd Dots_why_code_for_you

# Install dependencies
npm install --legacy-peer-deps
```

### Running Locally
```bash
# Start Vite development server
npm run dev

# Open in browser:
# http://localhost:5173
```

### Building for Production
```bash
# TypeScript verification & Vite production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
src/
├── types/
│   └── index.ts               # Core contracts: DotSpec, StartupProfile, DotOutput, SharedMemory
├── engine/
│   ├── index.ts               # Clean engine facade (USE_REAL_LLM flag, backend config)
│   ├── analyzer.ts            # Heuristic & LLM venture problem extractor
│   ├── generator.ts           # Dynamic team synthesizer tailored to startup archetypes
│   ├── planner.ts             # React Flow DAG task & dependency layout engine
│   ├── runner.ts              # Agent execution simulator with streaming events & feedback revisions
│   └── templates/
│       ├── saas.ts            # SaaS base team template
│       ├── marketplace.ts     # Marketplace base team template
│       ├── hardware.ts        # Hardware / IoT base team template
│       └── service.ts         # Productized Service base team template
├── store/
│   └── useDotsStore.ts        # Zustand store orchestrating stages, graph, memory, and approvals
├── components/
│   ├── common/
│   │   ├── Navbar.tsx         # Top bar with breadcrumbs, simulation indicators, demo toggle
│   │   └── IconRenderer.tsx   # Dynamic Lucide icon renderer
│   ├── landing/
│   │   ├── Hero.tsx           # Proposition, input box, 3 clickable archetype presets
│   │   ├── Constellation.tsx  # Interactive canvas with glowing dot constellation
│   │   ├── HowItWorks.tsx     # 5-step animated journey (Idea -> Profile -> Team -> Tasks -> Approval)
│   │   └── EvolutionSection.tsx # AI Assistant -> AI Agent -> Multi-Agent -> Dynamic AI Org
│   ├── analyzing/
│   │   ├── AnalyzingScreen.tsx # Animated HUD scanner
│   │   └── ProfileEditor.tsx   # Inline editor for problem, users, product, model, constraints
│   ├── team/
│   │   ├── TeamGeneration.tsx  # Dynamic team review screen
│   │   ├── DotCard.tsx         # Interactive DOT card with goal edit, tools, dependencies
│   │   └── AddDotModal.tsx     # Custom agent deployment modal
│   └── dashboard/
│       ├── DashboardLayout.tsx # 3-column workspace coordinator
│       ├── LeftSidebar.tsx     # Live status of all DOTs (idle, working, review, done)
│       ├── TaskGraphView.tsx   # React Flow DAG with simulation runner
│       ├── DotGraphNode.tsx    # Custom glowing React Flow node
│       ├── ActivityFeed.tsx    # Live agent-to-agent collaboration logs
│       ├── OutputsView.tsx     # Tabbed deliverables (tables, charts, specs, sources)
│       ├── SharedMemoryView.tsx # Browsable facts, decisions, assumptions ledger
│       └── ApprovalsPanel.tsx  # Founder review queue with Approve / Reject & feedback re-runs
├── App.tsx                    # Main flow router
└── index.css                  # Custom glassmorphism, scrollbars, and Tailwind directives
```

---

## 🔌 Connecting a Real FastAPI + LangGraph Backend

The `/src/engine` directory is cleanly decoupled behind a modular facade:

```typescript
// src/engine/index.ts
export const USE_REAL_LLM = false; // Toggle to true when live backend is connected

export const engineConfig = {
  apiUrl: 'http://localhost:8000/api/v1',
  apiKey: process.env.VITE_BACKEND_API_KEY || '',
};
```

### FastAPI Endpoints Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/analyze-idea` | Accepts `{ idea: string }`, returns `StartupProfile` |
| `POST` | `/api/v1/generate-dots` | Accepts `StartupProfile`, returns tailored `DotSpec[]` |
| `POST` | `/api/v1/plan-tasks` | Accepts `DotSpec[]`, returns DAG `TaskGraph` (nodes + edges) |
| `POST` | `/api/v1/run-dot` | Accepts `{ dot: DotSpec, memory: MemoryItem[], feedback?: string }`, returns SSE stream with progress and final `DotOutput` |

### Python LangGraph Architecture Example

```python
# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from langgraph.graph import StateGraph, END

app = FastAPI(title="DOTS Engine API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class StartupState(BaseModel):
    profile: dict
    dots: List[dict]
    memory: List[dict]
    deliverables: dict

def market_research_node(state: StartupState):
    # Call Tavily / Perplexity for live competitor landscape
    return {"deliverables": {"market_research": {...}}}

def product_architect_node(state: StartupState):
    # Ingest research from state["deliverables"]["market_research"]
    return {"deliverables": {"mvp_features": [...]}}

# Build LangGraph DAG matching DOT dependencies
workflow = StateGraph(StartupState)
workflow.add_node("market_research", market_research_node)
workflow.add_node("product_architect", product_architect_node)
workflow.add_edge("market_research", "product_architect")
workflow.add_edge("product_architect", END)
graph = workflow.compile()
```

---

## 📄 License
MIT License. Built for visionary founders creating the future of autonomous software organizations.
