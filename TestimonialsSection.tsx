"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maya Reyes",
    handle: "@mayareyes",
    initials: "MR",
    rating: 5,
    text: "Brew Haven has completely ruined all other coffee for me. The flat white here is the standard I now hold everything else against. Worth every commute.",
    color: { bg: "#F7F0E0", text: "#5C3A1E" },
  },
  {
    id: 2,
    name: "Carlo Santos",
    handle: "Google Review",
    initials: "CS",
    rating: 5,
    text: "I've been coming here every weekday for two years. The baristas remember my order, the music is always just right, and the cold brew tonic is genuinely life-changing.",
    color: { bg: "#EFE0C0", text: "#3D2510" },
  },
  {
    id: 3,
    name: "Trisha Lim",
    handle: "@trishalim",
    initials: "TL",
    rating: 5,
    text: "The kouign-amann alone is reason enough to visit. Paired with a dirty matcha and a corner seat — it's my happiest hour of the week.",
    color: { bg: "#F7F0E0", text: "#5C3A1E" },
  },
  {
    id: 4,
    name: "Rafael Cruz",
    handle: "Yelp Review",
    initials: "RC",
    rating: 5,
    text: "Genuinely the most comfortable café I've ever worked from. Fast wifi, great natural light, and nobody makes you feel guilty for staying four hours.",
    color: { bg: "#2C1A0E", text: "#FDFAF4" },
    light: true,
  },
  {
    id: 5,
    name: "Nico Villanueva",
    handle: "@nicov",
    initials: "NV",
    rating: 5,
    text: "Came for a meeting, stayed for the atmosphere. The staff are warm without being intrusive, and the cardamom knot is the best thing I've eaten this year.",
    color: { bg: "#F7F0E0", text: "#5C3A1E" },
  },
  {
    id: 6,
    name: "Bianca Torres",
    handle: "Google Review",
    initials: "BT",
    rating: 5,
    text: "I brought my parents here and even my dad — who 'doesn't like fancy coffee' — asked me to order him a second flat white before we left. That says it all.",
    color: { bg: "#EFE0C0", text: "#3D2510" },
  },
];

function StarRating({ rating, light }: { rating: number; light?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14" height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#C8963E" : "none"}
          stroke={i < rating ? "#C8963E" : light ? "rgba(253,250,244,0.3)" : "#D4C4A8"}
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof testimonials)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLight = item.light;
  const textColor = isLight ? "#FDFAF4" : "#2C1A0E";
  const subtextColor = isLight ? "rgba(253,250,244,0.55)" : "#8C7B6B";
  const borderColor = isLight ? "rgba(253,250,244,0.1)" : "#EFE0C0";

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: item.color.bg,
        borderRadius: 20,
        padding: "28px",
        border: `1px solid ${borderColor}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
      <div>
        <StarRating rating={item.rating} light={isLight} />
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 15, lineHeight: 1.7,
          color: textColor,
          fontStyle: "italic",
        }}>
          &ldquo;{item.text}&rdquo;
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Avatar */}
        <div style={{
          width: 40, height: 40,
          borderRadius: "50%",
          backgroundColor: isLight ? "rgba(253,250,244,0.15)" : "#EFE0C0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-body)",
          fontSize: 13, fontWeight: 500,
          color: isLight ? "#FDFAF4" : "#5C3A1E",
          flexShrink: 0,
          border: `1px solid ${borderColor}`,
        }}>
          {item.initials}
        </div>
        <div>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 14, fontWeight: 500,
            color: textColor, marginBottom: 1,
          }}>
            {item.name}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 12, color: subtextColor,
          }}>
            {item.handle}
          </p>
        </div>

        {/* Quote mark */}
        <svg
          style={{ marginLeft: "auto", opacity: isLight ? 0.15 : 0.1, flexShrink: 0 }}
          width="28" height="28"
          viewBox="0 0 24 24"
          fill={isLight ? "#FDFAF4" : "#2C1A0E"}
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reviews" style={{ padding: "96px 0", backgroundColor: "#FDFAF4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 11,
            fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#C8963E",
            display: "block", marginBottom: 16,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
          }}>
            What People Say
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600, color: "#2C1A0E",
            lineHeight: 1.1, letterSpacing: "-0.01em",
            marginBottom: 16,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.1s",
          }}>
            Regulars Don&apos;t Lie
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16,
            color: "#8C7B6B", maxWidth: 460, margin: "0 auto",
            lineHeight: 1.7,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.2s",
          }}>
            Over 2,000 five-star reviews and counting. But honestly — come see for yourself.
          </p>
        </div>

        {/* Rating summary */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          marginBottom: 56,
          opacity: headerVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 52, fontWeight: 600,
              color: "#2C1A0E", lineHeight: 1,
              marginBottom: 6,
            }}>4.9</p>
            <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 6 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C8963E" stroke="#C8963E" strokeWidth="1.5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 13,
              color: "#8C7B6B",
            }}>Average rating</p>
          </div>

          <div style={{
            width: 1, height: 64,
            backgroundColor: "#EFE0C0",
          }} />

          {[
            { value: "2,400+", label: "Total reviews" },
            { value: "98%", label: "Would recommend" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 36, fontWeight: 600,
                color: "#2C1A0E", lineHeight: 1,
                marginBottom: 6,
              }}>{value}</p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 13,
                color: "#8C7B6B",
              }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 56, textAlign: "center",
          opacity: headerVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.5s",
        }}>
          <a
            href="https://g.page/r/brewhaven"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: 14 }}
          >
            Leave a Review →
          </a>
        </div>
      </div>
    </section>
  );
}