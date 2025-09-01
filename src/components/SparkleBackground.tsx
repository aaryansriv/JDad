import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const SparkleBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // More stars for a richer starry night
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
    size: Math.random() * 2 + 0.5, // Varied star sizes
    twinkleDelay: Math.random() * 5,
    twinkleDuration: 2 + Math.random() * 4,
  }));



  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-neutral-950 to-black" />
      
      {/* Subtle nebula effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-900/25 rounded-full blur-3xl" />
      </div>

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}px`,
            top: `${star.y}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            delay: star.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}



      {/* Constellation patterns with stars */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <defs>
          <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Big Dipper constellation */}
        <g>
          {/* Connection lines */}
          <line x1="15%" y1="20%" x2="22%" y2="18%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="22%" y1="18%" x2="28%" y2="22%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="28%" y1="22%" x2="35%" y2="25%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="28%" y1="22%" x2="32%" y2="28%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="32%" y1="28%" x2="38%" y2="32%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="38%" y1="32%" x2="42%" y2="35%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="15%" cy="20%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="22%" cy="18%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="28%" cy="22%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="35%" cy="25%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="32%" cy="28%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="38%" cy="32%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="42%" cy="35%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Orion-like pattern */}
        <g>
          {/* Connection lines */}
          <line x1="65%" y1="35%" x2="70%" y2="30%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="70%" y1="30%" x2="75%" y2="35%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="67%" y1="40%" x2="72%" y2="40%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="72%" y1="40%" x2="77%" y2="40%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="69%" y1="45%" x2="75%" y2="50%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="65%" y1="35%" x2="67%" y2="40%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="75%" y1="35%" x2="77%" y2="40%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="67%" y1="40%" x2="69%" y2="45%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="77%" y1="40%" x2="75%" y2="50%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="65%" cy="35%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="70%" cy="30%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="75%" cy="35%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="67%" cy="40%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="72%" cy="40%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="77%" cy="40%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="69%" cy="45%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="75%" cy="50%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Cassiopeia-like W pattern */}
        <g>
          {/* Connection lines */}
          <line x1="80%" y1="15%" x2="84%" y2="12%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="84%" y1="12%" x2="88%" y2="18%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="88%" y1="18%" x2="92%" y2="14%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="92%" y1="14%" x2="96%" y2="20%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="80%" cy="15%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="84%" cy="12%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="88%" cy="18%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="92%" cy="14%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="96%" cy="20%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Southern Cross-like pattern */}
        <g>
          {/* Connection lines */}
          <line x1="20%" y1="65%" x2="25%" y2="70%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="25%" y1="70%" x2="30%" y2="75%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="22%" y1="72%" x2="28%" y2="68%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="20%" cy="65%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="25%" cy="70%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="30%" cy="75%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="22%" cy="72%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="28%" cy="68%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Triangular constellation */}
        <g>
          {/* Connection lines */}
          <line x1="45%" y1="60%" x2="52%" y2="55%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="52%" y1="55%" x2="48%" y2="70%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="48%" y1="70%" x2="45%" y2="60%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="45%" cy="60%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="52%" cy="55%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="48%" cy="70%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Crown-like pattern */}
        <g>
          {/* Connection lines */}
          <line x1="10%" y1="45%" x2="15%" y2="40%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="15%" y1="40%" x2="20%" y2="42%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="20%" y1="42%" x2="25%" y2="38%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="25%" y1="38%" x2="30%" y2="45%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="10%" cy="45%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="15%" cy="40%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="20%" cy="42%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="25%" cy="38%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="30%" cy="45%" r="1.5" fill="white" opacity="0.9" />
        </g>
        
        {/* Leo-like pattern */}
        <g>
          {/* Connection lines */}
          <line x1="55%" y1="25%" x2="60%" y2="28%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="60%" y1="28%" x2="58%" y2="32%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="58%" y1="32%" x2="62%" y2="35%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="62%" y1="35%" x2="65%" y2="32%" stroke="url(#constellation)" strokeWidth="0.5" />
          <line x1="60%" y1="28%" x2="65%" y2="25%" stroke="url(#constellation)" strokeWidth="0.5" />
          {/* Star points */}
          <circle cx="55%" cy="25%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="60%" cy="28%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="58%" cy="32%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="62%" cy="35%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="65%" cy="32%" r="1.5" fill="white" opacity="0.9" />
          <circle cx="65%" cy="25%" r="1.5" fill="white" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};