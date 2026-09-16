import { addToCart } from './cart';
import { flyToCart } from '../utils/fly-to-cart';

const FEEDBACK_DURATION = 1500;

function setupForm(form) {
  const submit = form.querySelector('[type="submit"]');
  const image = document.querySelector('[data-product-image]');
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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const quantity = Number(data.get('quantity'));
    const cart = document.querySelector('[data-cart]');

    showFeedback();

    if (image && cart) {
      await flyToCart(image, cart, submit);
    }

    addToCart({
      id: form.dataset.productId,
      purchaseType: data.get('purchase-type'),
      quantity,
    });

    if (status) {
      status.textContent = `${quantity} × ${form.dataset.productName} added to cart`;
    }
  });
}

export function initAddToCart() {
  document.querySelectorAll('[data-add-to-cart-form]').forEach(setupForm);
}
