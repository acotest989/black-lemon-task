const STORAGE_KEY = 'cart';

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable (e.g. private mode), the cart still works until reload
  }
}

const items = loadItems();

const getCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

function render({ bump = false } = {}) {
  const count = getCount();

  document.querySelectorAll('[data-cart]').forEach((cart) => {
    const badge = cart.querySelector('[data-cart-count]');
    badge.textContent = count;
    badge.hidden = count === 0;
    cart.classList.toggle('is-empty', count === 0);
    cart.setAttribute('aria-label', count ? `Cart, ${count} items` : 'Cart');
    if (bump) cart.classList.add('is-bumping');
  });
}

export function addToCart({ id, purchaseType, quantity }) {
  const existing = items.find((item) => item.id === id && item.purchaseType === purchaseType);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ id, purchaseType, quantity });
  }

  saveItems(items);
  render({ bump: true });
}

export function initCart() {
  document.querySelectorAll('[data-cart]').forEach((cart) => {
    cart.addEventListener('animationend', () => cart.classList.remove('is-bumping'));
  });
  render();
}
