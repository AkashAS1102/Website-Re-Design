/* contact.js — form handling */
document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Simulate submission
      form.style.opacity = '0.5';
      form.style.pointerEvents = 'none';
      setTimeout(() => {
        form.style.display = 'none';
        if (success) success.classList.add('show');
      }, 1200);
    });
  }
});
