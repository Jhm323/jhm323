"use strict";

// DOM elements
const elements = {
  page: document.querySelector(".page"),
  scrollProgress: document.getElementById("scrollProgress"),
  themeToggle: document.getElementById("themeToggle"),
  currentYear: document.getElementById("currentYear"),
  projectGrid: document.getElementById("projectGrid"),
  easterEgg: document.getElementById("easterEgg"),
  easterEggClue: document.getElementById("easterEggClue"),
  legoJHM: document.getElementById("legoJHM"),
};

// Theme toggle
function initTheme() {
  if (!elements.themeToggle) return;
  elements.themeToggle.addEventListener("click", () => {
    elements.page.classList.toggle("page--dark");
    const isDark = elements.page.classList.contains("page--dark");
    elements.themeToggle.textContent = isDark ? "🌙" : "☀️";
    elements.themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  });
}

// Scroll progress
function updateScrollProgress() {
  if (!elements.scrollProgress) return;
  const scrolled = Math.min(
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
      100,
    100,
  );
  elements.scrollProgress.style.width = `${scrolled}%`;
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-element--visible");
        obs.unobserve(entry.target);
      }
    });
  }, CONFIG.observerOptions);

  document.querySelectorAll(".fade-element").forEach((el) => {
    observer.observe(el);
  });
}

// Project card utils
function setHover(card, on) {
  card.classList.toggle("project-card--hover", on);
}

function initFloatHover() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.add("project-card--float");
    card.style.animationDelay = `${Math.random() * 2}s`;

    const enter = () => setHover(card, true);
    const leave = () => setHover(card, false);

    card.addEventListener("mouseenter", enter);
    card.addEventListener("focus", enter);
    card.addEventListener("mouseleave", leave);
    card.addEventListener("blur", leave);
  });
}

// Easter Egg
function initEasterEgg() {
  if (!elements.easterEgg) return;
  let konamiIndex = 0;

  function handleKonamiInput(key) {
    if (key === CONFIG.konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === CONFIG.konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  }

  document.addEventListener("keydown", (e) => handleKonamiInput(e.key));
  document.querySelectorAll(".keypad-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      handleKonamiInput(this.dataset.key);
      this.classList.add("keypad-btn--pressed");
      setTimeout(() => this.classList.remove("keypad-btn--pressed"), 100);
    });
  });

  elements.easterEgg.addEventListener("click", closeEasterEgg);
  showEasterEggClue();
}

function activateEasterEgg() {
  elements.easterEgg.classList.add("easter-egg--active");
  setTimeout(playLegoJHMAnimation, 2000);
  setTimeout(closeEasterEgg, 10000);
}

function closeEasterEgg() {
  elements.easterEgg.classList.remove("easter-egg--active");
}

function showEasterEggClue() {
  if (!elements.easterEggClue) return;
  setTimeout(() => {
    elements.easterEggClue.classList.add("easter-egg-clue--visible");
    setTimeout(() => {
      elements.easterEggClue.classList.remove("easter-egg-clue--visible");
    }, 8000);
  }, 2000);
}

// Projects
function renderProjects() {
  if (!elements.projectGrid || !PROJECTS) return;
  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card fade-element";
    card.tabIndex = 0;

    card.innerHTML = `
  <img
    class="project-card__image"
    src="${project.image}"
    alt="${project.title}"
    loading="lazy"
  >

  <div class="project-card__content">
    <h3 class="project-card__title">${project.title}</h3>

    <p class="project-card__description">
      ${project.summary}
    </p>

    <p class="project-card__audience">
      <strong>Who it’s for:</strong> ${project.whoItsFor}
    </p>

    <ul class="project-card__features">
      ${project.features
        .map((feature) => `<li class="project-card__feature">${feature}</li>`)
        .join("")}
    </ul>

    <ul class="project-card__tech-list">
      ${project.tech
        .map((tech) => `<li class="project-card__tech-item">${tech}</li>`)
        .join("")}
    </ul>

    <a
      href="${project.repo}"
      class="project-card__link"
      target="_blank"
      rel="noopener noreferrer"
    >
      View on GitHub →
    </a>
  </div>
`;

    fragment.appendChild(card);
  });

  elements.projectGrid.appendChild(fragment);

  initScrollAnimations();
  initFloatHover();
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// JHM Animation
function animateBlocks(blocks, from, to, duration, delayStep, easing) {
  blocks.forEach((block, i) => {
    setTimeout(
      () => {
        block.el.animate(
          [
            { transform: from, opacity: from.includes("120vw") ? 0 : 1 },
            { transform: to, opacity: to.includes("120vw") ? 0 : 1 },
          ],
          {
            duration: duration + Math.random() * 400,
            easing,
            fill: "forwards",
          },
        );
      },
      i * delayStep + Math.random() * 100,
    );
  });
}

function playLegoJHMAnimation() {
  const container = elements.legoJHM;
  if (!container) return;
  container.innerHTML = "";
  const blockSize = 24;
  const blocks = [];

  JHM_GRID.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const block = document.createElement("div");
        block.className = "lego-block";
        block.style.background =
          COLORS[Math.floor(Math.random() * COLORS.length)];
        block.style.left = `${x * blockSize}px`;
        block.style.top = `${y * blockSize}px`;
        container.appendChild(block);
        blocks.push({ el: block, x, y });
      }
    });
  });

  animateBlocks(
    blocks,
    "translateX(-120vw) rotate(-30deg)",
    "translateX(0) rotate(0deg)",
    1200,
    60,
    "cubic-bezier(.68,-0.55,.27,1.55)",
  );

  setTimeout(() => {
    animateBlocks(
      blocks,
      "translateX(0)",
      "translateX(120vw) rotate(30deg)",
      900,
      40,
      "ease-in",
    );
  }, 5000);

  setTimeout(() => {
    animateBlocks(
      blocks,
      "translateX(0)",
      "translateX(120vw) rotate(30deg)",
      900,
      40,
      "ease-in",
    );
  }, 7500);
}

// Initialize
function init() {
  if (elements.currentYear) {
    elements.currentYear.textContent = new Date().getFullYear();
  }

  console.log(
    "%c🎮 Psst... Try the Konami Code! ↑↑↓↓←→←→BA",
    "color: #60a5fa; font-size: 14px; font-weight: bold;",
  );

  initTheme();
  initSmoothScroll();
  initScrollAnimations();
  initEasterEgg();
  renderProjects();

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
}

// Start App
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
