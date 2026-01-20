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
// JHM_Grid
// ========================================
const JHM_GRID = [
  // J
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
];

const COLORS = [
  "#e63946",
  "#f1faee",
  "#a8dadc",
  "#457b9d",
  "#ffbe0b",
  "#43aa8b",
  "#f3722c",
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
  {
    title: "Triple Peaks Coffee Shop",
    description:
      "Responsive coffee shop landing page using BEM methodology, Flexbox layouts, and CSS animations. Features menu, reservation form, and about sections.",
    tech: ["HTML5", "CSS3", "BEM", "Flexbox"],
    repo: "https://github.com/jhm323/se_project_coffeeshop",
    image: "assets/triplePeaks.png",
  },
  {
    title: "CryptoDucks",
    description:
      "React application demonstrating frontend authentication and authorization with protected routes, user-specific views, and authentication-aware navigation.",
    tech: ["React", "Vite", "React Router", "JavaScript"],
    repo: "https://github.com/Jhm323/crypto-ducks",
    image: "assets/cryptoDucks.png",
  },
];
