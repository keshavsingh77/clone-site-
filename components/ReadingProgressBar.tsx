
import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    setWidth((scrollPosition / totalHeight) * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div 
        className="h-full bg-indigo-600 transition-all duration-100 ease-out" 
        style={{ width: `${width}%` }} 
      />
    </div>
  );
};

export default ReadingProgressBar;
