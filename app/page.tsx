"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import { useRef, useState, useMemo } from "react";
import manifest from "@/lib/image-manifest.json";
import HomeImagePreview from "@/components/HomeImagePreview";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const previewMap = useMemo(() => {
    const map: Record<string, string> = {};
    const untypedManifest = manifest as Record<string, { dia?: string[], root?: string[] }>;
    projects.forEach((proj) => {
      if (proj.status === "published") {
        const pManifest = untypedManifest[proj.slug];
        if (pManifest) {
          const img = pManifest['dia']?.[0] || pManifest['root']?.[0];
          if (img) map[proj.slug] = img;
        }
      }
    });
    return map;
  }, []);

  const handleMouseEnter = (slug: string) => {
    if (window.innerWidth <= 768) return; // Disable on mobile
    const src = previewMap[slug];
    if (src) {
      setPreviewSrc(src);
      gsap.to(previewRef.current, {
        autoAlpha: 0.35,
        duration: 0.6,
        ease: "power2.out",
        overwrite: true
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.in",
      overwrite: true
    });
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(rowsRef.current, { 
        y: 18, 
        autoAlpha: 0, 
        duration: 0.8, 
        stagger: 0.09, 
        ease: "power2.out", 
        delay: 0.2 
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(rowsRef.current, { y: 18, autoAlpha: 0, duration: 0 });
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen px-[var(--padding-x)] pt-[clamp(35vh,45vh,50vh)]">
      <HomeImagePreview ref={previewRef} src={previewSrc} />
      <div className="mx-auto max-w-[var(--max-width)] relative z-10">
        {projects.map((project, index) => {
          const isPublished = project.status === "published";

          return (
            <div
              key={project.slug}
              ref={(el) => { rowsRef.current[index] = el; }}
              data-cursor={isPublished ? "work" : "project"}
              onMouseEnter={() => handleMouseEnter(project.slug)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => {
                if (!isPublished) return;
                setPreviewSrc(previewMap[project.slug] ?? null);
                const targetOpacity = window.innerWidth <= 768 ? 0.6 : 0.35;
                gsap.to(previewRef.current, { 
                  autoAlpha: targetOpacity, 
                  duration: 0.4, 
                  ease: 'power2.out' 
                });
              }}
              onTouchEnd={() => {
                gsap.to(previewRef.current, { 
                  autoAlpha: 0, 
                  duration: 0.4, 
                  ease: 'power2.in' 
                });
              }}
              onTouchCancel={() => {
                gsap.to(previewRef.current, { 
                  autoAlpha: 0, 
                  duration: 0.4, 
                  ease: 'power2.in' 
                });
              }}
              className={`group flex items-baseline justify-between py-[1.4rem] border-[var(--color-warm-gray)] border-b-[0.5px] ${
                index === 0 ? "border-t-[0.5px]" : ""
              }`}
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Clickable overlay for the entire row */}
              {isPublished && (
                <Link href={`/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.title} />
              )}
              {/* LEFT: Title */}
              <div
                className={`transition-transform duration-200 ease-out group-hover:translate-x-[6px] ${
                  !isPublished ? "opacity-[0.35]" : ""
                }`}
              >
                <span
                  className="font-display text-black italic font-light select-none"
                  style={{ 
                    fontSize: "clamp(20px, 3vw, 28px)",
                    textShadow: '0 0 20px var(--color-paper)'
                  }}
                >
                  {project.title}
                </span>
              </div>

              {/* RIGHT: Year & Sections */}
              <div className="flex items-center gap-[1rem]">
                {project.sections.length > 0 && (
                  <span className="font-body text-[8px] tracking-[4px] text-[var(--color-warm-gray)]">
                    · · ·
                  </span>
                )}
                <span className="font-body text-[10px] tracking-[0.1em] text-[var(--color-graphite)]">
                  {project.year !== 0 ? project.year : "20XX"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="mx-auto max-w-[var(--max-width)] mt-[clamp(6rem,12vw,10rem)] pb-[3rem]">
        <div className="border-t-[0.5px] border-[var(--color-ivory)] mb-[1.5rem]" />
        <div className="flex justify-between font-body text-[10px] tracking-[0.14em] text-[var(--color-warm-gray)] uppercase">
          <span>© Sara Lan</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
