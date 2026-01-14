// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Update footer year automatically
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple theme toggle (light / dark)
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}
