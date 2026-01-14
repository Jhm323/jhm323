// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Update footer year automatically
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple theme toggle (dark is default)
const themeToggle = document.getElementById("theme-toggle");
const page = document.querySelector(".page");

// Set dark mode as default
page.classList.add("page--dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    page.classList.toggle("page--dark");
  });
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-element--visible");

      // Animate skill bars when visible
      if (entry.target.classList.contains("skills")) {
        animateSkills();
      }
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-element").forEach((el) => {
  observer.observe(el);
});

// ========================================
// SKILLS ANIMATION
// ========================================
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill__fill");
  skillBars.forEach((bar) => {
    const skillLevel = bar.getAttribute("data-skill");
    bar.style.setProperty("--skill-width", skillLevel + "%");
    setTimeout(() => {
      bar.classList.add("skill__fill--animated");
      bar.style.width = skillLevel + "%";
    }, 200);
  });
}

// ========================================
// 3D CARD TILT EFFECT
// ========================================
function init3DTilt() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("project-card--tilt-active");
    });

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
// KONAMI CODE EASTER EGG
// ========================================
const konamiCode = [
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
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key === konamiCode[konamiIndex]) {
    konamiIndex++;

    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  const easterEgg = document.getElementById("easter-egg");
  easterEgg.classList.add("easter-egg--active");

  // Confetti effect (optional - simple version)
  page.style.animation = "rainbow 2s linear infinite";

  setTimeout(() => {
    easterEgg.classList.remove("easter-egg--active");
    page.style.animation = "";
  }, 5000);
}

// Close easter egg on click
document.getElementById("easter-egg").addEventListener("click", function () {
  this.classList.remove("easter-egg--active");
  page.style.animation = "";
});

// ========================================
// PROJECT DATA
// ========================================
const projects = [
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

// ========================================
// RENDER PROJECTS
// ========================================
const projectGrid = document.getElementById("project-grid");

projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card fade-element";

  card.innerHTML = `
    <img 
      class="project-card__image"
      src="${project.image}" 
      alt="${project.title} screenshot"
      loading="lazy"
    />
    <div class="project-card__content">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__description">${project.description}</p>
      <ul class="project-card__tech-list">
        ${project.tech
          .map((t) => `<li class="project-card__tech-item">${t}</li>`)
          .join("")}
      </ul>
      <a 
        href="${project.repo}" 
        target="_blank" 
        rel="noopener noreferrer"
        data-project="${project.title}"
        class="project-card__link"
      >
        View on GitHub →
      </a>
    </div>
  `;

  projectGrid.appendChild(card);
});

// Initialize 3D tilt after projects are rendered
init3DTilt();

// Re-observe project cards for scroll animation
document.querySelectorAll(".project-card").forEach((el) => {
  observer.observe(el);
});

// ========================================
// PRIVACY-SAFE CLICK TRACKING
// ========================================
document.addEventListener("click", (event) => {
  const link = event.target.closest(".project-card__link");
  if (!link) return;

  const projectName = link.dataset.project;
  console.log(`Project clicked: ${projectName}`);
});
