import { useEffect, useRef, useState } from 'react';

type Animation = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom';

interface Props {
  children: React.ReactNode;
  animation?: Animation;
  /** delay in ms before the animation starts after entering viewport */
  delay?: number;
  /** Tailwind / custom classes for the wrapper */
  className?: string;
  /** 0–1: how much of the element must be visible before triggering */
  threshold?: number;
}

/**
 * Wraps any content and animates it into view when it enters the viewport.
 * Uses IntersectionObserver — no extra dependencies.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${visible ? `sr-${animation}` : 'sr-hidden'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
