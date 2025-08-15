import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

/**
 * Reveal wrapper that animates its children when entering the viewport.
 *
 * Props:
 * - as: HTML tag to render (default 'div')
 * - animation: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom' | 'blur'
 * - delay: number (ms)
 * - duration: number (ms)
 * - threshold: number (0..1)
 * - rootMargin: string (e.g., '100px')
 * - once: boolean (default true)
 * - className: string
 */
export default function Reveal({
  as = 'div',
  children,
  animation = 'up',
  delay = 0,
  duration = 500,
  threshold = 0.15,
  rootMargin = '100px',
  once = true,
  className = '',
  style = {},
  ...rest
}) {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  const isVisible = once ? hasIntersected : isIntersecting;

  const Tag = as;
  const classes = `reveal reveal--${animation}${isVisible ? ' is-visible' : ''}${className ? ' ' + className : ''}`;
  const inlineStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  return (
    <Tag ref={ref} className={classes} style={inlineStyle} {...rest}>
      {children}
    </Tag>
  );
}


