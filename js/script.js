'use strict';
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const mobile = window.matchMedia('(max-width: 600px)');
function closeNav(restoreFocus = false) {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('is-open');
  navLinks.inert = mobile.matches;
  if (restoreFocus) navToggle.focus();
}
if (navToggle && navLinks) {
  closeNav();
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('is-open', open);
    navLinks.inert = !open && mobile.matches;
  });
  navLinks.addEventListener('click', event => { if (event.target.closest('a')) closeNav(); });
  mobile.addEventListener('change', () => closeNav());
  document.addEventListener('click', event => { if (!nav.contains(event.target)) closeNav(); });
  nav.addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!nav.contains(document.activeElement)) closeNav(); });
  });
}
let scrollQueued = false;
function updateNav() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 15); scrollQueued = false; }
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateNav); } }, { passive: true });
updateNav();
const quickToggle = document.querySelector('.quick-toggle');
const quickLinks = document.querySelector('.quick-links');
function closeContact(restoreFocus = false) {
  if (!quickToggle || !quickLinks) return;
  quickLinks.hidden = true;
  quickToggle.setAttribute('aria-expanded', 'false');
  quickToggle.setAttribute('aria-label', 'Open quick contact');
  if (restoreFocus) quickToggle.focus();
}
if (quickToggle && quickLinks) {
  quickToggle.addEventListener('click', () => {
    const open = quickToggle.getAttribute('aria-expanded') !== 'true';
    quickLinks.hidden = !open;
    quickToggle.setAttribute('aria-expanded', String(open));
    quickToggle.setAttribute('aria-label', open ? 'Close quick contact' : 'Open quick contact');
    if (open) quickLinks.querySelector('a').focus();
  });
  document.addEventListener('click', event => { if (!event.target.closest('.quick-contact')) closeContact(); });
  document.querySelector('.quick-contact').addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!document.activeElement.closest('.quick-contact')) closeContact(); });
  });
}
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (navToggle?.getAttribute('aria-expanded') === 'true') closeNav(true);
  if (quickToggle?.getAttribute('aria-expanded') === 'true') closeContact(true);
});
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('is-pending'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.06 });
  reveals.forEach(element => {
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add('is-pending');
      const siblings = [...element.parentElement.children].filter(sibling => sibling.classList.contains('reveal'));
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element) % 3, 2) * 65}ms`);
      observer.observe(element);
    }
  });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); reveals.forEach(element => element.classList.remove('is-pending')); }
  });
}
const filters = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('.portfolio-grid .project-card')];
if (filters.length && projectCards.length) {
  document.querySelector('.filter-bar').hidden = false;
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    projectCards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) {
        card.classList.remove('is-pending');
        card.getAnimations().forEach(animation => animation.cancel());
        if (!reducedMotion.matches && typeof card.animate === 'function') {
          card.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 320, easing: 'ease-out' });
        }
      }
    });
    document.querySelector('.filter-status').textContent = category === 'all' ? 'Selected projects across all categories' : `Selected ${category === 'landing' ? 'landing pages' : 'website projects'}`;
  }));
}
const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('najeeb_anka@hotmail.com');
      status.textContent = 'Email address copied. Ready when you are.';
    } catch { status.textContent = 'Please select and copy the email address above, or choose Write an email.'; }
  });
}
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
const tocLinks = [...document.querySelectorAll('.article-toc a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('.article-body h2[id]').forEach(heading => observer.observe(heading));
}
