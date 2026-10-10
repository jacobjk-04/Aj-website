
// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll-edge shadow
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 4);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal sections as they enter the viewport
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Illustrative agent card: step through its tasks on a loop
const steps = [...document.querySelectorAll('.agent-steps .step')];
const bar = document.querySelector('.agent-progress');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (steps.length && bar && !reduceMotion) {
  let current = steps.findIndex((s) => s.classList.contains('active'));
  const render = () => {
    steps.forEach((s, i) => {
      s.classList.toggle('done', i < current);
      s.classList.toggle('active', i === current);
    });
    bar.style.setProperty('--p', `${Math.round(((current + 0.5) / steps.length) * 100)}%`);
  };
  render();
  setInterval(() => {
    current = (current + 1) % (steps.length + 1);
    if (current === steps.length) {
      // All done: show full progress briefly before restarting
      steps.forEach((s) => { s.classList.add('done'); s.classList.remove('active'); });
      bar.style.setProperty('--p', '100%');
      return;
    }
    render();
  }, 2200);
}
