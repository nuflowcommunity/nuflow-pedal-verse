
import React, { useEffect, useState, useRef } from 'react';
import PolymerVideoHero from './polymer/PolymerVideoHero';
import PolymerEngineeringSection from './polymer/PolymerEngineeringSection';
import PolymerFeaturedCollection from './polymer/PolymerFeaturedCollection';
import PolymerPerformanceSection from './polymer/PolymerPerformanceSection';
import PolymerDesignPhilosophy from './polymer/PolymerDesignPhilosophy';

const PolymerEditorialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Video Section with Overlay Text */}
      <PolymerVideoHero isVisible={isVisible} />

      {/* Editorial Grid Section */}
      <div className="container-editorial py-32">
        <PolymerEngineeringSection isVisible={isVisible} />
        <PolymerFeaturedCollection isVisible={isVisible} />
        <PolymerPerformanceSection />
        <PolymerDesignPhilosophy />
      </div>
    </section>
  );
};

export default PolymerEditorialSection;
