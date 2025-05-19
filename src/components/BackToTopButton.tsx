
import React from 'react';
import { Button } from "@/components/ui/button";

const BackToTopButton = () => {
  return (
    <div className="fixed right-8 bottom-8 z-10">
      <Button 
        className="rounded-full w-12 h-12 bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss transition-all shadow-lg flex items-center justify-center p-0"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
          <path d="m5 12 7-7 7 7"/>
          <path d="M12 19V5"/>
        </svg>
      </Button>
    </div>
  );
};

export default BackToTopButton;
