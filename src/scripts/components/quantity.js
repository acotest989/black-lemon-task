function setupQuantity(root) {
  const input = root.querySelector('[data-quantity-input]');
  const decrease = root.querySelector('[data-quantity-decrease]');
  const increase = root.querySelector('[data-quantity-increase]');
  const min = Number(input.min) || 1;
  const max = Number(input.max) || Infinity;

  const setValue = (value) => {
    const clamped = Math.min(max, Math.max(min, value));
    input.value = clamped;
    decrease.disabled = clamped <= min;
    increase.disabled = clamped >= max;
  };

  decrease.addEventListener('click', () => setValue(Number(input.value) - 1));
  increase.addEventListener('click', () => setValue(Number(input.value) + 1));
  input.addEventListener('change', () => setValue(parseInt(input.value, 10) || min));

  setValue(Number(input.value));
}

export function initQuantity() {
  document.querySelectorAll('[data-quantity]').forEach(setupQuantity);
}
