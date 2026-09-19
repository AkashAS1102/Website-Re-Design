/* team.js — tab switching */
document.addEventListener('DOMContentLoaded', () => {
  const tabs   = document.querySelectorAll('.team-tab');
  const panels = document.querySelectorAll('.team-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});
