"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShopPage() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.from(headerRef.current, {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      
      tl.from(productRef.current, {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.4");
      
      tl.from(footerRef.current, {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.2");
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--color-paper)]">
      {/* A. HEADER SECTION */}
      <section 
        ref={headerRef}
        className="pt-[35vh] px-[var(--padding-x)]"
      >
        <h1 className="font-display italic font-light text-[var(--color-ink)]" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.1 }}>
          Shop
        </h1>
        <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--color-graphite)] mt-[0.6rem]">
          Publicaciones
        </p>
      </section>

      {/* B. PRODUCT GRID */}
      <section className="mt-[5rem] px-[var(--padding-x)] max-w-[var(--max-width)] mx-auto">
        <div 
          ref={productRef}
          className="max-w-[400px]"
        >
          {/* Product image */}
          <div className="relative aspect-[3/4] bg-[var(--color-ivory)] overflow-hidden group">
            <Image
              src="/images/shop/machaka-fotozine/MachakaPortada.jpg"
              alt="Machaka Fotozine Cover"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          {/* Product info */}
          <div className="mt-[1.5rem]">
            <h2 className="font-display italic font-light text-[22px] text-[var(--color-ink)] leading-tight">
              Machaka Fotozine
            </h2>
            <p className="font-body text-[11px] text-[var(--color-graphite)] mt-[0.3rem]">
              Edición limitada · Nº 1
            </p>
            <p className="font-body text-[13px] text-[var(--color-graphite)] mt-[0.5rem]">
              —
            </p>
            
            <button 
              className="mt-[1.5rem] border-[0.5px] border-[var(--color-warm-gray)] px-[1.4rem] py-[0.6rem] font-body text-[10px] uppercase tracking-[0.16em] text-[var(--color-ink)] transition-colors duration-250 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
              data-cursor="project"
            >
              Más información
            </button>
          </div>
        </div>
      </section>

      {/* C. CLOSING NOTE */}
      <footer 
        ref={footerRef}
        className="mt-[6rem] pb-[4rem] px-[var(--padding-x)] text-center"
      >
        <p className="font-body text-[12px] text-[var(--color-warm-gray)]">
          Más publicaciones próximamente.
        </p>
      </footer>
    </main>
  );
}
