// Add event listener to nav links
document.querySelectorAll('nav ul li a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Add animation to sections on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition > sectionTop - windowHeight + sectionHeight / 2) {
      section.classList.add('animate');
    }
  });
});

// Add CSS animation to sections
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