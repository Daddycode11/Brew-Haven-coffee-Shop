"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = containerRef.current?.querySelector(".hero-img") as HTMLElement | null;
    if (!img) return;
    const onScroll = () => { img.style.transform = `translateY(${window.scrollY * 0.25}px)`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={containerRef} style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      backgroundColor: "#2C1A0E",
    }}>
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1800&auto=format&fit=crop&q=80"
          alt="Cozy coffee shop interior"
          fill priority
          className="hero-img"
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(44,26,14,0.92) 0%, rgba(44,26,14,0.65) 50%, rgba(44,26,14,0.25) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(44,26,14,0.7) 0%, transparent 50%)",
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1, display: "flex", alignItems: "center",
        maxWidth: 1280, margin: "0 auto",
        padding: "96px 24px 64px",
        width: "100%",
      }}>
        <div style={{ maxWidth: 640 }}>

          {/* Label */}
          <div className="animate-fade-in" style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 32, animationDelay: "100ms", animationFillMode: "both",
          }}>
            <span style={{ height: 1, width: 48, backgroundColor: "#C8963E", display: "block" }} />
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 11, fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#C8963E",
            }}>
              Est. 2019 · Specialty Coffee
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ marginBottom: 24 }}>
            <span className="animate-fade-up" style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 600,
              color: "#FDFAF4",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              animationDelay: "200ms",
              animationFillMode: "both",
            }}>
              Every Cup
            </span>
            <span className="animate-fade-up" style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 600,
              color: "#C8963E",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              animationDelay: "350ms",
              animationFillMode: "both",
            }}>
              Tells a Story.
            </span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-up" style={{
            fontFamily: "var(--font-body)",
            fontSize: 18, lineHeight: 1.7,
            color: "rgba(239,224,192,0.85)",
            maxWidth: 480, marginBottom: 40,
            animationDelay: "500ms", animationFillMode: "both",
          }}>
            Single-origin beans, hand-selected and roasted to perfection.
            Come as you are — stay for the warmth, the craft, and that
            second cup you didn&apos;t plan on.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up" style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            animationDelay: "650ms", animationFillMode: "both",
          }}>
            <a href="#menu" className="btn-amber" style={{ fontSize: 15 }}>
              Explore Menu →
            </a>
            <a href="#about" style={{
              display: "inline-flex", alignItems: "center",
              border: "1px solid rgba(239,224,192,0.4)",
              color: "#FDFAF4", borderRadius: 9999,
              padding: "14px 28px", fontSize: 15,
              fontFamily: "var(--font-body)", fontWeight: 500,
              textDecoration: "none", transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#FDFAF4";
              e.currentTarget.style.color = "#2C1A0E";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FDFAF4";
            }}>
              Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="animate-fade-in" style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(239,224,192,0.1)",
        animationDelay: "900ms", animationFillMode: "both",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "20px 24px",
          display: "flex", flexWrap: "wrap", gap: "16px 48px",
        }}>
          {[
            { label: "Mon–Fri",   value: "7 AM – 9 PM" },
            { label: "Weekends",  value: "8 AM – 10 PM" },
            { label: "Location",  value: "123 Brew St, BGC, Taguig" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(253,250,244,0.4)", marginBottom: 2,
              }}>{label}</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 14,
                fontWeight: 500, color: "rgba(253,250,244,0.9)",
              }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in" style={{
        position: "absolute", bottom: 112, right: 32,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animationDelay: "1200ms", animationFillMode: "both",
      }}>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(253,250,244,0.35)",
          writingMode: "vertical-rl",
        }}>Scroll</span>
        <span style={{
          height: 48, width: 1,
          background: "linear-gradient(to bottom, rgba(253,250,244,0.35), transparent)",
          display: "block",
        }} />
      </div>
    </section>
  );
}