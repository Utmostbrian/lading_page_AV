/* Atlas Farmacológico Veterinario UDI — main.js */

/* ── Smooth scroll for anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ behavior: 'smooth', top: target.offsetTop - 90 });
    }
  });
});

/* ── Navbar shadow on scroll ───────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Intersection Observer — reveal on scroll ──────────── */
const revealTargets = document.querySelectorAll(
  '.feature-card, .benefit-item, .guarantee-box, .stat-item'
);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* stagger siblings in the same grid by 80ms each */
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObs.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealTargets.forEach(el => revealObs.observe(el));

/* ── stat-items start visible (no animation class needed) */
document.querySelectorAll('.stat-item').forEach(el => {
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
});

const statObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, idx * 100);
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-item').forEach(el => statObs.observe(el));

/* ── Hero slideshow — cicla cada 5 s con crossfade ────────── */
const slides = document.querySelectorAll('.slide');
if (slides.length > 1) {
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

/* ── Mobile hamburger menu ──────────────────────────────── */
const hamburger = document.getElementById('navHamburger');
const mobileLinks = document.querySelector('.nav-links');
if (hamburger && mobileLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileLinks.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  mobileLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileLinks.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── video fallback: hide poster if video loads ─────────── */
document.querySelectorAll('.video-wrap video').forEach(video => {
  const fallback = video.parentElement.querySelector('.video-fallback');
  if (!fallback) return;
  video.addEventListener('canplay', () => {
    fallback.style.opacity = '0';
    fallback.style.pointerEvents = 'none';
  });
  video.addEventListener('error', () => {
    fallback.style.opacity = '1';
  });
});
