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
  // J H M
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
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
// const PROJECTS = [
//   {
//     title: "News Explorer",
//     description:
//       "Fetches and displays recent news articles with pagination and saved items.",
//     tech: ["React", "REST APIs", "CSS"],
//     repo: "https://github.com/jhm323/News-Explorer",
//     image: "assets/news-explorer.png",
//   },
//   {
//     title: "Around the U.S.",
//     description:
//       "Responsive frontend project translating Figma designs into semantic HTML and BEM-based CSS.",
//     tech: ["HTML", "CSS", "Flexbox", "Grid", "Figma"],
//     repo: "https://github.com/jhm323/se_project_aroundtheus",
//     image: "assets/around-us.png",
//   },
//   {
//     title: "WTWR — Full-Stack Auth App",
//     description:
//       "Full-stack application featuring JWT authentication, protected routes, and role-aware UI.",
//     tech: ["React", "Node.js", "MongoDB", "JWT"],
//     repo: "https://github.com/jhm323/se_project_react",
//     image: "assets/wtwr.png",
//   },
//   {
//     title: "Triple Peaks Coffee Shop",
//     description:
//       "Responsive coffee shop landing page using BEM methodology, Flexbox layouts, and CSS animations. Features menu, reservation form, and about sections.",
//     tech: ["HTML5", "CSS3", "BEM", "Flexbox"],
//     repo: "https://github.com/jhm323/se_project_coffeeshop",
//     image: "assets/triplePeaks.png",
//   },
//   {
//     title: "CryptoDucks",
//     description:
//       "React application demonstrating frontend authentication and authorization with protected routes, user-specific views, and authentication-aware navigation.",
//     tech: ["React", "Vite", "React Router", "JavaScript"],
//     repo: "https://github.com/Jhm323/crypto-ducks",
//     image: "assets/cryptoDucks.png",
//   },
// ];

const PROJECTS = [
  {
    title: "News Explorer",
    summary:
      "A clean, easy-to-use app that helps people explore current news and save articles they care about.",
    whoItsFor:
      "Readers who want to stay informed without information overload.",
    whyItMatters:
      "Good information is hard to sift through. This project makes news browsing calmer, faster, and more intentional.",
    features: [
      "Search and browse recent news articles",
      "Save articles to read later",
      "Paginated results for easier reading",
    ],
    tech: ["React", "REST APIs", "CSS"],
    techLabel: "Built with modern web technologies for speed and reliability.",
    repo: "https://github.com/jhm323/News-Explorer",
    image: "assets/news-explorer.png",
  },

  {
    title: "Around the U.S.",
    summary:
      "A responsive photo-sharing layout that looks great on phones, tablets, and desktops.",
    whoItsFor:
      "Anyone who wants a smooth, visually consistent experience across devices.",
    whyItMatters:
      "Most people browse on mobile. This project shows how design can stay beautiful and usable everywhere.",
    features: [
      "Mobile-first responsive layout",
      "Accessible, semantic HTML structure",
      "Design translated directly from professional mockups",
    ],
    tech: ["HTML", "CSS", "Flexbox", "Grid", "Figma"],
    techLabel:
      "Carefully translated from professional design files into clean code.",
    repo: "https://github.com/jhm323/se_project_aroundtheus",
    image: "assets/around-us.png",
  },

  {
    title: "WTWR — Weather-Based Clothing App",
    summary:
      "A personalized app that adapts both clothing recommendations and interface styling based on real-time weather conditions.",
    whoItsFor:
      "People who want their daily outfit decisions—and the apps they use—to respond intelligently to the weather.",
    whyItMatters:
      "Weather affects how we feel, what we wear, and how we interact with technology. WTWR reduces decision fatigue by making both content and design context-aware.",
    features: [
      "Suggests clothing based on current temperature and conditions",
      "Updates visual styles to reflect the weather (colors, icons, and mood)",
      "Secure personal accounts with saved wardrobe items",
      "Custom clothing recommendations tied to user preferences",
    ],
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    techLabel:
      "A full-stack, weather-aware application with dynamic UI behavior and secure user accounts.",
    repo: "https://github.com/jhm323/se_project_react",
    image: "assets/wtwr.png",
  },

  {
    title: "Triple Peaks Coffee Shop",
    summary:
      "A warm, inviting website for a coffee shop, designed to feel as thoughtful as the space itself.",
    whoItsFor:
      "Small businesses that want their website to reflect their personality.",
    whyItMatters:
      "A website is often a customer’s first impression—this one feels human, not generic.",
    features: [
      "Clear menu and reservation flow",
      "Subtle animations for delight",
      "Clean, readable layout",
    ],
    tech: ["HTML5", "CSS3", "BEM", "Flexbox"],
    techLabel:
      "Built with a strong focus on clarity, structure, and maintainability.",
    repo: "https://github.com/jhm323/se_project_coffeeshop",
    image: "assets/triplePeaks.png",
  },

  {
    title: "CryptoDucks",
    summary:
      "A playful web app that demonstrates how user accounts and permissions work in modern apps.",
    whoItsFor:
      "Teams or learners who want to understand how login systems behave behind the scenes.",
    whyItMatters:
      "Authentication is invisible when it works—and frustrating when it doesn’t. This project explores doing it right.",
    features: [
      "User-specific views",
      "Protected routes",
      "Authentication-aware navigation",
    ],
    tech: ["React", "Vite", "React Router", "JavaScript"],
    techLabel: "Demonstrates real-world account and access control patterns.",
    repo: "https://github.com/Jhm323/crypto-ducks",
    image: "assets/cryptoDucks.png",
  },
];
