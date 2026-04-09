"use client";

import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

interface HomeImagePreviewProps {
  src: string | null;
}

const HomeImagePreview = forwardRef<HTMLDivElement, HomeImagePreviewProps>(({ src }, ref) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = isMobile 
    ? {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '92vw',
        height: 'calc(92vw * (2/3))',
        borderRadius: '2px',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none' as const,
      }
    : {
        position: 'fixed' as const,
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' as const,
      };

  return (
    <div
      ref={ref}
      style={styles}
      className="autoAlpha-0 invisible"
    >
      {src && (
        <Image
          src={src}
          alt="Project Background Preview"
          fill
          className="object-cover"
          sizes={isMobile ? "92vw" : "100vw"}
          priority
        />
      )}
      {/* Background softening overlay - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 bg-[var(--color-paper)] opacity-50" />
      )}
    </div>
  );
});

HomeImagePreview.displayName = "HomeImagePreview";
export default HomeImagePreview;
