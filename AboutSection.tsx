"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { value: "5+",   label: "Years Brewing" },
  { value: "12",   label: "Single Origins" },
  { value: "200+", label: "Daily Cups" },
  { value: "100%", label: "Ethically Sourced" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ padding: "96px 0", backgroundColor: "#F7F0E0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 64,
          alignItems: "center",
        }}>

          {/* Left — images */}
          <div ref={ref} style={{ position: "relative" }}>

            {/* Main image */}
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              aspectRatio: "4/5",
              position: "relative",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "all 0.7s ease",
            }}>
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
                alt="Barista crafting coffee"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating second image */}
            <div style={{
              position: "absolute",
              bottom: -32,
              right: -24,
              width: "55%",
              aspectRatio: "1/1",
              borderRadius: 20,
              overflow: "hidden",
              border: "4px solid #F7F0E0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.2s",
            }}>
              <Image
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80"
                alt="Coffee beans close up"
                fill
                style={{ objectFit: "cover" }}
                sizes="30vw"
              />
            </div>

            {/* Floating stat card */}
            <div style={{
              position: "absolute",
              top: 32,
              right: -16,
              backgroundColor: "#2C1A0E",
              borderRadius: 16,
              padding: "20px 24px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-16px)",
              transition: "all 0.7s ease 0.35s",
            }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 36, fontWeight: 700,
                color: "#C8963E", lineHeight: 1,
                marginBottom: 4,
              }}>5★</p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 11, color: "rgba(253,250,244,0.6)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>Google Rating</p>
            </div>
          </div>

          {/* Right — text */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(32px)",
            transition: "all 0.7s ease 0.15s",
          }}>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11,
              fontWeight: 500, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#C8963E",
              display: "block", marginBottom: 16,
            }}>
              Our Story
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 600, color: "#2C1A0E",
              lineHeight: 1.15, letterSpacing: "-0.01em",
              marginBottom: 24,
            }}>
              Born from a Love of<br />
              <em style={{ color: "#C8963E", fontStyle: "italic" }}>Good Coffee.</em>
            </h2>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16,
              color: "#5C3A1E", lineHeight: 1.8,
              marginBottom: 20,
            }}>
              Brew Haven started in 2019 as a small corner shop with one espresso machine,
              two bar stools, and an obsession with sourcing the finest single-origin beans
              from around the world.
            </p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16,
              color: "#8C7B6B", lineHeight: 1.8,
              marginBottom: 40,
            }}>
              Today we&apos;re still that same corner shop — just with a few more stools,
              a rotating menu of seasonal specials, and a community of regulars who feel
              like family. Every cup we make carries that original intention: to slow down,
              connect, and taste something worth remembering.
            </p>

            {/* Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              marginBottom: 40,
              paddingTop: 32,
              borderTop: "1px solid #EFE0C0",
            }}>
              {stats.map(({ value, label }, i) => (
                <div key={label} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
                }}>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32, fontWeight: 700,
                    color: "#2C1A0E", lineHeight: 1,
                    marginBottom: 4,
                  }}>{value}</p>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13, color: "#8C7B6B",
                    letterSpacing: "0.05em",
                  }}>{label}</p>
                </div>
              ))}
            </div>

            <a href="#menu" className="btn-primary" style={{ fontSize: 15 }}>
              See Our Menu →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}