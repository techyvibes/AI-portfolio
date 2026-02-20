
import { ExperienceItem, SkillCategory } from './types';

export interface ExperienceItemWithImage extends ExperienceItem {
  imageUrl: string;
}

export interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
  details: string[];
}

export const EXPERIENCES: ExperienceItemWithImage[] = [
  {
    company: "Salesforce",
    role: "Release Manager (Agentic AI)",
    period: "August 2025 – Current",
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Led production deployment of agentic AI workflows supporting real-time inference-driven support automation.",
      "Orchestrated global releases involving 50k+ code changes with layered performance validation.",
      "Partnered with CodeGenie and Safe Change teams to operationalize real-time AI responses in Slack.",
      "Managed peak traffic events (Super Bowl, Black Friday) with zero customer incidents across 3.8M+ cases."
    ]
  },
  {
    company: "Salesforce",
    role: "Associate Release Manager",
    period: "August 2023 – July 2025",
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Orchestrated Salesforce Winter’24 major release across 400+ instances.",
      "Managed 200+ core releases and 50+ Tableau release vehicles.",
      "Streamlined release processes for high-profile clients like Disney and Wharton."
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "MLOps: Safe Research-to-Prod Pipeline",
    category: "System Design",
    description: "Architected a multi-stage validation pipeline for deploying large-scale transformer models with zero service interruption.",
    tags: ["Canary Releases", "Model Drift", "Prometheus", "Kubernetes"],
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800",
    details: [
      "Implemented Shadow Mode inference to compare research model outputs against production baselines in real-time.",
      "Automated rollback triggers based on precision/recall drift thresholds.",
      "Designed a hardware-aware scheduling system for GPU-bound inference tasks."
    ]
  },
  {
    title: "Agentic AI Orchestration Layer",
    category: "Architecture",
    description: "System design for a resilient orchestration layer that manages multi-agent handoffs in enterprise environments.",
    tags: ["Distributed Systems", "Agentic Design", "Reliability", "Python"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    details: [
      "Created a stateful recovery mechanism for long-running agent tasks.",
      "Optimized token consumption by 30% through intelligent prompt-caching strategies.",
      "Integrated 'Human-in-the-loop' (HITL) gateways for sensitive decision-making nodes."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Intelligence",
    skills: ["Generative AI", "Agentic AI", "Real-time Inference", "LLM Pipelines"]
  },
  {
    title: "Leadership & Scale",
    skills: ["Program Management", "Release Management", "Cross-Functional Leadership", "Incident Management"]
  },
  {
    title: "Strategy",
    skills: ["Product Vision", "Design Thinking", "Risk Assessment", "SaaS Solutions"]
  }
];
