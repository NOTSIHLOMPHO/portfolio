// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Update active nav link
    document.querySelectorAll('nav ul li a').forEach(navLink => {
      navLink.classList.remove('active');
    });
    link.classList.add('active');
  });
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Section animation on scroll
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > sectionTop - windowHeight + sectionHeight / 2) {
      section.classList.add('animate');
    }
  });
});

// Add CSS animation styles
const style = document.createElement('style');
style.innerHTML = `
  section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  section.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Settings toggle functionality
const toggle = document.getElementById('modeToggle');
const label = document.getElementById('modeLabel');
const body = document.body;
const fontSizeToggle = document.getElementById('fontSizeToggle');
const highContrastToggle = document.getElementById('highContrastToggle');

// Check for saved user preferences
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark');
  toggle.checked = true;
  label.textContent = 'Dark Mode';
}

if (localStorage.getItem('largeFont') === 'enabled') {
  body.classList.add('large-font');
  fontSizeToggle.checked = true;
}

if (localStorage.getItem('highContrast') === 'enabled') {
  body.classList.add('high-contrast');
  highContrastToggle.checked = true;
}

// Event listeners for settings
toggle.addEventListener('change', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    label.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    label.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'disabled');
  }
});

fontSizeToggle.addEventListener('change', () => {
  body.classList.toggle('large-font');
  if (body.classList.contains('large-font')) {
    localStorage.setItem('largeFont', 'enabled');
  } else {
    localStorage.setItem('largeFont', 'disabled');
  }
});

highContrastToggle.addEventListener('change', () => {
  body.classList.toggle('high-contrast');
  if (body.classList.contains('high-contrast')) {
    localStorage.setItem('highContrast', 'enabled');
  } else {
    localStorage.setItem('highContrast', 'disabled');
  }
});

// Initialize animations on page load
window.addEventListener('load', () => {
  sections.forEach(section => {
    section.classList.add('animate');
  });
});