import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * LayeredCard Component
 * Implements a multi-plane layered animated container with:
 * 1. Layered ambient back-glow
 * 2. 3D tilt tracking with spring physics
 * 3. Layered specular spotlight tracking cursor
 * 4. Cybernetic corner brackets and depth planes
 * 5. Multi-depth child projection (translateZ)
 */
export default function LayeredCard({
  children,
  className = '',
  glowColor = '#7c3aed',
  interactiveTilt = true,
  delay = 0,
  style = {},
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D rotation
  const springConfig = { stiffness: 220, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Spotlight position inside card
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!interactiveTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    setSpotlightPos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.48, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`relative group ${className}`}
      style={{
        perspective: 1000,
        ...style,
      }}
      {...rest}
    >
      {/* ── Layer 0: Ambient Back-Glow (Layered Glow Plane) ── */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${glowColor}38, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* ── Layer 1: 3D Surface Shell with Cyber Accents ── */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden glass-card-shell"
        style={{
          rotateX: interactiveTilt ? rotateX : 0,
          rotateY: interactiveTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
          background: 'rgba(6, 13, 26, 0.72)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered
            ? `0 20px 40px -15px rgba(0,0,0,0.7), 0 0 30px ${glowColor}25, inset 0 1px 0 rgba(255,255,255,0.15)`
            : '0 12px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
          borderColor: isHovered ? `${glowColor}50` : 'rgba(255, 255, 255, 0.08)',
          zIndex: 1,
        }}
      >
        {/* Layered Cursor Spotlight Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 320px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,255,255,0.06), transparent 75%)`,
            zIndex: 1,
          }}
        />

        {/* Layered Micro-Grid Ambient Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
            zIndex: 1,
          }}
        />

        {/* Cyber Layer Accents: Corner brackets */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

        {/* ── Layer 2: Elevated Content Plane ── */}
        <div
          className="relative z-10 w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
