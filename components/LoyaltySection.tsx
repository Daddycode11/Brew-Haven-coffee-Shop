"use client";

import { useEffect, useRef, useState } from "react";

const tiers = [
  {
    id: "brew",
    name: "Brew",
    stamps: "1–4 stamps",
    color: "#F7F0E0",
    textColor: "#5C3A1E",
    borderColor: "#EFE0C0",
    perks: ["Free size upgrade on your 5th visit", "Birthday treat — on us", "Early access to seasonal menus"],
  },
  {
    id: "roast",
    name: "Roast",
    stamps: "5–9 stamps",
    color: "#C8963E",
    textColor: "#FDFAF4",
    borderColor: "#C8963E",
    popular: true,
    perks: ["Free drink every 5 stamps", "10% off all pastries", "Priority queue on weekends", "Exclusive Roast member merch"],
  },
  {
    id: "reserve",
    name: "Reserve",
    stamps: "10+ stamps",
    color: "#2C1A0E",
    textColor: "#FDFAF4",
    borderColor: "#2C1A0E",
    perks: ["Free drink every 3 stamps", "Monthly cupping invitation", "First access to limited roasts", "20% off all orders", "Personalised brew card"],
  },
];

const stampSteps = [
  { label: "Visit & order", desc: "Any drink purchase earns one stamp." },
  { label: "Collect stamps", desc: "Stamps add up across every visit — digital or physical card." },
  { label: "Unlock rewards", desc: "Hit a tier milestone and perks unlock automatically." },
  { label: "Stay forever", desc: "Stamps never expire. Your loyalty sticks around too." },
];

export default function LoyaltySection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = (ref: React.RefObject<HTMLDivElement | null>, setter: (v: boolean) => void, threshold = 0.2) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    };
    const d1 = io(headerRef, setHeaderVisible);
    const d2 = io(cardRef, setCardVisible, 0.1);
    return () => { d1(); d2(); };
  }, []);

  return (
    <section id="loyalty" style={{ padding: "96px 0", backgroundColor: "#F7F0E0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8963E", display: "block", marginBottom: 16, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>
            Rewards Program
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C1A0E", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.1s" }}>
            The More You Visit, the Better It Gets
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#8C7B6B", maxWidth: 460, margin: "0 auto", lineHeight: 1.7, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>
            Every cup earns a stamp. Every stamp gets you closer to something good.
          </p>
        </div>

        {/* How it works */}
        <div ref={cardRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, marginBottom: 56, border: "1px solid #EFE0C0", borderRadius: 20, overflow: "hidden" }}>
          {stampSteps.map((step, i) => (
            <div key={step.label} style={{ padding: "28px 24px", borderRight: i < stampSteps.length - 1 ? "1px solid #EFE0C0" : "none", backgroundColor: "#FDFAF4", opacity: cardVisible ? 1 : 0, transform: cardVisible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${i * 80}ms` }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#FDFAF4" }}>{i + 1}</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "#2C1A0E", marginBottom: 6 }}>{step.label}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8C7B6B", lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 56 }}>
          {tiers.map((tier, i) => (
            <div key={tier.id} style={{ backgroundColor: tier.color, border: `1.5px solid ${tier.borderColor}`, borderRadius: 20, padding: "28px", opacity: cardVisible ? 1 : 0, transform: cardVisible ? "translateY(0)" : "translateY(24px)", transition: `all 0.6s ease ${(i + 1) * 100}ms`, position: "relative", overflow: "hidden" }}>
              {tier.popular && (
                <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 9999, backgroundColor: "rgba(253,250,244,0.2)", color: "#FDFAF4" }}>
                  Most Popular
                </span>
              )}
              {/* Stamp icon */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", maxWidth: 120 }}>
                  {Array.from({ length: tier.id === "brew" ? 4 : tier.id === "roast" ? 9 : 12 }).map((_, j) => (
                    <div key={j} style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: tier.id === "brew" ? "#C8963E" : tier.id === "roast" ? "rgba(253,250,244,0.9)" : "#C8963E", opacity: j < (tier.id === "brew" ? 2 : tier.id === "roast" ? 6 : 10) ? 1 : 0.25 }} />
                  ))}
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: tier.id === "brew" ? "#8C7B6B" : "rgba(253,250,244,0.55)", marginBottom: 6 }}>{tier.stamps}</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: tier.textColor, marginBottom: 20, lineHeight: 1 }}>{tier.name}</h3>
              <div style={{ borderTop: `1px solid ${tier.id === "brew" ? "#EFE0C0" : "rgba(253,250,244,0.15)"}`, paddingTop: 16 }}>
                {tier.perks.map((perk) => (
                  <div key={perk} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ flexShrink: 0, marginTop: 2, width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${tier.id === "brew" ? "#C8963E" : "rgba(253,250,244,0.4)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="7" height="7" viewBox="0 0 8 8"><polyline points="1,4 3.5,6.5 7,1.5" stroke={tier.id === "brew" ? "#C8963E" : "#FDFAF4"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: tier.id === "brew" ? "#5C3A1E" : "rgba(253,250,244,0.8)", lineHeight: 1.5 }}>{perk}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: "#2C1A0E", borderRadius: 20, padding: "40px 48px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "#FDFAF4", marginBottom: 8 }}>Start earning today</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(239,224,192,0.6)" }}>Ask at the counter for a stamp card, or download the app to track digitally.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#" className="btn-amber" style={{ fontSize: 14 }}>Get the App</a>
            <a href="#contact" className="btn-outline" style={{ fontSize: 14, borderColor: "rgba(239,224,192,0.3)", color: "#FDFAF4" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FDFAF4"; e.currentTarget.style.color = "#2C1A0E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#FDFAF4"; }}>
              Ask In-Store
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}