"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface HomeImagePreviewProps {
  src: string | null;
}

const HomeImagePreview = forwardRef<HTMLDivElement, HomeImagePreviewProps>(({ src }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none hidden md:block opacity-0 invisible"
    >
      {src && (
        <Image
          src={src}
          alt="Project Background Preview"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      {/* Background softening overlay */}
      <div className="absolute inset-0 bg-[var(--color-paper)] opacity-50" />
    </div>
  );
});

HomeImagePreview.displayName = "HomeImagePreview";
export default HomeImagePreview;
