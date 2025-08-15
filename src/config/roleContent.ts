export const roleContent = {
  frontend: {
    heroTitle: "Frontend Developer",
    heroSubtitle: "I craft pixel-perfect, interactive user experiences.",
    aboutText: "I'm a frontend-focused software engineer with 4+ years of experience building user-centric web applications. I specialize in creating beautiful, accessible, and performant user interfaces using modern frontend technologies.",
    expertiseFocus: "frontend",
    roleBadge: "Frontend Developer",
    autoTypingRoles: [
      'Frontend Developer',
      'UI/UX Designer',
      'React Specialist',
      'Next.js Developer',
      'Frontend Architect',
    ],
    skills: {
      primary: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
      secondary: ['Vue.js', 'Angular', 'Sass', 'CSS3', 'HTML5'],
      tools: ['Webpack', 'Vite', 'Jest', 'Cypress', 'Storybook'],
      design: ['Figma', 'Adobe XD', 'Responsive Design', 'UI/UX', 'Accessibility']
    },
    experience: [
      {
        id: 1,
        company: 'Finchat',
        position: 'Frontend Engineer',
        duration: 'Jan 2021 – Aug 2022',
        location: 'Remote',
        type: 'Full-time',
        description: 'Spearheaded a React-based dashboard overhaul, cutting initial page load from 4s to 2.8s and lifting NPS by 20%. Implemented component optimization and lazy loading strategies to improve performance.',
        achievements: [
          { icon: 'TrendingUp', text: 'Cut initial page load from 4s to 2.8s', metric: '30% faster' },
          { icon: 'Award', text: 'Lifted NPS by 20%', metric: '20% NPS' },
          { icon: 'Zap', text: 'Improved component re-render efficiency', metric: '40% better' }
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Webpack', 'Jest', 'Storybook'],
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 2,
        company: 'Noma Gaming',
        position: 'Frontend Developer',
        duration: 'Jun 2019 – Dec 2020',
        location: 'Remote',
        type: 'Full-time',
        description: 'Developed React components for live game lobbies, boosting daily active players by 15%. Enhanced admin portal with modern UI patterns and improved user experience.',
        achievements: [
          { icon: 'TrendingUp', text: 'Boosted daily active players by 15%', metric: '15% growth' },
          { icon: 'Zap', text: 'Reduced asset load size by 40%', metric: '40% smaller' },
          { icon: 'Users', text: 'Improved user engagement metrics', metric: '25% better' }
        ],
        technologies: ['React', 'Redux', 'Styled Components', 'Webpack', 'Jest'],
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 3,
        company: 'Freelance',
        position: 'Frontend Developer',
        duration: 'Jan 2021 – Present',
        location: 'Remote',
        type: 'Contract',
        description: 'Delivered frontend solutions for e-commerce, fintech, and SaaS clients, building React applications with modern UI/UX patterns. Worked directly with stakeholders for design feedback and user acceptance testing.',
        achievements: [
          { icon: 'Award', text: 'Delivered frontend solutions for diverse clients', metric: 'Multi-industry' },
          { icon: 'TrendingUp', text: 'Improved UI performance by up to 25%', metric: '25% faster' },
          { icon: 'Users', text: 'Ensured polished deliverables via stakeholder feedback', metric: 'Client-focused' }
        ],
        technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 4,
        company: 'HNG Virtual Program',
        position: 'Frontend Developer',
        duration: 'Jul 2024',
        location: 'Remote',
        type: 'Program',
        description: 'Built a Next.js demo app with code splitting and caching that achieved a 95% Lighthouse performance score. Authored unit tests and configured GitHub Actions for live previews.',
        achievements: [
          { icon: 'Award', text: 'Achieved 95% Lighthouse performance score', metric: '95% score' },
          { icon: 'Check', text: 'Maintained 90%+ test coverage', metric: '90%+ coverage' },
          { icon: 'Zap', text: 'Reduced feedback loops by 60%', metric: '60% faster' }
        ],
        technologies: ['Next.js', 'Jest', 'GitHub Actions', 'TypeScript'],
        color: 'from-orange-500 to-red-500'
      }
    ]
  },
  backend: {
    heroTitle: "Backend Developer",
    heroSubtitle: "I design scalable APIs and robust server-side logic.",
    aboutText: "I'm a backend-focused software engineer with 4+ years of experience building robust, scalable server-side applications. I specialize in API design, database architecture, and system optimization.",
    expertiseFocus: "backend",
    roleBadge: "Backend Developer",
    autoTypingRoles: [
      'Backend Developer',
      'API Developer',
      'Node.js Specialist',
      'Database Engineer',
      'Backend Architect',
    ],
    skills: {
      primary: ['Node.js', 'Express.js', 'Python', 'Java', 'PostgreSQL'],
      secondary: ['MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Microservices'],
      tools: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Jest'],
      infrastructure: ['CI/CD', 'Database Design', 'API Security', 'Performance Optimization', 'Monitoring']
    },
    experience: [
      {
        id: 1,
        company: 'Finchat',
        position: 'Backend Engineer',
        duration: 'Jan 2021 – Aug 2022',
        location: 'Remote',
        type: 'Full-time',
        description: 'Built scalable backend services and APIs, implementing Redis caching and optimized database queries to slash average API response times by 35%.',
        achievements: [
          { icon: 'Zap', text: 'Reduced API response times by 35%', metric: '35% faster' },
          { icon: 'Check', text: 'Built Jest/Supertest suites (80% coverage)', metric: '80% coverage' },
          { icon: 'Users', text: 'Reduced post-release bugs by 40%', metric: '40% fewer bugs' }
        ],
        technologies: ['Node.js', 'Express.js', 'Redis', 'PostgreSQL', 'Jest', 'Supertest'],
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 2,
        company: 'Noma Gaming',
        position: 'Backend Developer',
        duration: 'Jun 2019 – Dec 2020',
        location: 'Remote',
        type: 'Full-time',
        description: 'Designed Node.js matchmaking service supporting 2,000+ concurrent sessions with <1% error rate. Automated Docker builds and GitHub Actions workflows.',
        achievements: [
          { icon: 'Users', text: 'Supported 2,000+ concurrent sessions', metric: '2K+ sessions' },
          { icon: 'Award', text: 'Achieved zero-downtime releases', metric: 'Zero downtime' },
          { icon: 'Zap', text: 'Reduced error rate to <1%', metric: '<1% errors' }
        ],
        technologies: ['Node.js', 'WebSockets', 'Docker', 'GitHub Actions', 'Redis'],
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 3,
        company: 'Freelance',
        position: 'Backend Developer',
        duration: 'Jan 2021 – Present',
        location: 'Remote',
        type: 'Contract',
        description: 'Delivered backend solutions for e-commerce, fintech, and SaaS clients, building Node.js/Express APIs and designing optimized SQL and NoSQL schemas.',
        achievements: [
          { icon: 'Award', text: 'Delivered backend solutions for diverse clients', metric: 'Multi-industry' },
          { icon: 'TrendingUp', text: 'Improved query performance by up to 25%', metric: '25% faster' },
          { icon: 'Zap', text: 'Cut manual deployment steps in half', metric: '50% faster' }
        ],
        technologies: ['Node.js', 'Express.js', 'SQL', 'NoSQL', 'Docker', 'GitHub Actions'],
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 4,
        company: 'HNG Virtual Program',
        position: 'Backend Developer',
        duration: 'Jul 2024',
        location: 'Remote',
        type: 'Program',
        description: 'Built backend services with Next.js API routes and configured GitHub Actions for automated testing and deployment workflows.',
        achievements: [
          { icon: 'Award', text: 'Achieved 95% API performance score', metric: '95% score' },
          { icon: 'Check', text: 'Maintained 90%+ test coverage', metric: '90%+ coverage' },
          { icon: 'Zap', text: 'Reduced feedback loops by 60%', metric: '60% faster' }
        ],
        technologies: ['Next.js', 'Jest', 'GitHub Actions', 'TypeScript'],
        color: 'from-orange-500 to-red-500'
      }
    ]
  },
  fullstack: {
    heroTitle: "Full Stack Developer",
    heroSubtitle: "I bridge design and engineering to build complete solutions.",
    aboutText: "I'm a full-stack software engineer with 4+ years of experience building user-centric web applications from concept to production. I led a redesign of Finchat's dashboard, improving load times by 30% and boosting user satisfaction by 20%. During my tenure at Noma Gaming, I developed a matchmaking system that enhanced game session stability and reduced connection errors by 25%.",
    expertiseFocus: "fullstack",
    roleBadge: "Full Stack Developer",
    autoTypingRoles: [
      'Full Stack Architect',
      'Full Stack Developer',
      'Full Stack Engineer',
      'UI/UX Designer',
      'Tech Innovator',
    ],
    skills: {
      primary: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
      secondary: ['Vue.js', 'Python', 'MongoDB', 'Redis', 'GraphQL'],
      tools: ['Docker', 'AWS', 'GitHub Actions', 'Jest', 'Cypress'],
      fullstack: ['API Design', 'Database Architecture', 'UI/UX', 'DevOps', 'Performance Optimization']
    },
    experience: [
      {
        id: 1,
        company: 'Finchat',
        position: 'Full Stack Engineer',
        duration: 'Jan 2021 – Aug 2022',
        location: 'Remote',
        type: 'Full-time',
        description: 'Spearheaded a React-based dashboard overhaul, cutting initial page load from 4s to 2.8s and lifting NPS by 20%. Implemented Redis caching and optimized database queries to slash average API response times by 35%. Built Jest and Supertest suites covering 80% of core payment endpoints, reducing post-release bugs by 40%. Integrated WebSockets for real-time balance updates, improving active session duration by 15%.',
        achievements: [
          { icon: 'TrendingUp', text: 'Cut initial page load from 4s to 2.8s', metric: '30% faster' },
          { icon: 'Award', text: 'Lifted NPS by 20%', metric: '20% NPS' },
          { icon: 'Zap', text: 'Reduced API response times by 35%', metric: '35% faster' },
          { icon: 'Check', text: 'Built Jest/Supertest suites (80% coverage)', metric: '80% coverage' },
          { icon: 'Users', text: 'Reduced post-release bugs by 40%', metric: '40% fewer bugs' },
          { icon: 'TrendingUp', text: 'Improved active session duration by 15%', metric: '15% longer' }
        ],
        technologies: ['React', 'Redis', 'PostgreSQL', 'Jest', 'Supertest', 'WebSockets'],
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 2,
        company: 'Noma Gaming',
        position: 'Full Stack Developer',
        duration: 'Jun 2019 – Dec 2020',
        location: 'Remote',
        type: 'Full-time',
        description: 'Developed Angular modules for live game lobbies, boosting daily active players by 15%. Enhanced React admin portal, reducing asset load size by 40% and improving deployment frequency. Designed Node.js matchmaking service supporting 2,000+ concurrent sessions with <1% error rate. Automated Docker builds and GitHub Actions workflows, achieving zero-downtime releases for weekly feature updates.',
        achievements: [
          { icon: 'TrendingUp', text: 'Boosted daily active players by 15%', metric: '15% growth' },
          { icon: 'Zap', text: 'Reduced asset load size by 40%', metric: '40% smaller' },
          { icon: 'Users', text: 'Supported 2,000+ concurrent sessions', metric: '2K+ sessions' },
          { icon: 'Award', text: 'Achieved zero-downtime releases', metric: 'Zero downtime' }
        ],
        technologies: ['Angular', 'React', 'Node.js', 'Docker', 'GitHub Actions', 'WebSockets'],
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 3,
        company: 'Freelance',
        position: 'Contract Developer',
        duration: 'Jan 2021 – Present',
        location: 'Remote',
        type: 'Contract',
        description: 'Delivered full-stack solutions for e-commerce, fintech, and SaaS clients, building React frontends and Node.js/Express backends. Designed and optimized SQL and NoSQL schemas; improved query performance by up to 25%. Set up CI/CD with GitHub Actions and Docker, cutting manual deployment steps in half. Worked directly with stakeholders for UI/UX feedback and user acceptance testing, ensuring polished deliverables.',
        achievements: [
          { icon: 'Award', text: 'Delivered full-stack solutions for diverse clients', metric: 'Multi-industry' },
          { icon: 'TrendingUp', text: 'Improved query performance by up to 25%', metric: '25% faster' },
          { icon: 'Zap', text: 'Cut manual deployment steps in half', metric: '50% faster' },
          { icon: 'Users', text: 'Ensured polished deliverables via stakeholder feedback', metric: 'Client-focused' }
        ],
        technologies: ['React', 'Node.js', 'Express.js', 'SQL', 'NoSQL', 'Docker', 'GitHub Actions'],
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 4,
        company: 'HNG Virtual Program',
        position: 'Full Stack Web Developer',
        duration: 'Jul 2024',
        location: 'Remote',
        type: 'Program',
        description: 'Built a Next.js demo app with code splitting and caching that achieved a 95% Lighthouse performance score. Authored unit/integration tests to maintain 90%+ coverage under tight deadlines. Configured GitHub Actions for live previews and automated deployments, reducing feedback loops by 60%.',
        achievements: [
          { icon: 'Award', text: 'Achieved 95% Lighthouse performance score', metric: '95% score' },
          { icon: 'Check', text: 'Maintained 90%+ test coverage', metric: '90%+ coverage' },
          { icon: 'Zap', text: 'Reduced feedback loops by 60%', metric: '60% faster' }
        ],
        technologies: ['Next.js', 'Jest', 'GitHub Actions', 'TypeScript'],
        color: 'from-orange-500 to-red-500'
      }
    ]
  }
};

export type RoleKey = keyof typeof roleContent; 