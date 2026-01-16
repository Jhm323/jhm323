"use strict";

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
  page: document.querySelector(".page"),
  scrollProgress: document.getElementById("scrollProgress"),
  themeToggle: document.getElementById("themeToggle"),
  currentYear: document.getElementById("currentYear"),
  projectGrid: document.getElementById("projectGrid"),
  easterEgg: document.getElementById("easterEgg"),
  easterEggClue: document.getElementById("easterEggClue"),
};

// ========================================
// THEME
// ========================================
const Theme = {
  init() {
    if (!elements.themeToggle || !elements.page) return;

    this.loadSavedTheme();
    elements.themeToggle.addEventListener("click", () => this.toggle());
  },

  toggle() {
    elements.page.classList.toggle("page--dark");
    this.saveTheme();
  },

  saveTheme() {
    const isDark = elements.page.classList.contains("page--dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  },

  loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      elements.page.classList.remove("page--dark");
    } else if (savedTheme === "dark") {
      elements.page.classList.add("page--dark");
    }
  },
};

// ========================================
// SCROLL PROGRESS
// ========================================
const ScrollProgress = {
  update() {
    if (!elements.scrollProgress) return;

    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    elements.scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
  },

  init() {
    window.addEventListener("scroll", () => this.update(), { passive: true });
  },
};

// ========================================
// SCROLL ANIMATIONS
// ========================================
const ScrollAnimations = {
  observer: null,

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-element--visible");
            this.observer.unobserve(entry.target);
          }
        });
      },
      CONFIG.observerOptions
    );

    document
      .querySelectorAll(".fade-element")
      .forEach((el) => this.observer.observe(el));
  },

  observeElement(element) {
    if (this.observer && element) {
      this.observer.observe(element);
    }
  },
};

// ========================================
// 3D CARD TILT
// ========================================
const CardTilt = {
  cards: [],

  init() {
    this.cards = document.querySelectorAll(".project-card");
    this.cards.forEach((card) => this.attachListeners(card));
  },

  attachListeners(card) {
    card.addEventListener("mouseenter", () => this.handleMouseEnter(card));
    card.addEventListener("mousemove", (e) => this.handleMouseMove(card, e));
    card.addEventListener("mouseleave", () => this.handleMouseLeave(card));
  },

  handleMouseEnter(card) {
    card.classList.add("project-card--tilt-active");
  },

  handleMouseMove(card, e) {
    if (!card.classList.contains("project-card--tilt-active")) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
  },

  handleMouseLeave(card) {
    card.classList.remove("project-card--tilt-active");
    requestAnimationFrame(() => {
      card.style.transform = "";
    });
  },
};

// ========================================
// EASTER EGG
// ========================================
const EasterEgg = {
  konamiIndex: 0,
  clueTimeout: null,
  hideTimeout: null,

  init() {
    if (!elements.easterEgg) return;

    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
    elements.easterEgg.addEventListener("click", () => this.close());

    this.showClue();
  },

  handleKeyPress(e) {
    if (e.key === CONFIG.konamiCode[this.konamiIndex]) {
      this.konamiIndex++;
      if (this.konamiIndex === CONFIG.konamiCode.length) {
        this.activate();
        this.konamiIndex = 0;
      }
    } else {
      this.konamiIndex = 0;
    }
  },

  activate() {
    elements.easterEgg.classList.add("easter-egg--active");
    this.hideTimeout = setTimeout(() => this.close(), CONFIG.easterEggDuration);
  },

  close() {
    elements.easterEgg.classList.remove("easter-egg--active");
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  },

  showClue() {
    if (!elements.easterEggClue) return;

    this.clueTimeout = setTimeout(() => {
      elements.easterEggClue.classList.add("easter-egg-clue--visible");

      setTimeout(() => {
        elements.easterEggClue.classList.remove("easter-egg-clue--visible");
      }, 5000);
    }, 10000);
  },
};

// ========================================
// PROJECTS
// ========================================
const Projects = {
  createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card fade-element";

    card.innerHTML = `
      <img class="project-card__image" 
           src="${this.escapeHtml(project.image)}" 
           alt="${this.escapeHtml(project.title)}" 
           loading="lazy">
      <div class="project-card__content">
        <h3 class="project-card__title">${this.escapeHtml(project.title)}</h3>
        <p class="project-card__description">${this.escapeHtml(project.description)}</p>
        <ul class="project-card__tech-list">
          ${project.tech
            .map(
              (tech) =>
                `<li class="project-card__tech-item">${this.escapeHtml(tech)}</li>`
            )
            .join("")}
        </ul>
        <a href="${this.escapeHtml(project.repo)}" 
           class="project-card__link" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="View ${this.escapeHtml(project.title)} on GitHub">
          View on GitHub →
        </a>
      </div>
    `;

    return card;
  },

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },

  render() {
    if (!elements.projectGrid || !PROJECTS) return;

    const fragment = document.createDocumentFragment();

    PROJECTS.forEach((project) => {
      const card = this.createProjectCard(project);
      fragment.appendChild(card);
      ScrollAnimations.observeElement(card);
    });

    elements.projectGrid.appendChild(fragment);
    CardTilt.init();
  },
};

// ========================================
// SMOOTH SCROLL
// ========================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => this.handleClick(e, link));
    });
  },

  handleClick(e, link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (target.hasAttribute("tabindex")) {
        target.focus();
      }
    }
  },
};

// ========================================
// UTILITIES
// ========================================
const Utils = {
  setCurrentYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
  },

  logEasterEggHint() {
    console.log(
      "%c🎮 Psst... Try the Konami Code! ↑↑↓↓←→←→BA",
      "color: #60a5fa; font-size: 14px; font-weight: bold;"
    );
  },
};

// ========================================
// INITIALIZATION
// ========================================
function init() {
  try {
    Utils.setCurrentYear();
    Utils.logEasterEggHint();

    Theme.init();
    SmoothScroll.init();
    ScrollAnimations.init();
    ScrollProgress.init();
    EasterEgg.init();
    Projects.render();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

// ========================================
// START APPLICATION
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
