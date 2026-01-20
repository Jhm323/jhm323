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
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-element--visible");
        observer.unobserve(entry.target);
      }
    });
  }, CONFIG.observerOptions);

  document
    .querySelectorAll(".fade-element")
    .forEach((el) => observer.observe(el));
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

  elements.easterEgg.addEventListener("click", closeEasterEgg);
  showEasterEggClue();
}

function activateEasterEgg() {
  elements.easterEgg.classList.add("easter-egg--active");
  setTimeout(closeEasterEgg, CONFIG.easterEggDuration);
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
    }, 5000);
  }, 10000);
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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-element--visible");
        observer.unobserve(entry.target);
      }
    });
  }, CONFIG.observerOptions);

  document
    .querySelectorAll(".project-card")
    .forEach((el) => observer.observe(el));

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
// MOBILE KEYBOARD TRIGGER
// ========================================
function openMobileKeyboard() {
  // Create or find an existing input element
  let input = document.getElementById("mobileKeyboardInput");

  if (!input) {
    input = document.createElement("input");
    input.id = "mobileKeyboardInput";
    input.type = "text";
    input.style.position = "absolute";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    input.style.height = "0";
    document.body.appendChild(input);
  }

  // Focus the input to trigger keyboard
  input.focus();
}

// Optional: Create a button to trigger this
function initMobileKeyboardButton() {
  const button = document.createElement("button");
  button.textContent = "⌨️ Open Keyboard";
  button.className = "mobile-keyboard-btn";
  button.onclick = openMobileKeyboard;

  // Only show on mobile devices
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    document.body.appendChild(button);
  }
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

initMobileKeyboardButton();
