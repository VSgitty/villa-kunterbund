const navToggle = document.querySelector('.nav-toggle');
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
