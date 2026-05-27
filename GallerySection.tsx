"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    alt: "Latte art close up",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    alt: "Café interior warm lighting",
    span: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&auto=format&fit=crop&q=80",
    alt: "Coffee and pastry on table",
    span: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=800&auto=format&fit=crop&q=80",
    alt: "Barista pouring coffee",
    span: "wide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=800&auto=format&fit=crop&q=80",
    alt: "Coffee beans roasting",
    span: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&auto=format&fit=crop&q=80",
    alt: "Cozy café corner with plants",
    span: "tall",
  },
];

type Photo = (typeof photos)[0];

const heightMap: Record<string, number> = {
  tall: 480,
  normal: 280,
  wide: 280,
};

function GalleryItem({ photo, index }: { photo: Photo; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: photo.span === "wide" ? "span 2" : "span 1",
        gridRow: photo.span === "tall" ? "span 2" : "span 1",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        height: heightMap[photo.span],
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(24px) scale(0.98)",
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`,
        cursor: "pointer",
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        style={{
          objectFit: "cover",
          transition: "transform 0.6s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(44,26,14,0.7) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Caption */}
      <p
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 500,
          color: "#FDFAF4",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.3s ease",
          letterSpacing: "0.02em",
          margin: 0,
        }}
      >
        {photo.alt}
      </p>
    </div>
  );
}

export default function GallerySection() {
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" style={{ padding: "96px 0", backgroundColor: "#FDFAF4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8963E",
              display: "block",
              marginBottom: 16,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease",
            }}
          >
            The Vibe
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              color: "#2C1A0E",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: 16,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.1s",
            }}
          >
            A Place Worth Visiting
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "#8C7B6B",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.2s",
            }}
          >
            More than coffee — it&apos;s an atmosphere. Come see what makes Brew
            Haven a place people come back to, every single day.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {photos.map((photo, i) => (
            <GalleryItem key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        {/* Instagram CTA */}
        <div
          style={{
            marginTop: 48,
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "all 0.5s ease 0.4s",
          }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              color: "#2C1A0E",
              textDecoration: "none",
              border: "1px solid #EFE0C0",
              padding: "12px 28px",
              borderRadius: 9999,
              transition: "all 0.2s",
              backgroundColor: "#FDFAF4",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2C1A0E";
              e.currentTarget.style.color = "#FDFAF4";
              e.currentTarget.style.borderColor = "#2C1A0E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FDFAF4";
              e.currentTarget.style.color = "#2C1A0E";
              e.currentTarget.style.borderColor = "#EFE0C0";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Follow us @brewhaven
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}