/* ═══════════════════════════════════════════════════════════
   Jennifer Barros — Advocacia e Consultoria Jurídica
   main.js
═══════════════════════════════════════════════════════════ */

/* ── Footer year ─────────────────────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Header: scroll shadow ───────────────────────────────── */
const header = document.getElementById('header');

function onScroll() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  highlightActiveNav();
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ── Mobile menu ──────────────────────────────────────────── */
const toggle  = document.getElementById('nav-toggle');
const menu    = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* Close menu on outside click */
document.addEventListener('click', (e) => {
  if (!header.contains(e.target) && menu.classList.contains('open')) {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ── Active nav link on scroll ────────────────────────────── */
const sections = document.querySelectorAll('section[id]');

function highlightActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);

    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ── Reveal on scroll (IntersectionObserver) ─────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* Staggered delay for sibling elements in a grid */
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'))
        : [];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => observer.observe(el));

/* ── Smooth scroll for anchor links ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navH = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 80;

    window.scrollTo({
      top: target.offsetTop - navH,
      behavior: 'smooth',
    });
  });
});
