"use strict";

// CONFIG, SKILLS, and PROJECTS are now in constants.js

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
  page: document.querySelector(".page"),
  scrollProgress: document.getElementById("scrollProgress"),
  themeToggle: document.getElementById("themeToggle"),
  currentYear: document.getElementById("currentYear"),
  skillsGrid: document.getElementById("skillsGrid"),
  projectGrid: document.getElementById("projectGrid"),
  easterEgg: document.getElementById("easterEgg"),
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
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  elements.scrollProgress.style.width = `${scrolled}%`;
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-element--visible");
        if (entry.target.id === "skills") animateSkills();
      }
    });
  }, CONFIG.observerOptions);

  document
    .querySelectorAll(".fade-element")
    .forEach((el) => observer.observe(el));
}

// ========================================
// SKILLS
// ========================================
function renderSkills() {
  const fragment = document.createDocumentFragment();

  SKILLS.forEach((category) => {
    const categoryEl = document.createElement("div");
    categoryEl.className = "skill-category";

    const skillsHTML = category.items
      .map(
        (skill) => `
      <div class="skill">
        <span class="skill__name">${skill.name}</span>
        <div class="skill__bar">
          <div class="skill__fill" data-skill="${skill.level}"></div>
        </div>
      </div>
    `
      )
      .join("");

    categoryEl.innerHTML = `
      <h3 class="skill-category__title">${category.category}</h3>
      ${skillsHTML}
    `;

    fragment.appendChild(categoryEl);
  });

  elements.skillsGrid.appendChild(fragment);
}

function animateSkills() {
  document.querySelectorAll(".skill__fill").forEach((bar) => {
    const level = bar.dataset.skill;
    bar.style.setProperty("--skill-width", `${level}%`);
    setTimeout(() => {
      bar.classList.add("skill__fill--animated");
      bar.style.width = `${level}%`;
    }, 200);
  });
}

// ========================================
// 3D CARD TILT
// ========================================
function init3DTilt() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      card.classList.add("project-card--tilt-active")
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

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("project-card--tilt-active");
      card.style.transform = "";
    });
  });
}

// ========================================
// EASTER EGG
// ========================================
function initEasterEgg() {
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === CONFIG.konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === CONFIG.konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  elements.easterEgg?.addEventListener("click", closeEasterEgg);
}

function activateEasterEgg() {
  elements.easterEgg.classList.add("easter-egg--active");
  setTimeout(closeEasterEgg, CONFIG.easterEggDuration);
}

function closeEasterEgg() {
  elements.easterEgg.classList.remove("easter-egg--active");
}

// ========================================
// PROJECTS
// ========================================
function renderProjects() {
  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card fade-element";
    card.innerHTML = `
      <img class="project-card__image" src="${project.image}" alt="${
      project.title
    }" loading="lazy">
      <div class="project-card__content">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        <ul class="project-card__tech-list">
          ${project.tech
            .map((tech) => `<li class="project-card__tech-item">${tech}</li>`)
            .join("")}
        </ul>
        <a href="${
          project.repo
        }" class="project-card__link" target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </div>
    `;
    fragment.appendChild(card);
  });

  elements.projectGrid.appendChild(fragment);

  // Re-observe new cards
  document.querySelectorAll(".project-card").forEach((el) => {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("fade-element--visible");
        });
      },
      CONFIG.observerOptions
    ).observe(el);
  });

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
// INITIALIZATION
// ========================================
function init() {
  // Set current year
  if (elements.currentYear)
    elements.currentYear.textContent = new Date().getFullYear();

  // Initialize features
  initTheme();
  initSmoothScroll();
  initScrollAnimations();
  initEasterEgg();
  renderSkills();
  renderProjects();

  // Event listeners
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
}

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
