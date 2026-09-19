/* ============================================================
   MAIN.JS — Shared across all pages
   ============================================================ */

// ─── NAVBAR ─────────────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Scroll: add "scrolled" class
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger toggle
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── ACTIVE NAV LINK ─────────────────────────────────────────
(function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ─── SCROLL REVEAL ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── ANIMATED STAT COUNTERS ──────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current < target) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ─── EASTER EGG ─────────────────────────────────────────────
const easterTrigger = document.getElementById('easterEgg');
const easterToast   = document.getElementById('easterToast');

if (easterTrigger && easterToast) {
  easterTrigger.addEventListener('click', () => {
    easterToast.classList.add('show');
    setTimeout(() => easterToast.classList.remove('show'), 5000);
  });
}

// ─── SMOOTH PAGE TRANSITIONS ─────────────────────────────────
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  // Only internal .html links
  if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { location.href = href; }, 250);
    });
  }
});

// Fade in on page load
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

// ─── SCROLL PROGRESS & BACK TO TOP ───────────────────────────
const pageProgress = document.getElementById('pageProgress');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  if (pageProgress && docHeight > 0) {
    const scrollPercent = (scrollTop / docHeight) * 100;
    pageProgress.style.width = scrollPercent + '%';
  }

  if (backToTopBtn) {
    if (scrollTop > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── COPY EMAIL ON CLICK ─────────────────────────────────────
document.querySelectorAll('a[href^="mailto:"]').forEach(mailLink => {
  mailLink.addEventListener('click', (e) => {
    const email = mailLink.getAttribute('href').replace('mailto:', '');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showCopyTooltip('Email copied to clipboard! ✓');
      }).catch(() => {});
    }
  });
});

function showCopyTooltip(msg) {
  let tooltip = document.getElementById('copyTooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'copyTooltip';
    tooltip.className = 'copy-tooltip';
    document.body.appendChild(tooltip);
  }
  tooltip.textContent = msg;
  tooltip.classList.add('show');
  setTimeout(() => tooltip.classList.remove('show'), 2500);
}

