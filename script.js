/* ======================
   DOM REFERENCES
====================== */
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

/* ======================
   SMOOTH SCROLL (PRO LEVEL)
====================== */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(targetId);
      if (!target) return;

      const navHeight = nav ? nav.offsetHeight : 70;

      window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: "smooth"
      });
    }
  });
});

/* ======================
   ACTIVE NAV (OPTIMIZED)
====================== */
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 120;

  let current = "";

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ======================
   SCROLL REVEAL (ELITE ANIMATION SYSTEM)
====================== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.15
  }
);

sections.forEach(section => {
  observer.observe(section);
});

/* ======================
   SETTINGS SYSTEM
====================== */
const body = document.body;

const modeToggle = document.getElementById("modeToggle");
const fontSizeToggle = document.getElementById("fontSizeToggle");
const highContrastToggle = document.getElementById("highContrastToggle");
const modeLabel = document.getElementById("modeLabel");

/* ======================
   LOAD SAVED SETTINGS
====================== */
function loadSettings() {
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    if (modeToggle) modeToggle.checked = true;
    if (modeLabel) modeLabel.textContent = "Dark Mode";
  }

  if (localStorage.getItem("largeFont") === "enabled") {
    body.classList.add("large-font");
    if (fontSizeToggle) fontSizeToggle.checked = true;
  }

  if (localStorage.getItem("highContrast") === "enabled") {
    body.classList.add("high-contrast");
    if (highContrastToggle) highContrastToggle.checked = true;
  }
}

loadSettings();

/* ======================
   DARK MODE
====================== */
if (modeToggle) {
  modeToggle.addEventListener("change", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

    if (modeLabel) {
      modeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
    }
  });
}

/* ======================
   FONT SIZE
====================== */
if (fontSizeToggle) {
  fontSizeToggle.addEventListener("change", () => {
    body.classList.toggle("large-font");

    localStorage.setItem(
      "largeFont",
      body.classList.contains("large-font") ? "enabled" : "disabled"
    );
  });
}

/* ======================
   HIGH CONTRAST MODE
====================== */
if (highContrastToggle) {
  highContrastToggle.addEventListener("change", () => {
    body.classList.toggle("high-contrast");

    localStorage.setItem(
      "highContrast",
      body.classList.contains("high-contrast") ? "enabled" : "disabled"
    );
  });
}

/* ======================
   PAGE LOAD ANIMATION (CLEAN)
====================== */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  sections.forEach(section => {
    section.classList.add("animate");
  });
});
