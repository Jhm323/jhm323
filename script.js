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

// Simple theme toggle (light / dark)
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// -----------------------------
// Project Data (Single Source of Truth)
// -----------------------------
const projects = [
  {
    title: "WTWR — Full-Stack Auth App",
    description:
      "Full-stack application featuring JWT authentication, protected routes, and role-aware UI.",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    repo: "https://github.com/jhm323/se_project_react",
    image: "assets/wtwr.png",
  },
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
];

// -----------------------------
// Render Projects
// -----------------------------
const projectGrid = document.getElementById("project-grid");

projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card";

  card.innerHTML = `
    <img 
      src="${project.image}" 
      alt="${project.title} screenshot"
      loading="lazy"
    />
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul class="tech-list">
        ${project.tech.map((t) => `<li>${t}</li>`).join("")}
      </ul>
      <a 
        href="${project.repo}" 
        target="_blank" 
        rel="noopener noreferrer"
        data-project="${project.title}"
        class="project-link"
      >
        View on GitHub →
      </a>
    </div>
  `;

  projectGrid.appendChild(card);
});

// -----------------------------
// Privacy-Safe Click Tracking
// -----------------------------
document.addEventListener("click", (event) => {
  const link = event.target.closest(".project-link");
  if (!link) return;

  const projectName = link.dataset.project;

  // Privacy-safe logging (no cookies, no identifiers)
  console.info("Project link clicked:", projectName);
});
