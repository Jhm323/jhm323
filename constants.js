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
  // Card 0 — CodeRef AI (featured)
  {
    title: "CodeRef AI",
    summary:
      "A weekend-built RAG application for AEC professionals. Upload a building code PDF, ask questions in plain English, and get back the exact verbatim code section with citations — never summarized or paraphrased. Cross-referenced sections automatically expand so engineers can trace requirements across hundreds of pages instantly.",
    whoItsFor:
      "Architects, engineers, and construction professionals who need fast, precise answers from building code documents without digging through hundreds of pages.",
    whyItMatters:
      "This project demonstrates a full RAG pipeline built without a framework — chunking and embedding a 833-page PDF client-side, querying a 70B LLM via API, and returning verbatim citations with zero hallucination risk.",
    features: [
      "Upload any building code PDF — processes 800+ pages into 7,000+ searchable chunks",
      "Returns exact verbatim code text with section citations — no summaries or paraphrasing",
      "Auto-expands cross-referenced sections so requirements can be traced across the document instantly",
      "Powered by Llama 3.3 70B via Groq API for near-instant retrieval",
    ],
    tech: ["Vanilla JavaScript", "PDF.js", "Groq API", "Llama 3.3 70B", "Tailwind CSS", "RAG"],
    techLabel:
      "Demonstrates a complete RAG pipeline — PDF parsing, chunking, retrieval, and LLM integration — with no backend or framework.",
    repo: "https://github.com/jhm323/coderef-ai",
    live: "https://jhm323.github.io/coderef-ai",
    image: "assets/coderef-ai.png",
  },

  // Card 1 — span 4 (featured large) — strongest visual
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

  // Card 2 — span 2 (featured small) — second strongest visual
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

  // Card 3 — span 3
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

  // Card 4 — span 3
  {
    title: "News Explorer",
    summary:
      "A React application that allows users to search for recent news articles and save them for later reading.",
    whoItsFor:
      "Users who want a simple way to browse and manage news articles.",
    whyItMatters:
      "This project demonstrates working with third-party APIs, managing state in React, and handling paginated data.",
    features: [
      "Search and browse recent news articles",
      "Save and remove articles from a personal list",
      "Paginated results with loading states",
    ],
    tech: ["React", "REST APIs", "CSS"],
    techLabel:
      "Focused on API integration, component structure, and state management.",
    repo: "https://github.com/jhm323/News-Explorer",
    image: "assets/news-explorer.png",
  },

  // Card 5 — span 6 (full width bottom row)
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
    image: "assets/triple-peaks.png",
  },
];
