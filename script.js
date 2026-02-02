// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const menuBackdrop = document.querySelector('.menu-backdrop');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
function toggleMenu() {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  menuBackdrop.classList.toggle('active');
  document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
}

// Event listeners
hamburger.addEventListener('click', toggleMenu);
menuBackdrop.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// ===== Smooth Scrolling with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Active Navigation Link =====
function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navHeight = document.querySelector('.navbar').offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const scrollPosition = window.scrollY;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  }
  
  lastScroll = currentScroll;
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(
  '.section-header, .about-text, .about-skills, .project-card, .service-item, .contact-info, .contact-form'
);

animateElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(element);
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  console.log('Form submitted:', formData);
  
  // Show success message
  const submitButton = contactForm.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Message Sent!';
  submitButton.style.background = 'var(--accent)';
  submitButton.style.color = 'var(--bg-primary)';
  
  // Reset form
  setTimeout(() => {
    contactForm.reset();
    submitButton.textContent = originalText;
    submitButton.style.background = 'transparent';
    submitButton.style.color = 'var(--accent)';
  }, 3000);
  
  // Here you would typically send the data to a server
  // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
});

// ===== Scroll Progress Indicator (optional enhancement) =====
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

createScrollProgress();

// ===== Parallax Effect for Hero Section =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// ===== Project Card Tilt Effect (optional enhancement) =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== Cursor Custom Effect (REMOVED) =====
// Custom cursor effect has been disabled
// If you want to enable it, uncomment the code below

// ===== Typing Effect for Hero Title (optional) =====
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
  // Remove any loading screens if you add them
  document.body.classList.add('loaded');
  
  // Set initial active link
  setActiveLink();
});

// ===== Handle Window Resize =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      toggleMenu();
    }
  }, 250);
});

// ===== Prevent Scroll When Menu is Open =====
window.addEventListener('scroll', () => {
  if (navLinks.classList.contains('active')) {
    window.scrollTo(0, 0);
  }
});

console.log('Portfolio initialized successfully! 🚀');