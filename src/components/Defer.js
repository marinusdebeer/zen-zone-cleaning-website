import React from 'react';

/**
 * Renders children only when the wrapper enters the viewport.
 * Prevents offscreen images/scripts from loading on initial paint.
 */
export default function Defer({ children, rootMargin = '300px' }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ contentVisibility: visible ? 'visible' : 'auto', containIntrinsicSize: '1px 800px' }}>
      {visible ? children : null}
    </div>
  );
}


