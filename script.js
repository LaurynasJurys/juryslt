const revealTargets = document.querySelectorAll('.hero-copy, .hero-panel, .metrics article, .service-card, .approach, .footer');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => {
  target.classList.add('reveal', 'is-pending');
  observer.observe(target);
});
