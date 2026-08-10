export const userProfile = {
  name: 'Fahad Fayaz',
  handle: '@fahaad.ffp',
  role: 'Full Stack & Systems Software Engineer',
  githubUrl: 'https://github.com/fahadfayaz340-ui',
  instagramUrl: 'https://instagram.com/fahaad.ffp',
  instagramHandle: '@fahaad.ffp',
  githubUsername: 'fahadfayaz340-ui',
  bio: 'Building high-performance 3D web applications, real-time router network control dashboards, and AI developer tools.'
}

export const initialProjects = [
  {
    id: '1',
    title: 'Login Computers E-Commerce & Service Platform',
    tagline: 'Multi-page IT services & hardware platform with 3D WebGL graphics, custom cost estimator, and bento grid layout',
    category: 'Full Stack',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Three.js', 'WebGL', 'Canvas API'],
    aiScore: 95,
    complexity: 'High',
    interviewReadiness: '3D Graphics & DOM Performance',
    stars: 128,
    forks: 24,
    demoUrl: 'https://github.com/fahadfayaz340-ui/login-computers',
    repoUrl: 'https://github.com/fahadfayaz340-ui/login-computers',
    keyFeatures: [
      'Interactive 3D component renders using custom Three.js integration (three-3d.js)',
      'Custom interactive cost estimator for computer repairs and hardware upgrades',
      'Dynamic water ripple & transition canvas effects (water-ripple.js)'
    ],
    interviewQuestions: [
      'How do you manage 60fps rendering in WebGL without causing memory leaks during page navigation?',
      'How did you structure your multi-page JS modules for optimal bundle loading?'
    ]
  },
  {
    id: '2',
    title: 'WiFi Router Control & Bandwidth Dashboard',
    tagline: 'Real-time router control panel with Node.js backend server, live telemetry, and device firewall management',
    category: 'React/Node',
    tech: ['React', 'Node.js', 'Vite', 'Express', 'WebSockets', 'Chart.js'],
    aiScore: 92,
    complexity: 'High',
    interviewReadiness: 'WebSockets & Network Protocols',
    stars: 94,
    forks: 18,
    demoUrl: 'https://github.com/fahadfayaz340-ui',
    repoUrl: 'https://github.com/fahadfayaz340-ui',
    keyFeatures: [
      'Real-time WebSocket monitoring for connected network devices and bandwidth spikes',
      'Custom backend Express server managing simulated router QoS and IP allocation',
      'Interactive firewall rule toggles with instant socket push updates'
    ],
    interviewQuestions: [
      'How do you maintain persistent WebSocket connections during router IP renewals?',
      'What data structures optimize IP address searching across 200+ connected client devices?'
    ]
  },
  {
    id: '3',
    title: 'RuView Network & Vision Surface Module',
    tagline: 'High-performance vision and network view package optimization for low-latency surface rendering',
    category: 'Systems/Rust',
    tech: ['JavaScript', 'Node.js', 'Performance Profiling', 'WebAssembly'],
    aiScore: 89,
    complexity: 'High',
    interviewReadiness: 'Low-Latency & Memory Profiling',
    stars: 67,
    forks: 12,
    demoUrl: 'https://github.com/fahadfayaz340-ui',
    repoUrl: 'https://github.com/fahadfayaz340-ui',
    keyFeatures: [
      'Deep surface optimization based on ADR-263/264 performance specs',
      'Sub-10ms frame latency for network packet visualization',
      'Memory footprint reduction of 35% under continuous buffer streaming'
    ],
    interviewQuestions: [
      'Explain how garbage collection pauses impact zero-copy network buffer pipelines.',
      'How do you benchmark micro-optimizations across different V8 engine releases?'
    ]
  },
  {
    id: '4',
    title: 'DevPrep AI Portfolio & Candidate Simulator',
    tagline: 'AI-powered project tracker, code auditor, and FAANG interview question predictor for tech candidates',
    category: 'AI/ML',
    tech: ['React 19', 'Vite 8', 'Lucide React', 'CSS Glassmorphism', 'JavaScript'],
    aiScore: 96,
    complexity: 'Medium',
    interviewReadiness: 'AI Architecture & UX Design',
    stars: 185,
    forks: 36,
    demoUrl: 'http://localhost:5174',
    repoUrl: 'https://github.com/fahadfayaz340-ui',
    keyFeatures: [
      'Real-time AI code auditor calculating security, quality, and scalability metrics',
      'Interactive commit activity heatmap matrix and technical flashcards',
      'Personalized candidate recruiter alignment scoring engine'
    ],
    interviewQuestions: [
      'How do you ensure reactive UI state stays snappy when processing large code text inputs?',
      'What architectural design choices make this portfolio stand out to senior engineering recruiters?'
    ]
  }
];

export const userStats = {
  interviewScore: 92,
  projectsCompleted: 4,
  totalCommits: 418,
  dsaSolved: 210,
  streakDays: 18,
  codeQualityRating: 'A+ (96%)',
  topSkill: 'Three.js 3D, Node.js & React'
};

export const interviewCategoryProgress = [
  { topic: 'Full Stack & WebGL (Three.js)', progress: 95, target: 'Expert' },
  { topic: 'Node.js & Backend Architecture', progress: 91, target: 'Production Ready' },
  { topic: 'Data Structures & Algorithms', progress: 88, target: '210+ Solved' },
  { topic: 'Network Protocols & WebSockets', progress: 89, target: 'Solid' },
  { topic: 'System Design & Scalability', progress: 86, target: 'FAANG Ready' }
];

export const sampleInterviewQuestions = [
  {
    id: 1,
    category: 'Full Stack & 3D',
    question: 'In your Login Computers project, how did you optimize 3D WebGL assets (Three.js) for fast mobile page loads?',
    hint: 'Discuss lazy loading 3D canvas contexts, texture compression (KTX2/Basis), lowering polygon counts, and disposing of WebGL geometries/materials on unmount.',
    difficulty: 'Medium'
  },
  {
    id: 2,
    category: 'Network & Backend',
    question: 'How does your WiFi Router Control Dashboard stream real-time bandwidth metrics without choking the main browser thread?',
    hint: 'Explain WebSocket throttling/debouncing, binary ArrayBuffer message encoding over JSON, and using requestAnimationFrame for smooth Chart.js updates.',
    difficulty: 'Hard'
  },
  {
    id: 3,
    category: 'System Performance',
    question: 'What trade-offs did you make when building the interactive cost estimator for Login Computers vs a backend DB query?',
    hint: 'Client-side estimation provides instant zero-latency feedback (0ms), but requires securing pricing formulas and sync validation during checkout.',
    difficulty: 'Medium'
  }
];
