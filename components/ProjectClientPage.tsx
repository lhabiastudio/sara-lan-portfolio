"use client";

import { Project } from "@/lib/projects";
import ProjectNav from "@/components/ProjectNav";
import Link from "next/link";
import Image from "next/image";
import manifest from "@/lib/image-manifest.json";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectClientPageProps {
  project: Project;
}

export default function ProjectClientPage({ project }: ProjectClientPageProps) {
  // Fallback images (for projects like Cuba with no sections)
  const untypedManifest = manifest as Record<string, { root?: string[] }>;
  const rootImages = untypedManifest[project.slug]?.root || [];

  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Entrance Animations
      gsap.from(titleRef.current, { y: 32, autoAlpha: 0, duration: 1.1, ease: 'expo.out' });
      gsap.from(yearRef.current, { autoAlpha: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' });
      if (bodyRef.current) {
        gsap.from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0.9, delay: 0.5, ease: 'power2.out' });
      }

      // ScrollTrigger: Image Containers
      const images = gsap.utils.toArray<HTMLElement>('[data-cursor="image"]', containerRef.current);
      images.forEach((el) => {
        gsap.from(el, { 
          scale: 1.03, 
          autoAlpha: 0, 
          duration: 1.2, 
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        });
      });

      // ScrollTrigger: Section Labels
      const labels = gsap.utils.toArray<HTMLElement>('.section-label', containerRef.current);
      labels.forEach((el) => {
        gsap.from(el, { 
          x: -10, 
          autoAlpha: 0, 
          duration: 0.7, 
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

      ScrollTrigger.refresh();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.from(titleRef.current, { y: 32, autoAlpha: 0, duration: 0 });
      gsap.from(yearRef.current, { autoAlpha: 0, duration: 0 });
      if (bodyRef.current) gsap.from(bodyRef.current, { y: 16, autoAlpha: 0, duration: 0 });

      const images = gsap.utils.toArray<HTMLElement>('[data-cursor="image"]', containerRef.current);
      images.forEach((el) => {
        gsap.from(el, { autoAlpha: 0, duration: 0, scrollTrigger: { trigger: el, start: 'top 80%' } });
      });

      const labels = gsap.utils.toArray<HTMLElement>('.section-label', containerRef.current);
      labels.forEach((el) => {
        gsap.from(el, { autoAlpha: 0, duration: 0, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });


      ScrollTrigger.refresh();
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--color-paper)]">
      {/* A. OPENING */}
      <section className="mx-auto max-w-[800px] px-[var(--padding-x)] pt-[calc(var(--nav-height)*2+2rem)] md:pt-[clamp(8rem,15vw,12rem)]">
        <h1
          ref={titleRef}
          className="font-display italic font-light text-[var(--color-ink)]"
          style={{ fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.05 }}
        >
          {project.title}
        </h1>
        <p ref={yearRef} className="mt-[0.8rem] font-body text-[10px] uppercase tracking-[0.2em] text-[var(--color-graphite)]">
          {project.year !== 0 ? project.year : "20XX"}
        </p>

        <div className="mt-[3rem] border-t-[0.5px] border-[var(--color-warm-gray)]" />

        <div className="mt-[2rem] max-w-[560px]">
          <p ref={bodyRef} className="whitespace-pre-line font-body text-[14px] leading-[1.65] md:leading-[1.9] text-[var(--color-graphite)]">
            {project.bodyText}
          </p>
        </div>
      </section>

      {/* B. SECTION NAV (Sticky) */}
      {project.sections.length > 0 && <ProjectNav sections={project.sections} />}

      {/* C. CONTENT SECTIONS */}
      <div className="mt-[4rem]">
        {/* REGULAR SECTIONS */}
        {project.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto max-w-[var(--max-width)] px-[var(--padding-x)] py-[5rem] border-b-[0.5px] border-[var(--color-ivory)]"
            style={{ scrollMarginTop: 'calc(var(--nav-height) + 48px)' }}
          >
            <div className="mb-[2.5rem]">
              <span className="section-label inline-block font-body text-[10px] uppercase tracking-[0.2em] text-[var(--color-warm-gray)]">
                — {section.label}
              </span>
            </div>

            {/* Image Grid */}
            {section.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-[6px]">
                {section.images.map((img, i) => {
                  const isFullWidth = i % 3 === 0;
                  const isFirstImage = i === 0 && section.id === project.sections[0].id;
                  return (
                    <div
                      key={img}
                      data-cursor="image"
                      className={`image-container relative aspect-[3/2] ${
                        isFullWidth ? "col-span-2" : "col-span-1"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} — ${section.label}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        priority={isFirstImage}
                        loading={isFirstImage ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACIQAAIBBAMBAQEAAAAAAAAAAAECAwQREiExBRNBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aqd31db2laKSWTxRSIAwUknJ+AOPzUFxpenaisUV5aQzrHnYJFzjPnFOooCKHTNOtoVht7KCKJc4VI1AGTk8D5JoooA//2Q=="
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="aspect-[3/2] w-full bg-[var(--color-ivory)] flex items-center justify-center">
                <span className="font-body text-[12px] text-[var(--color-warm-gray)]">
                  Imágenes de {section.label} — próximamente
                </span>
              </div>
            )}
          </section>
        ))}

        {/* FALLBACK FOR NO SECTIONS (e.g. Cuba) */}
        {project.sections.length === 0 && rootImages.length > 0 && (
          <section className="mx-auto max-w-[var(--max-width)] px-[var(--padding-x)] py-[5rem]">
            <div className="grid grid-cols-2 gap-[6px]">
              {rootImages.map((img: string, i: number) => {
                const isFullWidth = i % 3 === 0;
                const isFirstImage = i === 0;
                return (
                  <div
                    key={img}
                    data-cursor="image"
                    className={`image-container relative aspect-[3/2] ${
                      isFullWidth ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      priority={isFirstImage}
                      loading={isFirstImage ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACIQAAIBBAMBAQEAAAAAAAAAAAECAwQREiExBRNBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aqd31db2laKSWTxRSIAwUknJ+AOPzUFxpenaisUV5aQzrHnYJFzjPnFOooCKHTNOtoVht7KCKJc4VI1AGTk8D5JoooA//2Q=="
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* D. CLOSING */}
      <footer className="px-[var(--padding-x)] py-[4rem]">
        <Link
          href="/"
          data-cursor="project"
          className="font-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-graphite)] no-underline transition-colors duration-200 hover:text-[var(--color-ink)]"
        >
          ← Index
        </Link>
      </footer>
    </main>
  );
}
