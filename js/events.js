/* events.js — filter & search logic */
document.addEventListener('DOMContentLoaded', () => {
  const chips   = document.querySelectorAll('.filter-chip');
  const cards   = document.querySelectorAll('.event-card');
  const search  = document.getElementById('eventSearch');

  let activeCategory = 'all';
  let searchQuery    = '';

  function filterCards() {
    let visible = 0;
    cards.forEach(card => {
      const cat   = card.dataset.category || '';
      const title = card.dataset.title?.toLowerCase() || '';
      const desc  = card.dataset.desc?.toLowerCase()  || '';

      const matchCat    = activeCategory === 'all' || cat === activeCategory;
      const matchSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchCat && matchSearch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
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
