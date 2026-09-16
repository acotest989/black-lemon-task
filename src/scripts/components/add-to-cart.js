import { addToCart } from './cart';

const FEEDBACK_DURATION = 1500;

function setupForm(form) {
  const submit = form.querySelector('[data-add-to-cart-submit]');
  if (!submit) return;

  const status = document.querySelector('[data-cart-status]');
  const defaultLabel = submit.textContent;
  let feedbackTimer;

  const showFeedback = () => {
    submit.textContent = 'Added';
    submit.classList.add('is-added');
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => {
      submit.textContent = defaultLabel;
      submit.classList.remove('is-added');
    }, FEEDBACK_DURATION);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const quantity = Number(data.get('quantity'));

    addToCart({
      id: form.dataset.productId,
      purchaseType: data.get('purchase-type'),
      quantity,
    });

    showFeedback();

    if (status) {
      status.textContent = `${quantity} × ${form.dataset.productName} added to cart`;
    }
  });
}

export function initAddToCart() {
  document.querySelectorAll('[data-add-to-cart-form]').forEach(setupForm);
}
