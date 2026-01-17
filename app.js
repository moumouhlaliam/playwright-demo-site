// Theme (saved)
const root = document.documentElement;
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);

const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  }
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Counter animation
function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  const start = 0;
  const duration = 900;
  const t0 = performance.now();

  function tick(t) {
    const p = Math.min(1, (t - t0) / duration);
    const val = Math.floor(start + (target - start) * (1 - Math.pow(1 - p, 3)));
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll("[data-count]");
const cio = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      animateCount(e.target);
      cio.unobserve(e.target);
    }
  }
}, { threshold: 0.6 });
counters.forEach(el => cio.observe(el));

// Back to top
const btt = document.getElementById("backToTop");
if (btt) {
  window.addEventListener("scroll", () => {
    btt.classList.toggle("show", window.scrollY > 500);
  });
  btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
