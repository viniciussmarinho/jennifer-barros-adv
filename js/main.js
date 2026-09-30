/* ═══════════════════════════════════════════════════════════
   Jennifer Barros — Advogada Criminalista
   main.js
═══════════════════════════════════════════════════════════ */

/* ── Footer year ─────────────────────────────────────────── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Mobile menu ──────────────────────────────────────────── */
const siteNav = document.getElementById('site-nav');
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
  if (!siteNav.contains(e.target) && menu.classList.contains('open')) {
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

window.addEventListener('scroll', highlightActiveNav, { passive: true });

/* ── Reveal on scroll (IntersectionObserver) ─────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
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
/* Uses scrollIntoView (recalculated by the browser at scroll time)
   instead of a one-shot offsetTop read, which can land short if a
   webfont swap reflows the page right after the click. */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
