/* history.js — timeline nav + execom year selector */
document.addEventListener('DOMContentLoaded', () => {
  // Timeline year nav highlights
  const timelineYearBtns = document.querySelectorAll('.timeline-year-btn');
  const entries = document.querySelectorAll('.timeline-entry');

  // Scroll spy: highlight active year in nav
  const spy = new IntersectionObserver((entries_obs) => {
    entries_obs.forEach(entry => {
      if (entry.isIntersecting) {
        const year = entry.target.dataset.year;
        timelineYearBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.year === year);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  entries.forEach(e => spy.observe(e));

  // Click year nav to scroll
  timelineYearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.dataset.year;
      const target = document.querySelector(`.timeline-entry[data-year="${year}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Execom year selector
  const execomBtns   = document.querySelectorAll('.execom-year-btn');
  const execomPanels = document.querySelectorAll('.execom-panel');

  execomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      execomBtns.forEach(b => b.classList.remove('active'));
      execomPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const year = btn.dataset.year;
      const panel = document.getElementById(`execom-${year}`);
      if (panel) panel.classList.add('active');
    });
  });
});
