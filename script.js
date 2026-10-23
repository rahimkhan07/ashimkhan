/* =====================================================
   ASHIM KHAN PORTFOLIO — script.js
   ===================================================== */

'use strict';

/* -------------------------------------------------- */
/* 1. NAVBAR — scroll effect + active link             */
/* -------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const sections  = document.querySelectorAll('section[id]');

function onScroll() {
  // Sticky style
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Back-to-top button
  backToTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* -------------------------------------------------- */
/* 2. HAMBURGER MENU                                   */
/* -------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* -------------------------------------------------- */
/* 3. TYPED TEXT EFFECT (Hero subtitle)                */
/* -------------------------------------------------- */
const phrases = [
  'Java Backend Developer',
  'Spring Boot Engineer',
  'Microservices Architect',
  'AWS Cloud Developer',
  'Payment Systems Builder',
];

const typedEl = document.getElementById('typedText');
let   phraseIdx  = 0;
let   charIdx    = 0;
let   isDeleting = false;

function type() {
  const current = phrases[phraseIdx];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 90);
}

type();

/* -------------------------------------------------- */
/* 4. SCROLL REVEAL (Intersection Observer)            */
/* -------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

/* -------------------------------------------------- */
/* 5. SKILL CARDS — staggered entrance                 */
/* -------------------------------------------------- */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

skillCards.forEach((card, i) => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  skillObserver.observe(card);
});

/* -------------------------------------------------- */
/* 6. CONTACT FORM — client-side validation & feedback */
/* -------------------------------------------------- */
const contactForm    = document.getElementById('contactForm');
const formFeedback   = document.getElementById('formFeedback');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFeedback('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send (replace with your backend / EmailJS call)
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled    = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    showFeedback('Thanks for reaching out! I\'ll get back to you soon. 🚀', 'success');
    contactForm.reset();
    btn.disabled    = false;
    btn.innerHTML   = '<i class="fas fa-paper-plane"></i> Send Message';
  }, 1400);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFeedback(msg, type) {
  formFeedback.textContent = msg;
  formFeedback.className   = `form-feedback ${type}`;
  setTimeout(() => { formFeedback.textContent = ''; formFeedback.className = 'form-feedback'; }, 5000);
}

/* -------------------------------------------------- */
/* 7. BACK TO TOP                                      */
/* -------------------------------------------------- */
const backToTop = document.getElementById('backToTop');

backToTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* -------------------------------------------------- */
/* 8. SMOOTH SCROLL for all anchor links               */
/* -------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* -------------------------------------------------- */
/* 9. CODE CARD — subtle floating animation            */
/* -------------------------------------------------- */
const codeCard = document.querySelector('.code-card');
if (codeCard) {
  let tick = 0;
  (function float() {
    tick += 0.02;
    codeCard.style.transform = `translateY(${Math.sin(tick) * 8}px)`;
    requestAnimationFrame(float);
  })();
}

/* -------------------------------------------------- */
/* 10. CURSOR GLOW (subtle mouse follower)             */
/* -------------------------------------------------- */
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 360px; height: 360px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.18s ease, top 0.18s ease;
  z-index: 0;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top  = `${e.clientY}px`;
});
