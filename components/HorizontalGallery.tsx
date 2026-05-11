'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { projects } from '@/lib/projects';
import WebGLDistortionImage from './WebGLDistortionImage';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = sectionRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -(totalWidth - windowWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Text Parallax logic
      gsap.utils.toArray<HTMLElement>('.project-info').forEach((info) => {
        gsap.to(info, {
          x: -150,
          y: -20,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: info,
            containerAnimation: gsap.getProperty(sectionRef.current, 'x'),
            scrub: 1.5,
          },
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden">
      <div 
        ref={sectionRef} 
        className="relative flex h-screen items-center bg-black px-[15vw] whitespace-nowrap"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative flex-shrink-0 flex items-center justify-center py-20"
            style={{
              width: `${project.layout.width}vw`,
              marginLeft: `${project.layout.marginBefore}vw`,
              marginRight: `${project.layout.marginAfter}vw`,
              alignSelf: project.layout.position === 'top' ? 'flex-start' : 
                         project.layout.position === 'bottom' ? 'flex-end' : 'center',
            }}
          >
            <div className="relative w-full h-[55vh] group">
              <div className="absolute inset-0 cursor-crosshair overflow-hidden bg-zinc-925 border border-zinc-900/50">
                <Canvas camera={{ position: [0, 0, 1] }}>
                  <WebGLDistortionImage 
                    src={project.image} 
                    intensity={
                      project.layout.interaction === 'full' ? 1.0 :
                      project.layout.interaction === 'subtle' ? 0.4 : 0.0
                    } 
                  />
                </Canvas>
              </div>
              
              <div className="project-info absolute -bottom-16 left-0 pointer-events-none transition-opacity duration-500">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-sans mb-1">
                  {project.id.padStart(2, '0')} / {project.year}
                </p>
                <h3 className="text-zinc-200 text-3xl font-sans font-normal uppercase tracking-tight-editorial">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
