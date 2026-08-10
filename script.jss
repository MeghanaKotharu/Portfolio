// Scroll reveal: fade + rise sections into view as the user scrolls
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// KPI count-up: animate numbers from 0 to their target once visible
const kpiEls = document.querySelectorAll('.num[data-count]');
const kpiIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.count.includes('.');
    const accentSpan = el.querySelector('.accent');
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      const display = isDecimal ? val.toFixed(1) : Math.round(val);
      if (accentSpan) {
        accentSpan.textContent = display;
      } else {
        el.textContent = display + suffix;
      }
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    kpiIO.unobserve(el);
  });
}, { threshold: 0.5 });
kpiEls.forEach(el => kpiIO.observe(el));
