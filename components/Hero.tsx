'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1, filter: 'grayscale(100%) brightness(0.5)' },
        { 
          clipPath: 'inset(0% 0% 0% 0%)', 
          scale: 1, 
          filter: 'grayscale(0%) brightness(1)',
          duration: 2.2, 
          ease: 'expo.inOut' 
        }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 150, opacity: 0, skewY: 10 },
        { 
          y: 0, 
          opacity: 1, 
          skewY: 0,
          duration: 1.5, 
          delay: 1.4, 
          ease: 'power4.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div 
        ref={imageRef}
        className="relative w-[85vw] h-[65vh] md:w-[60vw] md:h-[75vh] overflow-hidden bg-zinc-925 shadow-2xl"
      >
        <Image
          src="/images/El corte ingles sin escaleras, señora/IMG_4014.jpg"
          alt="Sara Lan Photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
      </div>
      
      <div className="absolute bottom-12 md:bottom-24 left-10 md:left-24 overflow-hidden">
        <h1 
          ref={titleRef}
          className="text-white text-6xl md:text-[10rem] font-sans font-normal tracking-tight-editorial leading-none uppercase mix-blend-difference"
        >
          SARA <span className="opacity-50">LAN</span>
        </h1>
      </div>
    </section>
  );
}
