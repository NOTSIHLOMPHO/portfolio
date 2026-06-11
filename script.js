// ======================
// NAVIGATION + SMOOTH SCROLL
// ======================

const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

// Smooth scroll with nav offset fix
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");

    // Only handle internal links
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(targetId);

      if (target) {
        const navHeight = nav ? nav.offsetHeight : 70;

        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: "smooth"
        });
      }

      // Update active link immediately
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});


// ======================
// ACTIVE NAV ON SCROLL
// ======================

window.addEventListener("scroll", () => {
  let currentSection = "";
  const navHeight = nav ? nav.offsetHeight : 70;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 50;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ======================
// SECTION ANIMATION (MODERN WAY)
// ======================

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.2
  }
);

sections.forEach(section => {
  observer.observe(section);
});


// ======================
// SETTINGS SYSTEM (DARK MODE, FONT, CONTRAST)
// ======================

const body = document.body;

const modeToggle = document.getElementById("modeToggle");
const fontSizeToggle = document.getElementById("fontSizeToggle");
const highContrastToggle = document.getElementById("highContrastToggle");
const modeLabel = document.getElementById("modeLabel");


// ======================
// LOAD SAVED SETTINGS
// ======================

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


// ======================
// DARK MODE TOGGLE
// ======================

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


// ======================
// FONT SIZE TOGGLE
// ======================

if (fontSizeToggle) {
  fontSizeToggle.addEventListener("change", () => {
    body.classList.toggle("large-font");

    localStorage.setItem(
      "largeFont",
      body.classList.contains("large-font") ? "enabled" : "disabled"
    );
  });
}


// ======================
// HIGH CONTRAST TOGGLE
// ======================

if (highContrastToggle) {
  highContrastToggle.addEventListener("change", () => {
    body.classList.toggle("high-contrast");

    localStorage.setItem(
      "highContrast",
      body.classList.contains("high-contrast") ? "enabled" : "disabled"
    );
  });
}


// ======================
// INITIAL PAGE LOAD ANIMATION
// ======================

window.addEventListener("load", () => {
  sections.forEach(section => {
    section.classList.add("animate");
  });
});
