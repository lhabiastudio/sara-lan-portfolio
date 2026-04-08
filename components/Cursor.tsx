"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorWrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial state: centered and hidden
    gsap.set(cursorWrapperRef.current, { 
      xPercent: -50, 
      yPercent: -50,
      opacity: 0,
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorWrapperRef.current) {
        gsap.to(cursorWrapperRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out",
          opacity: 1,
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorData === "image") {
        animateToImage();
      } else if (cursorData === "work") {
        animateToWork();
      } else if (cursorData === "project") {
        animateToProject();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorData) {
        animateToDefault();
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursorWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    };

    const animateToDefault = () => {
      gsap.to(ringRef.current, {
        width: 28,
        height: 28,
        borderRadius: "50%",
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(visorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(dotRef.current, { 
        autoAlpha: 1, 
        duration: 0.3, 
        ease: "power2.inOut",
        overwrite: true 
      });
    };

    const animateToImage = () => {
      gsap.to(ringRef.current, {
        width: 48,
        height: 48,
        borderRadius: "50%",
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(visorRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(dotRef.current, { 
        autoAlpha: 1, 
        duration: 0.3, 
        ease: "power2.inOut",
        overwrite: true 
      });
    };

    const animateToWork = () => {
      gsap.to(ringRef.current, {
        width: 80,
        height: 28,
        borderRadius: "14px",
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(labelRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(visorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(dotRef.current, { 
        autoAlpha: 0, 
        duration: 0.3, 
        ease: "power2.inOut",
        overwrite: true 
      });
    };

    const animateToProject = () => {
      gsap.to(ringRef.current, {
        width: 36,
        height: 36,
        borderRadius: "50%",
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(visorRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
      gsap.to(dotRef.current, { 
        autoAlpha: 1, 
        duration: 0.2, 
        ease: "power2.out",
        overwrite: true 
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <style jsx global>{`
        @media (hover: none) {
          .custom-cursor-wrapper {
            display: none !important;
          }
        }
      `}</style>
      
      {/* SINGLE MOVING PARENT */}
      <div 
        ref={cursorWrapperRef} 
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
      >
        {/* Ring */}
        <div
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-[#2A2825] pointer-events-none"
          style={{ width: "28px", height: "28px", borderRadius: "50%" }}
        >
          {/* Visor Lines (Image State) */}
          <div ref={visorRef} className="absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center">
            <span className="absolute top-[-6px] h-[6px] w-[1px] bg-[#2A2825]" />
            <span className="absolute bottom-[-6px] h-[6px] w-[1px] bg-[#2A2825]" />
            <span className="absolute left-[-6px] h-[1px] w-[6px] bg-[#2A2825]" />
            <span className="absolute right-[-6px] h-[1px] w-[6px] bg-[#2A2825]" />
          </div>

          {/* Label (Project State) */}
          <div ref={labelRef} className="opacity-0 pointer-events-none">
            <span className="font-body text-[9px] font-medium uppercase tracking-[0.2em] text-[#2A2825]">
              View
            </span>
          </div>
        </div>

        {/* Dot */}
        <div
          ref={dotRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[6px] w-[6px] rounded-full bg-[#2A2825] pointer-events-none"
        />
      </div>
    </div>
  );
}
