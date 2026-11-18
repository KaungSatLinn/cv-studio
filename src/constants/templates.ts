import { CVData } from '../types/cv';

export const STORAGE_KEY = 'apple_ats_cv_studio_v3_default';

export const emptyTemplate: CVData = {
  showPhoto: true,
  photo: '',
  name: '',
  title: 'Software Engineer',
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  website: '',
  summary: '',
  skills: [
    { id: 1, category: 'Programming Languages', items: '' },
    { id: 2, category: 'Frameworks & Libraries', items: '' },
    { id: 3, category: 'Cloud, Databases & DevOps', items: '' },
    { id: 4, category: 'Languages', items: '' }
  ],
  experience: [
    {
      id: 1,
      role: '',
      company: '',
      location: '',
      period: '',
      bullets: ''
    }
  ],
  projects: [
    {
      id: 1,
      name: '',
      tech: '',
      link: '',
      description: ''
    }
  ],
  education: [
    {
      id: 1,
      degree: '',
      school: '',
      period: '',
      details: ''
    }
  ]
};

export const sampleTemplate: CVData = {
  showPhoto: true,
  photo: '',
  name: 'Alex Chen',
  title: 'Senior Software Engineer',
  email: 'alex.chen@example.dev',
  phone: '+1 (555) 382-9102',
  location: 'San Francisco, CA (or Remote)',
  github: 'github.com/alexchen-dev',
  linkedin: 'linkedin.com/in/alexchen-eng',
  website: 'alexchen.dev',
  summary: 'Full-stack Software Engineer with 6+ years of experience designing and scaling high-throughput distributed systems, cloud-native microservices, and responsive web applications. Proven track record in optimizing database queries, reducing cloud infrastructure spend, and leading technical initiatives across cross-functional teams.',
  skills: [
    {
      id: 1,
      category: 'Programming Languages',
      items: 'TypeScript, JavaScript, Go, Python, Java, SQL, HTML5/CSS3'
    },
    {
      id: 2,
      category: 'Frameworks & Libraries',
      items: 'React 19, Next.js, Node.js, Express, Spring Boot, Tailwind CSS, GraphQL, WebSocket'
    },
    {
      id: 3,
      category: 'Cloud & Infrastructure',
      items: 'AWS (Lambda, S3, ECS, CloudFront), Docker, Kubernetes, PostgreSQL, MySQL, Redis, GitHub Actions CI/CD'
    },
    {
      id: 4,
      category: 'Languages',
      items: 'English (Fluent), Japanese (Conversational)'
    }
  ],
  experience: [
    {
      id: 1,
      role: 'Senior Software Engineer',
      company: 'Starlight Cloud Technologies',
      location: 'San Francisco, CA',
      period: 'Mar 2023 – Present',
      bullets: '• Architected and deployed event-driven data streaming pipelines processing 15M+ events daily with 99.99% uptime using Go and Apache Kafka.\n• Reduced cloud infrastructure costs by 32% by containerizing legacy microservices and migrating workloads to AWS ECS Fargate with spot instances.\n• Spearheaded frontend migration to React and Vite, cutting initial bundle load time by 45% and boosting Core Web Vitals across the platform.\n• Mentored 5 junior and mid-level software engineers through bi-weekly design reviews, pair programming, and automated CI/CD linting standards.'
    },
    {
      id: 2,
      role: 'Software Engineer',
      company: 'Apex Financial Solutions',
      location: 'Seattle, WA',
      period: 'Aug 2020 – Feb 2023',
      bullets: '• Developed secure RESTful and gRPC payment gateway microservices handling $40M+ in quarterly transaction volume.\n• Optimized PostgreSQL query execution plans, adding composite indexes and caching layers via Redis to drop p99 API latency from 450ms to 65ms.\n• Built automated compliance and transaction reporting dashboard with React, TypeScript, and Tailwind CSS used by 300+ enterprise clients.\n• Integrated third-party webhook integrations and automated unit/integration test suites achieving 88% code coverage.'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Distributed Task Queue & Scheduler',
      tech: 'Go, Redis, Docker, gRPC, Prometheus',
      link: 'github.com/alexchen-dev/distributed-queue',
      description: 'High-concurrency job scheduler supporting exponential backoff retries, dead-letter queues, and real-time telemetry metrics.'
    },
    {
      id: 2,
      name: 'Cloud-Native Edge Analytics Platform',
      tech: 'TypeScript, React, Cloudflare Workers, ClickHouse',
      link: 'github.com/alexchen-dev/edge-analytics',
      description: 'Privacy-first web traffic observability engine running at the CDN edge with sub-10ms query execution on aggregated data points.'
    },
    {
      id: 3,
      name: 'AI-Powered Code Review Bot',
      tech: 'Python, FastAPI, OpenAI API, GitHub Webhooks',
      link: 'github.com/alexchen-dev/ai-code-reviewer',
      description: 'Automated GitHub PR review tool that summarizes pull requests, catches anti-patterns, and suggests optimized refactorings.'
    }
  ],
  education: [
    {
      id: 1,
      degree: 'B.S. in Computer Science',
      school: 'University of Washington',
      period: '2016 – 2020',
      details: 'Graduated Magna Cum Laude • Dean\'s List'
    },
    {
      id: 2,
      degree: 'AWS Certified Solutions Architect – Associate',
      school: 'Amazon Web Services',
      period: '2023',
      details: 'Validation ID: AWS-SAA-839219'
    }
  ]
};
