const DURATION = 700;
const THUMBNAIL_SIZE = 80;

function isMostlyVisible(rect) {
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight > rect.height / 2;
}

function getStartRect(source, fallbackOrigin) {
  const rect = source.getBoundingClientRect();
  if (isMostlyVisible(rect) || !fallbackOrigin) return rect;

  const origin = fallbackOrigin.getBoundingClientRect();
  return {
    top: origin.top + origin.height / 2 - THUMBNAIL_SIZE / 2,
    left: origin.left + origin.width / 2 - THUMBNAIL_SIZE / 2,
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
  };
}

export function flyToCart(source, target, fallbackOrigin) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return Promise.resolve();
  }

  const from = getStartRect(source, fallbackOrigin);
  const to = target.getBoundingClientRect();
  const clone = source.cloneNode();

  clone.className = 'fly-to-cart';
  clone.removeAttribute('data-product-image');
  clone.setAttribute('aria-hidden', 'true');
  Object.assign(clone.style, {
    top: `${from.top}px`,
    left: `${from.left}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
  });
  document.body.append(clone);

  const x = to.left + to.width / 2 - (from.left + from.width / 2);
  const y = to.top + to.height / 2 - (from.top + from.height / 2);

  const animation = clone.animate(
    [
      { transform: 'translate(0, 0) scale(1)', borderRadius: '0', opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0.05)`, borderRadius: '50%', opacity: 0.6 },
    ],
    { duration: DURATION, easing: 'cubic-bezier(0.55, 0, 0.7, 0.2)' },
  );

  return animation.finished
    .catch(() => {})
    .then(() => clone.remove());
}
