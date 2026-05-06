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
onScroll();

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

const navList = document.querySelector('#nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = item?.querySelector('.faq-answer');
    if (!answer) {
      return;
    }

    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    answer.style.maxHeight = expanded ? '0px' : `${answer.scrollHeight}px`;
  });
});

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach((element) => revealObserver.observe(element));

const heroBg = document.querySelector('.hero-bg');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroBg && !reducedMotion) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.18;
    heroBg.style.transform = `translateY(${offset}px)`;
  });
}

function setupForm(formId, successMessage) {
  const form = document.getElementById(formId);
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageField = form.querySelector('.form-message');

    if (!(messageField instanceof HTMLElement)) {
      return;
    }

    if (!form.checkValidity()) {
      messageField.textContent = 'Bitte füllen Sie alle Pflichtfelder korrekt aus.';
      return;
    }

    messageField.textContent = successMessage;
    form.reset();
  });
}

setupForm('kontakt-form', 'Vielen Dank. Ihre Nachricht wurde vorbereitet.');
setupForm('anfrage-form', 'Vielen Dank. Ihre Anfrage wurde vorbereitet.');
