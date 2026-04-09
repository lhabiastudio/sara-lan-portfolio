"use client";

import { useState, useEffect } from "react";
import { ProjectSection } from "@/lib/projects";

type ProjectNavProps = {
  sections: ProjectSection[];
};

export default function ProjectNav({ sections }: ProjectNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const options = {
      threshold: 0,
      rootMargin: "-40% 0px -55% 0px",
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Buffer for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav 
      className="sticky z-[50] flex gap-[2.5rem] px-[var(--padding-x)]"
      style={{ 
        top: "var(--nav-height)",
        background: "var(--color-paper)",
        backdropFilter: "none",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem"
      }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          data-cursor="project"
          className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
            activeId === section.id
              ? "text-[var(--color-ink)] border-b-[0.5px] border-[var(--color-ink)]"
              : "text-[var(--color-graphite)]"
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
