"use client";
import React, { useState, useEffect } from 'react';
// import './FadingComponent.css'; // Import your CSS file for styling

function FadingComponent({children}: {children: React.ReactNode}) {

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  const opacity = 1 - Math.min(scrollPosition / 100, 1);

  return (
    <div className="fading-component" style={{ opacity }}>
      {children}
    </div>
  );
}

export default FadingComponent;