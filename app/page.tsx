import Hero from "@/components/Hero";
import HorizontalGallery from "@/components/HorizontalGallery";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <HorizontalGallery />
      
      {/* Editorial Footer / Pause Zone */}
      <section className="h-[50vh] flex items-center justify-center">
        <p className="text-zinc-800 text-xs tracking-[0.2em] uppercase">
          ?? 2026 Sara Lan. All Rights Reserved.
        </p>
      </section>
    </main>
  );
}
