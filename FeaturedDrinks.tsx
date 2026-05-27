"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const drinks = [
  {
    id: 1,
    name: "Signature Flat White",
    tagline: "Our most-loved daily ritual",
    description: "Velvety microfoam layered over a double ristretto. Clean, balanced, impossible to resist.",
    price: "₱185",
    badge: "Best Seller",
    badgeStyle: { backgroundColor: "#C8963E", color: "#FDFAF4" },
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80",
    tags: ["Espresso", "Milk", "Single Origin"],
  },
  {
    id: 2,
    name: "Cold Brew Tonic",
    tagline: "Bright, effervescent, unexpected",
    description: "18-hour steeped cold brew meets premium tonic water. A summer afternoon in a glass.",
    price: "₱210",
    badge: "Seasonal",
    badgeStyle: { backgroundColor: "#5C3A1E", color: "#F7F0E0" },
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop&q=80",
    tags: ["Cold Brew", "Tonic", "Refreshing"],
  },
  {
    id: 3,
    name: "Hazel Latte",
    tagline: "Warm comfort in every sip",
    description: "House-made hazelnut praline syrup, oat milk, and a single-origin espresso shot.",
    price: "₱195",
    badge: "New",
    badgeStyle: { backgroundColor: "#2C1A0E", color: "#FDFAF4" },
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop&q=80",
    tags: ["Espresso", "Oat Milk", "Hazelnut"],
  },
];

function DrinkCard({ drink, index }: { drink: typeof drinks[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
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
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FDFAF4",
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid #EFE0C0",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered ? "0 20px 40px rgba(44,26,14,0.12)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
        <Image
          src={drink.image}
          alt={drink.name}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(44,26,14,0.5) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }} />
        {/* Badge */}
        <span style={{
          position: "absolute", top: 16, left: 16,
          fontSize: 11, fontFamily: "var(--font-body)",
          fontWeight: 500, padding: "4px 12px",
          borderRadius: 9999, ...drink.badgeStyle,
        }}>
          {drink.badge}
        </span>
        {/* Price on hover */}
        <span style={{
          position: "absolute", bottom: 16, right: 16,
          fontFamily: "var(--font-display)",
          fontSize: 26, fontWeight: 600,
          color: "#FDFAF4",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.3s",
        }}>
          {drink.price}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "24px" }}>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 11,
          fontWeight: 500, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#C8963E",
          marginBottom: 8,
        }}>
          {drink.tagline}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 20, fontWeight: 600,
            color: "#2C1A0E", lineHeight: 1.2,
          }}>
            {drink.name}
          </h3>
          <span style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600, fontSize: 18,
            color: "#C8963E", flexShrink: 0,
          }}>
            {drink.price}
          </span>
        </div>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 14,
          color: "#8C7B6B", lineHeight: 1.7,
          marginBottom: 20,
        }}>
          {drink.description}
        </p>
        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {drink.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-body)", fontSize: 12,
              padding: "4px 12px", borderRadius: 9999,
              backgroundColor: "#F7F0E0", color: "#5C3A1E",
              border: "1px solid #EFE0C0",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedDrinks() {
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" style={{ padding: "96px 0", backgroundColor: "#FDFAF4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "flex-end",
          gap: 24, marginBottom: 64,
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 11,
              fontWeight: 500, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#C8963E",
              display: "block", marginBottom: 12,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease",
            }}>
              What We Brew
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600, color: "#2C1A0E",
              lineHeight: 1.1, letterSpacing: "-0.01em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.5s ease 0.1s",
            }}>
              Crafted for Every Mood
            </h2>
          </div>
          <div style={{
            maxWidth: 360,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.2s",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 15,
              color: "#8C7B6B", lineHeight: 1.7, marginBottom: 20,
            }}>
              From your morning ritual to that late-afternoon pick-me-up —
              we&apos;ve got a cup for every chapter of your day.
            </p>
            <a href="#menu" style={{
              fontFamily: "var(--font-body)", fontSize: 14,
              fontWeight: 500, color: "#2C1A0E",
              textDecoration: "none", borderBottom: "1px solid #C8963E",
              paddingBottom: 2, transition: "color 0.2s",
            }}>
              Full Menu →
            </a>
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {drinks.map((drink, i) => (
            <DrinkCard key={drink.id} drink={drink} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 64,
          borderRadius: 24,
          backgroundColor: "#2C1A0E",
          padding: "48px",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between",
          gap: 24,
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: 26, fontWeight: 600,
              color: "#FDFAF4", marginBottom: 8,
            }}>
              Can&apos;t decide? Try our flight.
            </h3>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 14, color: "rgba(239,224,192,0.65)",
            }}>
              3 signature drinks · ₱450 · Perfect for first-timers
            </p>
          </div>
          <a href="#contact" className="btn-amber" style={{ fontSize: 15, flexShrink: 0 }}>
            Reserve a Table
          </a>
        </div>

      </div>
    </section>
  );
}