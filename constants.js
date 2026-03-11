// CONFIGURATION
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
  observerOptions: { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
};

// JHM_Grid
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

const PROJECTS = [
  {
    title: "Mother Meera",
    summary:
      "A LinkTree-style landing page built to direct social media traffic to the online accounts of Mother Meera, a spiritual teacher and mystic. Minimal, elegant, and fast.",
    whoItsFor:
      "Spiritual communities and organizations that need a clean, accessible link-aggregator page for social media traffic.",
    whyItMatters:
      "This project demonstrates clean separation of concerns using ES Modules, progressive enhancement, accessibility best practices, and thoughtful UX design — all without a framework.",
    features: [
      "All links and profile info managed via a constants.js module — no hardcoding",
      "Auto-detects platform from URL to apply correct icon, color, and animation",
      "Staggered animations and glassmorphism card layout with gold accent theming",
      "Fully accessible: semantic HTML, aria-label navigation, and keyboard navigable",
      "Progressive enhancement — static fallback links work even with JavaScript disabled",
    ],
    tech: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "ES Modules",
      "Font Awesome",
      "GitHub Pages",
    ],
    techLabel:
      "Focused on modularity, accessibility, and delivering a polished UX with zero dependencies.",
    repo: "https://github.com/Jhm323/Mother-Meera",
    image: "assets/mother-meera.png",
  },

  {
    title: "Triple Peaks Coffee Shop",
    summary:
      "A static website for a coffee shop built using structured HTML and modular CSS methodology.",
    whoItsFor:
      "Small businesses that need a clean, responsive informational website.",
    whyItMatters:
      "This project demonstrates layout structure, BEM methodology, and basic animation techniques.",
    features: [
      "Menu and reservation layout sections",
      "Responsive structure",
      "CSS-based hover and transition effects",
    ],
    tech: ["HTML5", "CSS3", "BEM", "Flexbox"],
    techLabel:
      "Focused on semantic structure, maintainable CSS, and clean layout implementation.",
    repo: "https://github.com/jhm323/se_project_coffeeshop",
    image: "assets/triplePeaks.png",
  },
  {
    title: "Around the U.S.",
    summary:
      "A responsive photo-sharing layout built from a design mockup using semantic HTML and modern CSS.",
    whoItsFor:
      "Users viewing content across mobile, tablet, and desktop devices.",
    whyItMatters:
      "This project demonstrates responsive design principles and translating Figma designs into functional code.",
    features: [
      "Mobile-first responsive layout",
      "Semantic HTML structure",
      "Flexbox and Grid for layout control",
    ],
    tech: ["HTML", "CSS", "Flexbox", "Grid", "Figma"],
    techLabel:
      "Emphasizes responsive design, clean structure, and attention to layout detail.",
    repo: "https://github.com/jhm323/se_project_aroundtheus",
    image: "assets/around-us.png",
  },
  {
    title: "WTWR — Weather-Based Clothing App",
    summary:
      "A full-stack application that provides clothing suggestions based on real-time weather data and allows users to manage saved wardrobe items.",
    whoItsFor:
      "Users who want simple outfit suggestions based on current weather conditions.",
    whyItMatters:
      "This project demonstrates full-stack development, authentication with JWT, and connecting a React frontend to a Node.js/Express backend.",
    features: [
      "Fetches real-time weather data from an external API",
      "Suggests clothing based on temperature",
      "User authentication with JWT",
      "CRUD functionality for saved clothing items",
    ],
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    techLabel:
      "Built to practice API integration, backend routing, authentication, and database operations.",
    repo: "https://github.com/jhm323/se_project_react",
    image: "assets/wtwr.png",
  },
];
