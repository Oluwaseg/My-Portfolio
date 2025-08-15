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
    ]
  }
};

export type RoleKey = keyof typeof roleContent; 