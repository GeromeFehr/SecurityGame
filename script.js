const releaseDate = new Date('2026-10-31T18:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = releaseDate - now;

  const set = (id, value) => document.getElementById(id).textContent = String(value).padStart(2, '0');

  if (diff <= 0) {
    set('days', 0); set('hours', 0); set('minutes', 0); set('seconds', 0);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  set('days', days);
  set('hours', hours);
  set('minutes', minutes);
  set('seconds', seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
