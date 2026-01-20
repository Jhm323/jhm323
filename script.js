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
  legoJHM: document.getElementById("legoJHM"),
};

// ========================================
// THEME
// ========================================
function initTheme() {
  elements.themeToggle?.addEventListener("click", () => {
    elements.page.classList.toggle("page--dark");
  });
}

// ========================================
// SCROLL PROGRESS
// ========================================
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

// ========================================
// SCROLL ANIMATIONS
// ========================================
function fadeInOnScroll(selector, visibleClass, options) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

function initScrollAnimations() {
  fadeInOnScroll(
    ".fade-element",
    "fade-element--visible",
    CONFIG.observerOptions,
  );
}

// ========================================
// 3D CARD TILT
// ========================================
function init3DTilt() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      card.classList.add("project-card--tilt-active"),
    );

    card.addEventListener("mousemove", (e) => {
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
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("project-card--tilt-active");
      requestAnimationFrame(() => {
        card.style.transform = "";
      });
    });
  });
}

// ========================================
// EASTER EGG
// ========================================
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
  setTimeout(playLegoJHMAnimation, 2000); // JHM after 2s
  setTimeout(closeEasterEgg, 10000); // Close after 8s
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

// ========================================
// PROJECTS
// ========================================
function renderProjects() {
  if (!elements.projectGrid || !PROJECTS) return;
  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card fade-element";
    card.innerHTML = `
      <img class="project-card__image" src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-card__content">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        <ul class="project-card__tech-list">
          ${project.tech.map((tech) => `<li class="project-card__tech-item">${tech}</li>`).join("")}
        </ul>
        <a href="${project.repo}" class="project-card__link" target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </div>
    `;
    fragment.appendChild(card);
  });

  elements.projectGrid.appendChild(fragment);
  fadeInOnScroll(
    ".project-card",
    "fade-element--visible",
    CONFIG.observerOptions,
  );
  init3DTilt();
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ========================================
// Lego JHM Animation
// ========================================
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

  // Animate in
  animateBlocks(
    blocks,
    "translateX(-120vw) rotate(-30deg)",
    "translateX(0) rotate(0deg)",
    1200,
    60,
    "cubic-bezier(.68,-0.55,.27,1.55)",
  );

  // Disintegrate after 5s
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

  // Animate out after 6s (redundant, but preserves original timing)
  setTimeout(() => {
    animateBlocks(
      blocks,
      "translateX(0)",
      "translateX(120vw) rotate(30deg)",
      900,
      40,
      "ease-in",
    );
  }, 6000);
}

// ========================================
// INITIALIZATION
// ========================================
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

// ========================================
// START APPLICATION
// ========================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
