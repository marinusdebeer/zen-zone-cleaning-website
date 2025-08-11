import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteChangeIndicator() {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    // Trigger the progress bar briefly on route change
    setIsActive(true);
    const hideTimer = setTimeout(() => setIsActive(false), 500);
    return () => clearTimeout(hideTimer);
  }, [pathname]);

  return (
    <div
      className={`route-progress ${isActive ? 'route-progress--active' : ''}`}
      aria-hidden="true"
    />
  );
}
