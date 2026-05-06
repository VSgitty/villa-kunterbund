/* =====================================================
   VILLA KUNTERBUNT — Main Script
   ===================================================== */

// Enable CSS-based reveal hiding only when JS is active
document.documentElement.classList.add('js-ready');

// ── HEADER SCROLL STATE ──
const header = document.getElementById('site-header');
const onScroll = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  updateParallax();
};
window.addEventListener('scroll', onScroll, { passive: true });

// ── MOBILE NAV ──
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.classList.toggle('open', open);
  });
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('open');
    });
  });
}

// ── ACTIVE NAV LINK ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── PARALLAX ──
const parallaxItems = document.querySelectorAll('[data-parallax]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateParallax() {
  if (reducedMotion || !parallaxItems.length) return;
  const sy = window.scrollY;
  parallaxItems.forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    el.style.transform = `translateY(${sy * speed}px)`;
  });
}
onScroll();

// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll('.reveal');

// Layer 1: immediately show anything already in the viewport on load
function inViewport(el) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}
reveals.forEach(el => { if (inViewport(el)) el.classList.add('visible'); });

// Layer 2: IntersectionObserver for elements below the fold
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => { if (!el.classList.contains('visible')) ro.observe(el); });

// Layer 3: hard fallback — ensure nothing stays hidden after 800ms
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
}, 800);

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0';
  });
});

// ── FORMS ──
function setupForm(id, successMsg) {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = form.querySelector('.form-message');
    if (!form.checkValidity()) {
      if (msg) { msg.textContent = 'Bitte alle Pflichtfelder ausfüllen.'; msg.className = 'form-message err'; }
      return;
    }
    if (msg) { msg.textContent = successMsg; msg.className = 'form-message ok'; }
    form.reset();
  });
}
setupForm('form-kontakt', '✅ Vielen Dank! Ihre Nachricht wurde gespeichert.');
setupForm('form-anfrage', '✅ Vielen Dank! Ihre Anfrage wurde gespeichert.');

// ── CARD HOVER TILT ──
if (!reducedMotion) {
  document.querySelectorAll('.feature-item, .teaser-card, .card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * -8;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
