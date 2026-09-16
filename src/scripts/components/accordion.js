function setupAccordion(root) {
  root.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
    const item = trigger.closest('[data-accordion-item]');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isOpen));
      item.classList.toggle('is-open', !isOpen);
    });
  });
}

export function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach(setupAccordion);
}
