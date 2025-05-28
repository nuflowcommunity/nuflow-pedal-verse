
import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoints[breakpoint]);
    };
    
    // Set initial value
    checkBreakpoint();
    
    // Listen for resize events
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return isBelowBreakpoint;
}
