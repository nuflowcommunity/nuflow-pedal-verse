
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  isKeyboardNavigation: boolean;
  focusVisible: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    // Detect keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardNavigation(true);
        setFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNavigation(false);
      setFocusVisible(false);
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(contrastQuery.matches);
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };
    
    contrastQuery.addEventListener('change', handleContrastChange);

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'small' | 'medium' | 'large';
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      mediaQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  useEffect(() => {
    // Apply font size to root element
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Apply accessibility classes to body
    document.body.classList.toggle('keyboard-navigation', isKeyboardNavigation);
    document.body.classList.toggle('focus-visible', focusVisible);
    document.body.classList.toggle('reduced-motion', reducedMotion);
    document.body.classList.toggle('high-contrast', highContrast);
  }, [isKeyboardNavigation, focusVisible, reducedMotion, highContrast]);

  const announceToScreenReader = (message: string) => {
    // Create a live region for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const value: AccessibilityContextType = {
    isKeyboardNavigation,
    focusVisible,
    reducedMotion,
    highContrast,
    fontSize,
    setFontSize,
    announceToScreenReader
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export default AccessibilityProvider;
