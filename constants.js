// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
  konamiCode: [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ],
  easterEggDuration: 5000,
  observerOptions: { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
};

// ========================================
// SKILLS DATA
// ========================================
const SKILLS = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "Tools & Other",
    items: [
      { name: "Git", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Docker", level: 75 },
    ],
  },
];

// ========================================
// PROJECTS DATA
// ========================================
const PROJECTS = [
  {
    title: "News Explorer",
    description:
      "React application that fetches and displays recent news articles with pagination and saved items.",
    tech: ["React", "REST APIs", "CSS"],
    repo: "https://github.com/jhm323/News-Explorer",
    image: "assets/news-explorer.png",
  },
  {
    title: "Around the U.S.",
    description:
      "Responsive frontend project translating Figma designs into semantic HTML and BEM-based CSS.",
    tech: ["HTML", "CSS", "Flexbox", "Grid"],
    repo: "https://github.com/jhm323/se_project_aroundtheus",
    image: "assets/around-us.png",
  },
  {
    title: "WTWR — Full-Stack Auth App",
    description:
      "Full-stack application featuring JWT authentication, protected routes, and role-aware UI.",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    repo: "https://github.com/jhm323/se_project_react",
    image: "assets/wtwr.png",
  },
];
