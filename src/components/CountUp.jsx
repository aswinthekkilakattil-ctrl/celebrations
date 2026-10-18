import { useEffect, useRef, useState } from 'react';

export default function CountUp({ value, suffix = '' }) {
  const rootRef = useRef(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!window.IntersectionObserver || preference.matches) return;
    let frame;
    const finish = () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (preference.matches) return;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 1100, 1);
        setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(rootRef.current);
    preference.addEventListener('change', finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener('change', finish);
    };
  }, [value]);
  return (
    <span ref={rootRef} className="count-up" aria-label={`${value}${suffix}`}>
      <span className="count-up-space" aria-hidden="true">{value}{suffix}</span>
      <span className="count-up-value" aria-hidden="true">{display}{suffix}</span>
    </span>
  );
}
