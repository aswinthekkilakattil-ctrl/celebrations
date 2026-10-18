import { useEffect } from 'react';

const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

// Content stays visible by default. Only intersecting elements animate, once;
// unsupported browsers and observer failures never leave hidden content behind.
export default function useScrollAnimations(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px)');
    const seen = new WeakSet();
    const running = new Set();
    const play = (element) => {
      if (reducedMotion.matches || element.matches(':focus-within')) return;
      const distance = compact.matches ? 10 : 22;
      const variant = element.dataset.reveal;
      const from = variant === 'image' ? 'scale(0.96)'
        : variant === 'left' ? `translateX(-${distance}px)`
        : variant === 'right' ? `translateX(${distance}px)`
        : `translateY(${distance}px)`;
      const animation = element.animate([
        { opacity: 0, transform: from },
        { opacity: 1, transform: 'none' },
      ], {
        duration: compact.matches ? 520 : 760,
        delay: Number(element.dataset.revealDelay || 0),
        easing: EASING,
        fill: 'backwards',
      });
      running.add(animation);
      animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        play(entry.target);
      }
    }, { threshold: 0.08 });

    const register = () => {
      // Observe cards individually rather than animating their entire tall grid.
      root.querySelectorAll('section:not(.hero-section) > .site-container, footer > .site-container').forEach(container => {
        container.querySelectorAll(':scope > *, :scope > .grid > *, :scope > div > .grid > *').forEach(element => {
          if (getComputedStyle(element).display === 'grid' || element.querySelector('.grid') || element.querySelector('[data-reveal]')) return;
          if (!element.dataset.reveal) {
            element.dataset.reveal = element.querySelector('img') ? 'image' : 'up';
            const index = Array.from(element.parentElement.children).indexOf(element);
            element.dataset.revealDelay = String(Math.min(index % 6, 4) * 65);
          }
        });
      });
      root.querySelectorAll('[data-reveal]').forEach(element => {
        if (seen.has(element)) return;
        seen.add(element);
        observer.observe(element);
      });
    };
    register();
    // Portfolio filters mount fresh cards; keep those reveals working as well.
    const mutations = new MutationObserver(records => {
      if (records.some(record => Array.from(record.addedNodes).some(node => node.nodeType === 1))) register();
    });
    mutations.observe(root, { childList: true, subtree: true });
    const finishMotion = () => {
      if (reducedMotion.matches) running.forEach(animation => animation.cancel());
    };
    const revealFocus = (event) => {
      running.forEach(animation => {
        if (animation.effect?.target?.contains(event.target)) animation.cancel();
      });
    };
    reducedMotion.addEventListener('change', finishMotion);
    root.addEventListener('focusin', revealFocus);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      running.forEach(animation => animation.cancel());
      reducedMotion.removeEventListener('change', finishMotion);
      root.removeEventListener('focusin', revealFocus);
    };
  }, [rootRef]);
}
