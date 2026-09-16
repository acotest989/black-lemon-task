function setupCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const prev = root.querySelector('[data-carousel-prev]');
  const next = root.querySelector('[data-carousel-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const getStep = () => {
    const slide = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide.offsetWidth + gap;
  };

  const scroll = (direction) => {
    track.scrollBy({
      left: direction * getStep(),
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  };

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  };

  prev.addEventListener('click', () => scroll(-1));
  next.addEventListener('click', () => scroll(1));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);

  updateArrows();
}

export function initCarousel() {
  document.querySelectorAll('[data-carousel]').forEach(setupCarousel);
}
