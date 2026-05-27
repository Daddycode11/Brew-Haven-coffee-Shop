"use client";

import { useEffect, useRef, useState } from "react";

type Event = {
  id: number;
  title: string;
  type: string;
  typeColor: { bg: string; text: string };
  date: string;
  day: string;
  month: string;
  time: string;
  description: string;
  spots?: number;
  spotsLeft?: number;
  free: boolean;
  price?: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Origins: Ethiopia & Colombia Cupping",
    type: "Brew Workshop",
    typeColor: { bg: "#F7F0E0", text: "#5C3A1E" },
    date: "14",
    day: "Saturday",
    month: "Jun",
    time: "10:00 AM – 12:00 PM",
    description: "Taste two single-origin beans side-by-side and learn how soil, altitude, and processing shape every note in your cup.",
    spots: 12,
    spotsLeft: 4,
    free: false,
    price: "₱350",
  },
  {
    id: 2,
    title: "Open Mic Night — June Edition",
    type: "Live Music",
    typeColor: { bg: "#EFE0C0", text: "#3D2510" },
    date: "21",
    day: "Saturday",
    month: "Jun",
    time: "7:00 PM – 10:00 PM",
    description: "Local artists, spoken word, acoustic sets — and great coffee. The stage is open to anyone. Come perform or just come listen.",
    free: true,
  },
  {
    id: 3,
    title: "Latte Art Fundamentals",
    type: "Brew Workshop",
    typeColor: { bg: "#F7F0E0", text: "#5C3A1E" },
    date: "28",
    day: "Saturday",
    month: "Jun",
    time: "2:00 PM – 4:00 PM",
    description: "Our head barista walks you through milk texturing, pour technique, and basic patterns — heart, tulip, and rosetta. Hands-on, no experience required.",
    spots: 8,
    spotsLeft: 8,
    free: false,
    price: "₱480",
  },
  {
    id: 4,
    title: "Morning Brew & Sketch",
    type: "Community",
    typeColor: { bg: "#2C1A0E", text: "#FDFAF4" },
    date: "5",
    day: "Saturday",
    month: "Jul",
    time: "8:00 AM – 10:00 AM",
    description: "A quiet morning for coffee and drawing. Bring your sketchbook, we bring the flat whites. No agenda, no instruction. Just good light and a calm start to the weekend.",
    free: true,
  },
];

function EventCard({ event, index }: { event: Event; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const spotsPercent = event.spots && event.spotsLeft != null
    ? Math.round(((event.spots - event.spotsLeft) / event.spots) * 100)
    : null;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: 24,
        padding: "24px",
        borderRadius: 18,
        border: `1px solid ${hovered ? "#C8963E" : "#EFE0C0"}`,
        backgroundColor: hovered ? "#FFF8EE" : "#FDFAF4",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionProperty: "opacity, transform, background-color, border-color",
        transitionDuration: `0.5s, 0.5s, 0.25s, 0.25s`,
        transitionDelay: `${index * 80}ms, ${index * 80}ms, 0ms, 0ms`,
      }}
    >
      {/* Date block */}
      <div style={{ textAlign: "center", paddingTop: 4 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8963E", marginBottom: 4 }}>{event.month}</p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, color: "#2C1A0E", lineHeight: 1 }}>{event.date}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#8C7B6B", marginTop: 4 }}>{event.day}</p>
      </div>

      {/* Details */}
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 9999, backgroundColor: event.typeColor.bg, color: event.typeColor.text, border: event.type === "Community" ? "1px solid rgba(253,250,244,0.1)" : `1px solid ${event.typeColor.bg === "#2C1A0E" ? "transparent" : "#EFE0C0"}` }}>
            {event.type}
          </span>
          {event.free
            ? <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 500, padding: "3px 10px", borderRadius: 9999, backgroundColor: "#F7F0E0", color: "#5C3A1E", border: "1px solid #EFE0C0" }}>Free</span>
            : <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 500, padding: "3px 10px", borderRadius: 9999, color: "#C8963E" }}>{event.price}</span>
          }
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#2C1A0E", lineHeight: 1.25, marginBottom: 8 }}>{event.title}</h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B", marginBottom: 10 }}>
          <svg style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8C7B6B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {event.time}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8C7B6B", lineHeight: 1.65, marginBottom: 14 }}>{event.description}</p>

        {/* Spots bar */}
        {spotsPercent != null && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B" }}>{event.spotsLeft} spots left</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B" }}>{event.spots} total</span>
            </div>
            <div style={{ height: 4, borderRadius: 9999, backgroundColor: "#EFE0C0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${spotsPercent}%`, borderRadius: 9999, backgroundColor: spotsPercent > 80 ? "#C8963E" : "#2C1A0E", transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}

        <a href="#contact" className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>
          {event.free ? "I'll Be There" : "Register →"}
        </a>
      </div>
    </div>
  );
}

export default function EventsSection() {
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
    <section id="events" style={{ padding: "96px 0", backgroundColor: "#FDFAF4" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48 }}>
          <div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8963E", display: "block", marginBottom: 12, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>
              What&apos;s On
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C1A0E", lineHeight: 1.1, letterSpacing: "-0.01em", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.1s" }}>
              More Than Coffee
            </h2>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8C7B6B", maxWidth: 360, lineHeight: 1.7, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>
            Workshops, live music, and community mornings. There&apos;s always something worth showing up for.
          </p>
        </div>

        {/* Event list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8C7B6B", marginBottom: 16 }}>
            Want to host a private event or perform at open mic?
          </p>
          <a href="#contact" className="btn-outline" style={{ fontSize: 14 }}>Get in Touch</a>
        </div>

      </div>
    </section>
  );
}