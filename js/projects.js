/* projects.js — filter & search logic */
document.addEventListener('DOMContentLoaded', () => {
  const chips  = document.querySelectorAll('.filter-chip');
  const cards  = document.querySelectorAll('.project-card');
  const search = document.getElementById('projectSearch');

  let activeCategory = 'all';
  let searchQuery    = '';

  function filterCards() {
    let visible = 0;
    cards.forEach(card => {
      const cats  = (card.dataset.category || '').split(',');
      const title = card.dataset.title?.toLowerCase() || '';
      const matchCat    = activeCategory === 'all' || cats.includes(activeCategory);
      const matchSearch = !searchQuery || title.includes(searchQuery);
      if (matchCat && matchSearch) { card.style.display = ''; visible++; }
      else card.style.display = 'none';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.filter;
      filterCards();
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      searchQuery = search.value.toLowerCase().trim();
      filterCards();
    });
  }
});
