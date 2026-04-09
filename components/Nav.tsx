"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Nav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const sigRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isProjectPage = 
    pathname !== "/" && 
    pathname !== "/about" && 
    pathname !== "/contact" &&
    pathname !== "/shop";

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(sigRef.current, { y: -10, autoAlpha: 0, duration: 0.8, ease: "power2.out" });
      if (!isProjectPage) {
        gsap.from(linksRef.current, { y: -8, autoAlpha: 0, duration: 0.6, stagger: 0.07, ease: "power2.out", delay: 0.1 });
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(sigRef.current, { y: -10, autoAlpha: 0, duration: 0 });
      if (!isProjectPage) {
        gsap.from(linksRef.current, { y: -8, autoAlpha: 0, duration: 0 });
      }
    });
  }, { scope: containerRef });

  // Menu Animation Logic
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    gsap.to(overlayLinksRef.current, {
      y: 20,
      autoAlpha: 0,
      duration: 0.35,
      stagger: { each: 0.06, from: "end" },
      ease: "power2.in",
      onComplete: () => {
        setIsMenuOpen(false);
        document.body.style.overflow = "";
      }
    });

    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.inOut",
      delay: 0.2
    });
  };

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.fromTo(overlayRef.current, 
        { autoAlpha: 0 }, 
        { autoAlpha: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(overlayLinksRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.1 }
      );
    }
  }, { dependencies: [isMenuOpen], scope: containerRef });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <nav 
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "2.2rem var(--padding-x)",
        backgroundColor: 'rgba(250, 249, 246, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: isScrolled ? '0.5px solid var(--color-ivory)' : '0.5px solid transparent',
        transition: 'border-color 300ms ease'
      }}
    >
      {/* Left - Signature */}
      <Link
        ref={sigRef}
        href="/"
        className="font-display text-[18px] font-light italic text-[var(--color-ink)] whitespace-nowrap"
        data-cursor="project"
        onClick={isMenuOpen ? closeMenu : undefined}
      >
        Sara Lan
      </Link>

      {/* Right - Links or Hamburger */}
      <div className="flex items-center gap-[2.5rem]">
        {/* Standard Links: Visible on Desktop of non-project pages */}
        {!isProjectPage && (
          <div className="hidden md:flex items-center gap-[2.5rem]">
            <Link
              ref={(el) => { linksRef.current[0] = el; }}
              href="/"
              className="font-body text-[10px] font-normal uppercase tracking-[0.18em] text-[var(--color-graphite)]"
              data-cursor="project"
            >
              Works
            </Link>
            <Link
              ref={(el) => { linksRef.current[1] = el; }}
              href="/shop"
              className="font-body text-[10px] font-normal uppercase tracking-[0.18em] text-[var(--color-graphite)]"
              data-cursor="project"
            >
              Shop
            </Link>
            <Link
              ref={(el) => { linksRef.current[2] = el; }}
              href="/about"
              className="font-body text-[10px] font-normal uppercase tracking-[0.18em] text-[var(--color-graphite)]"
              data-cursor="project"
            >
              About
            </Link>
            <Link
              ref={(el) => { linksRef.current[3] = el; }}
              href="/contact"
              className="font-body text-[10px] font-normal uppercase tracking-[0.18em] text-[var(--color-graphite)]"
              data-cursor="project"
            >
              Contact
            </Link>
          </div>
        )}

        {/* Hamburger: Visible on all project pages OR on mobile of all other pages */}
        <button 
          onClick={openMenu}
          className={`flex-col gap-[5px] items-end group ${isProjectPage ? 'flex' : 'flex md:hidden'}`}
          data-cursor="project"
          aria-label="Open Menu"
        >
          <div className="w-[18px] h-[1px] bg-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-[-2px]"></div>
          <div className="w-[18px] h-[1px] bg-[var(--color-ink)] transition-transform duration-300 group-hover:translate-x-[2px]"></div>
        </button>
      </div>
      
      {/* Full-screen Overlay (Portal) */}
      {isMenuOpen && mounted && createPortal(
        <div 
          ref={overlayRef}
          className="bg-[var(--color-paper)]"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100dvh',
            zIndex: 9000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Close Button */}
          <button 
            onClick={closeMenu}
            className="w-[18px] h-[18px] flex items-center justify-center"
            style={{
              position: 'absolute',
              top: 'max(env(safe-area-inset-top), 1.8rem)',
              right: 'var(--padding-x)',
            }}
            data-cursor="project"
            aria-label="Close Menu"
          >
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-0 w-[18px] h-[1px] bg-[var(--color-ink)] rotate-45"></div>
              <div className="absolute top-1/2 left-0 w-[18px] h-[1px] bg-[var(--color-ink)] -rotate-45"></div>
            </div>
          </button>

          {/* Links */}
          <div className="flex flex-col items-center gap-8">
            <Link
              ref={(el) => { overlayLinksRef.current[0] = el; }}
              href="/"
              onClick={closeMenu}
              className="font-display text-[48px] font-light italic text-[var(--color-graphite)] transition-all duration-200 ease-out hover:translate-x-[8px] hover:not-italic hover:text-[var(--color-ink)]"
              data-cursor="project"
            >
              Works
            </Link>
            <Link
              ref={(el) => { overlayLinksRef.current[1] = el; }}
              href="/shop"
              onClick={closeMenu}
              className="font-display text-[48px] font-light italic text-[var(--color-graphite)] transition-all duration-200 ease-out hover:translate-x-[8px] hover:not-italic hover:text-[var(--color-ink)]"
              data-cursor="project"
            >
              Shop
            </Link>
            <Link
              ref={(el) => { overlayLinksRef.current[2] = el; }}
              href="/about"
              onClick={closeMenu}
              className="font-display text-[48px] font-light italic text-[var(--color-graphite)] transition-all duration-200 ease-out hover:translate-x-[8px] hover:not-italic hover:text-[var(--color-ink)]"
              data-cursor="project"
            >
              About
            </Link>
            <Link
              ref={(el) => { overlayLinksRef.current[3] = el; }}
              href="/contact"
              onClick={closeMenu}
              className="font-display text-[48px] font-light italic text-[var(--color-graphite)] transition-all duration-200 ease-out hover:translate-x-[8px] hover:not-italic hover:text-[var(--color-ink)]"
              data-cursor="project"
            >
              Contact
            </Link>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
