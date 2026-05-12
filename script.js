/* ============================================
   PUVISHA SUNDAR — PORTFOLIO SCRIPT
   Premium Futuristic Developer Portfolio
   ============================================ */

'use strict';

// ====================================================
// 1. LOADING SCREEN
// ====================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero animations
      document.body.style.overflow = 'visible';
    }
  }, 2200);
});

// ====================================================
// 2. SCROLL PROGRESS INDICATOR
// ====================================================
function updateScrollProgress() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrolled / total) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ====================================================
// 4. NAVBAR — scroll effects + active section
// ====================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let currentSection = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) currentSection = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ====================================================
// 5. TYPING ANIMATION
// ====================================================
const typedEl = document.getElementById('typed-text');
const phrases = [
  'BCA Student',
  'Web Developer',
  'AI Enthusiast',
  'ML Learner',
  'Problem Solver',
  'Creative Coder'
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typingSpeed = 100, deletingSpeed = 55, pauseTime = 1800;

function typeText() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeText, 400);
      return;
    }
    setTimeout(typeText, deletingSpeed);
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeText, pauseTime);
      return;
    }
    setTimeout(typeText, typingSpeed);
  }
}
setTimeout(typeText, 2500); // start after loader

// ====================================================
// 6. PARTICLE BACKGROUND
// ====================================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size   = Math.random() * 1.5 + 0.3;
    this.alpha  = Math.random() * 0.4 + 0.1;
    this.color  = Math.random() > 0.65 ? '#d4a017' : '#1e50a0';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(212,160,23,${(1 - dist / 100) * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ====================================================
// 7. SCROLL REVEAL (AOS-style)
// ====================================================
const aosElements = document.querySelectorAll('[data-aos]');

function checkAOS() {
  aosElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const delay = parseInt(el.getAttribute('data-aos-delay') || 0);
    if (rect.top < window.innerHeight - 60) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}
window.addEventListener('scroll', checkAOS, { passive: true });
window.addEventListener('resize', checkAOS);
checkAOS();

// ====================================================
// 8. ANIMATED STAT COUNTERS
// ====================================================
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    countersStarted = true;
    statNumbers.forEach(el => {
      const target  = parseInt(el.dataset.target, 10);
      const suffix  = el.dataset.suffix || '';
      const decimal = el.dataset.decimal === 'true';
      let current = 0;
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      const interval = duration / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = decimal
          ? current.toFixed(2) + suffix
          : Math.ceil(current) + suffix;
      }, interval);
    });
  }
}
window.addEventListener('scroll', animateCounters, { passive: true });
animateCounters();

