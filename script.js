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

// ===== Theme Toggle Functionality =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  // Update icon
  if (body.classList.contains('light-mode')) {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  }
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

// ===== Scroll Progress Indicator =====
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
const heroContainer = document.querySelector('.hero-container');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (scrolled < window.innerHeight && heroContainer) {
    heroContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContainer.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// ===== Project Card Tilt Effect =====
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

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  setActiveLink();
});

// ===== Handle Window Resize =====
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      toggleMenu();
    }
  }, 250);
});

// ===== Contact Form Submission with Formspree =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const buttonText = document.getElementById('button-text');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('.submit-button');
    const formData = new FormData(this);
    
    // Show loading state
    buttonText.textContent = 'Sending...';
    submitButton.disabled = true;
    formStatus.style.display = 'none';
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mykdjjbj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        formStatus.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#4CAF50';
        formStatus.style.color = 'white';
        
        buttonText.textContent = 'Message Sent!';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 5 seconds
        setTimeout(() => {
          buttonText.textContent = 'Send Message';
          submitButton.disabled = false;
          formStatus.style.display = 'none';
        }, 5000);
        
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      // Error
      formStatus.innerHTML = '✗ Oops! Something went wrong. Please try again or email me directly.';
      formStatus.style.display = 'block';
      formStatus.style.backgroundColor = '#f44336';
      formStatus.style.color = 'white';
      
      buttonText.textContent = 'Send Message';
      submitButton.disabled = false;
      
      console.error('Error:', error);
    }
  });
}

console.log('Portfolio initialized successfully!');