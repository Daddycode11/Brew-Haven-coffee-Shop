"use client";

import { useEffect, useRef, useState } from "react";

const perks = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: "Early access",
    desc: "Seasonal menus before anyone else.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5A2.5 2.5 0 0 1 7.5 2C10 2 12 7 12 7z"/><path d="M12 7h4.5A2.5 2.5 0 0 0 16.5 2C14 2 12 7 12 7z"/>
      </svg>
    ),
    label: "Member offers",
    desc: "Exclusive discounts, just for subscribers.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    label: "Brew guides",
    desc: "Tips, recipes, and origin stories.",
  },
];

export default function NewsletterSection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!email.includes("@")) { setState("error"); return; }
    setState("loading");
    setTimeout(() => { setState("done"); }, 1200);
  };

  return (
    <section id="newsletter" style={{ padding: "96px 0", backgroundColor: "#2C1A0E" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease",
          }}
          className="newsletter-layout"
        >
          {/* Left */}
          <div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8963E", display: "block", marginBottom: 16 }}>
              Stay in the Loop
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 600, color: "#FDFAF4", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 20 }}>
              Good things first,<br />your inbox second.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(239,224,192,0.6)", lineHeight: 1.7, marginBottom: 36, maxWidth: 380 }}>
              No spam — just the seasonal drops, exclusive offers, and occasional brew guide that makes you feel like a regular, even before you walk in.
            </p>

            {/* Perks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {perks.map((p) => (
                <div key={p.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(200,150,62,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8963E", flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#FDFAF4", marginBottom: 2 }}>{p.label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,224,192,0.5)" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ backgroundColor: "#FDFAF4", borderRadius: 24, padding: "40px" }}>
            {state === "done" ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#F7F0E0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8963E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#2C1A0E", marginBottom: 10 }}>You&apos;re in.</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8C7B6B", lineHeight: 1.6 }}>Welcome to the list. Check your inbox for a little something from us.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#2C1A0E", marginBottom: 8 }}>Join 4,200+ subscribers</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8C7B6B", marginBottom: 28, lineHeight: 1.6 }}>One email a month. Unsubscribe anytime, no hard feelings.</p>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8C7B6B", display: "block", marginBottom: 8 }}>Your name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #EFE0C0", fontFamily: "var(--font-body)", fontSize: 14, color: "#2C1A0E", backgroundColor: "#FDFAF4", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8C7B6B", display: "block", marginBottom: 8 }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                    placeholder="you@example.com"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${state === "error" ? "#C0392B" : "#EFE0C0"}`, fontFamily: "var(--font-body)", fontSize: 14, color: "#2C1A0E", backgroundColor: "#FDFAF4", outline: "none", boxSizing: "border-box" }}
                  />
                  {state === "error" && <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#C0392B", marginTop: 6 }}>Please enter a valid email.</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={state === "loading"}
                  className="btn-amber"
                  style={{ width: "100%", justifyContent: "center", fontSize: 15, opacity: state === "loading" ? 0.7 : 1, transition: "opacity 0.2s" }}
                >
                  {state === "loading" ? "Subscribing…" : "Subscribe — it's free"}
                </button>

                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                  By subscribing you agree to our privacy policy.{" "}
                  <a href="#" style={{ color: "#C8963E", textDecoration: "none" }}>Read it here.</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .newsletter-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}