// ====================================================
// 9. PROJECT FILTER
// ====================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const categories = card.dataset.category || '';
      if (filter === 'all' || categories.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
          card.style.animationName = 'fade-up';
          card.style.animationDuration = '0.5s';
          card.style.animationFillMode = 'both';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ====================================================
// 11. PROJECT MODAL
// ====================================================
const modal = document.getElementById('project-modal');

function openModal(card) {
  const title    = card.dataset.title;
  const desc     = card.dataset.desc;
  const tech     = card.dataset.tech ? card.dataset.tech.split(',') : [];
  const live     = card.dataset.live;
  const github   = card.dataset.github;
  const catBadge = card.querySelector('.project-category-badge');
  const icon     = card.querySelector('.project-img-placeholder i');

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent  = desc;

  // Category badge clone
  const catEl = document.getElementById('modal-category');
  catEl.innerHTML = '';
  if (catBadge) catEl.appendChild(catBadge.cloneNode(true));

  // Icon
  const iconEl = document.getElementById('modal-icon');
  iconEl.innerHTML = icon ? `<i class="${icon.className}"></i>` : '<i class="fas fa-code"></i>';

  // Tech badges
  const techWrap = document.getElementById('modal-tech');
  techWrap.innerHTML = tech.map(t =>
    `<span class="tech-badge">${t.trim()}</span>`
  ).join('');

  // Buttons
  const btnWrap = document.getElementById('modal-btns');
  btnWrap.innerHTML = '';
  if (live) {
    const btn = document.createElement('a');
    btn.href = live; btn.target = '_blank';
    btn.className = 'proj-btn-live';
    btn.innerHTML = '<i class="fas fa-rocket"></i> Live Demo';
    btnWrap.appendChild(btn);
  }
  if (github) {
    const btn = document.createElement('a');
    btn.href = github; btn.target = '_blank';
    btn.className = 'proj-btn-details';
    btn.style.cssText = 'color:var(--white);border:1px solid var(--glass-border);padding:8px 16px;border-radius:8px;display:inline-flex;align-items:center;gap:6px;font-size:.8rem;font-weight:600;text-decoration:none;transition:.3s';
    btn.innerHTML = '<i class="fab fa-github"></i> GitHub';
    btnWrap.appendChild(btn);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// expose globally (used in HTML onclick)
window.openModal = openModal;
window.closeModal = closeModal;

// ====================================================
// 12. BACK TO TOP
// ====================================================
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====================================================
// 13. COPY EMAIL
// ====================================================
function copyEmail() {
  navigator.clipboard.writeText('puvishasundar637@gmail.com').then(() => {
    const icon = document.getElementById('copy-icon');
    if (icon) {
      icon.className = 'fas fa-check';
      setTimeout(() => { icon.className = 'fas fa-copy'; }, 2000);
    }
    showToast('Email copied to clipboard! ✓');
  }).catch(() => {
    showToast('Copy failed. Please copy manually.');
  });
}
window.copyEmail = copyEmail;

// ====================================================
// 14. TOAST NOTIFICATION
// ====================================================
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
window.showToast = showToast;

// ====================================================
// 15. CONTACT FORM SUBMISSION
// ====================================================
function submitForm() {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill in all fields.');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showToast('Please enter a valid email address.');
    return;
  }

  const btn = document.querySelector('.btn-submit');
  const submitText   = btn.querySelector('.submit-text');
  const submitLoader = btn.querySelector('.submit-loader');
  submitText.style.display   = 'none';
  submitLoader.style.display = 'inline-flex';
  btn.disabled = true;

  // Simulate sending (mailto fallback)
  setTimeout(() => {
    submitText.style.display   = 'inline-flex';
    submitLoader.style.display = 'none';
    btn.disabled = false;

    document.getElementById('form-success').style.display = 'flex';
    document.getElementById('contact-name').value    = '';
    document.getElementById('contact-email').value   = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';

    // Open mailto
    const mailtoLink = `mailto:puvishasundar637@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');

    showToast('Message prepared! Opening your email client.');
    setTimeout(() => {
      document.getElementById('form-success').style.display = 'none';
    }, 5000);
  }, 1800);
}
window.submitForm = submitForm;

// ====================================================
// 16. MOUSE TRACKING GLOW ON CARDS
// ====================================================
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.background = `
      radial-gradient(
        circle at ${x}% ${y}%,
        rgba(212,160,23,0.07) 0%,
        rgba(7,22,40,0.6) 60%
      )
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ====================================================
// 17. TILT EFFECT ON PROJECT CARDS
// ====================================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const maxTilt = 6;
    card.style.transform = `
      translateY(-8px)
      rotateX(${-dy * maxTilt}deg)
      rotateY(${dx * maxTilt}deg)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ====================================================
// 18. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====================================================
// 19. PARALLAX HERO BLOBS
// ====================================================
const blobs = document.querySelectorAll('.blob');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  blobs.forEach((blob, i) => {
    const speed = 0.05 + i * 0.02;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ====================================================
// 20. STAGGER ANIMATION ON CERT CARDS
// ====================================================
const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.cert-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 50}ms`;
      });
    }
  });
}, { threshold: 0.1 });

const certsSection = document.getElementById('certifications');
if (certsSection) certObserver.observe(certsSection);

// ====================================================
// 21. TIMELINE ANIMATION
// ====================================================
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = item.classList.contains('right')
    ? 'translateX(40px)' : 'translateX(-40px)';
  item.style.transition = `opacity 0.6s ${i * 0.12}s ease, transform 0.6s ${i * 0.12}s ease`;
  tlObserver.observe(item);
});

// ====================================================
// 22. FLOATING BADGE GLOW ON HOVER (profile)
// ====================================================
const profileWrap = document.querySelector('.profile-img-wrap');
if (profileWrap) {
  profileWrap.addEventListener('mouseenter', () => {
    profileWrap.style.boxShadow = '0 0 0 4px rgba(212,160,23,0.15), 0 0 60px rgba(212,160,23,0.35), inset 0 0 30px rgba(0,0,0,0.3)';
  });
  profileWrap.addEventListener('mouseleave', () => {
    profileWrap.style.boxShadow = '';
  });
}

// ====================================================
// 23. WINDOW RESIZE — regenerate particles
// ====================================================
window.addEventListener('resize', () => {
  particles.forEach(p => p.reset());
});

// ====================================================
// 23. INTEREST CARD PULSE
// ====================================================
document.querySelectorAll('.interest-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.interest-icon-wrap');
    icon.style.boxShadow = '0 0 24px rgba(212,160,23,0.3)';
  });
  card.addEventListener('mouseleave', () => {
    const icon = card.querySelector('.interest-icon-wrap');
    icon.style.boxShadow = '';
  });
});

// ====================================================
// 26. ORBIT PAUSE ON HOVER (about section)
// ====================================================
const orbits = document.querySelectorAll('.av-orbit');
const orbitWrap = document.querySelector('.av-orbit-wrap');
if (orbitWrap) {
  orbitWrap.addEventListener('mouseenter', () => {
    orbits.forEach(o => o.style.animationPlayState = 'paused');
  });
  orbitWrap.addEventListener('mouseleave', () => {
    orbits.forEach(o => o.style.animationPlayState = 'running');
  });
}

console.log('%c🚀 Puvisha Sundar Portfolio Loaded', 'color:#d4a017;font-size:14px;font-weight:700;font-family:Sora,sans-serif;');
console.log('%cBuilt with HTML5 · CSS3 · Vanilla JS', 'color:#f5c842;font-size:11px;');
