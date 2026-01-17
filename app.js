
// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function showToast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove("show"), 1600);
}

function setAlert(el, type, msg) {
  if (!el) return;
  el.classList.remove("ok", "err");
  if (type) el.classList.add(type);
  el.textContent = msg || "";
}

// ---------- Theme toggle ----------
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

const themeBtn = $("#themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    showToast(next === "light" ? "Light mode" : "Dark mode");
  });
}

// ---------- Mobile menu ----------
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
}

// ---------- Active nav link ----------
const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
$$("[data-nav]").forEach(a => {
  const href = (a.getAttribute("href") || "").toLowerCase();
  if (href === path) a.classList.add("active");
});

// ---------- Reveal on scroll ----------
const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ---------- Back to top ----------
const btt = $("#backToTop");
if (btt) {
  const onScroll = () => btt.classList.toggle("show", window.scrollY > 500);
  window.addEventListener("scroll", onScroll);
  onScroll();
  btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// =====================================================
// Demo Login logic (keeps Playwright IDs + messages)
// =====================================================
const emailEl = $("#email");
const passEl = $("#password");
const loginBtn = $("#loginBtn");
const loginMsg = $("#loginMessage");

if (loginBtn && emailEl && passEl && loginMsg) {
  const fillValid = $("#fillValid");
  const clearLogin = $("#clearLogin");

  const doLogin = () => {
    const email = (emailEl.value || "").trim();
    const pass = (passEl.value || "").trim();

    if (!email || !pass) {
      setAlert(loginMsg, "err", "Please enter email and password.");
      return;
    }

    if (email === "qa@test.com" && pass === "Password123") {
      setAlert(loginMsg, "ok", "Login successful!");
    } else {
      setAlert(loginMsg, "err", "Invalid credentials.");
    }
  };

  loginBtn.addEventListener("click", () => {
    showToast("Trying login…");
    doLogin();
  });

  [emailEl, passEl].forEach(el => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        doLogin();
      }
    });
  });

  if (fillValid) fillValid.addEventListener("click", () => {
    emailEl.value = "qa@test.com";
    passEl.value = "Password123";
    setAlert(loginMsg, "", "");
    showToast("Filled valid credentials");
  });

  if (clearLogin) clearLogin.addEventListener("click", () => {
    emailEl.value = "";
    passEl.value = "";
    setAlert(loginMsg, "", "");
    showToast("Cleared");
  });
}

// =====================================================
// Demo Form logic (keeps Playwright IDs + messages)
// =====================================================
const nameEl = $("#name");
const topicEl = $("#topic");
const detailsEl = $("#details");
const submitBtn = $("#submitBtn");
const formMsg = $("#formMessage");

if (submitBtn && nameEl && topicEl && detailsEl && formMsg) {
  const fillForm = $("#fillForm");
  const clearForm = $("#clearForm");

  const validate = () => {
    const name = (nameEl.value || "").trim();
    const details = (detailsEl.value || "").trim();

    if (name.length < 2) {
      setAlert(formMsg, "err", "Name must be at least 2 characters.");
      return false;
    }
    if (details.length < 10) {
      setAlert(formMsg, "err", "Details must be at least 10 characters.");
      return false;
    }
    return true;
  };

  submitBtn.addEventListener("click", () => {
    showToast("Submitting…");
    if (!validate()) return;
    setAlert(formMsg, "ok", "Submitted successfully! (demo)");
  });

  if (fillForm) fillForm.addEventListener("click", () => {
    nameEl.value = "John Doe";
    topicEl.value = "Bug report";
    detailsEl.value = "This is a valid description.";
    setAlert(formMsg, "", "");
    showToast("Filled valid form");
  });

  if (clearForm) clearForm.addEventListener("click", () => {
    nameEl.value = "";
    topicEl.value = "Bug report";
    detailsEl.value = "";
    setAlert(formMsg, "", "");
    showToast("Cleared");
  });
}
