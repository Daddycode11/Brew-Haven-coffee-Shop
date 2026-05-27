"use client";

import { useEffect, useRef, useState } from "react";

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 9:00 PM" },
  { day: "Saturday",        time: "8:00 AM – 10:00 PM" },
  { day: "Sunday",          time: "8:00 AM – 8:00 PM" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Formspree endpoint — replace YOUR_FORM_ID with actual id
    await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: "96px 0", backgroundColor: "#2C1A0E" }}>
      <div
        ref={ref}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 11,
            fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#C8963E",
            display: "block", marginBottom: 16,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
          }}>
            Find Us
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600, color: "#FDFAF4",
            lineHeight: 1.1, letterSpacing: "-0.01em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.1s",
          }}>
            Come Say Hello
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
          alignItems: "start",
        }}>

          {/* Left — info */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transition: "all 0.6s ease 0.2s",
          }}>

            {/* Address */}
            <div style={{ marginBottom: 40 }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#C8963E", marginBottom: 12,
              }}>Address</p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 22, fontWeight: 500,
                color: "#FDFAF4", lineHeight: 1.4,
              }}>
                123 Brew Street<br />
                BGC, Taguig City<br />
                Metro Manila, PH
              </p>
            </div>

            {/* Hours */}
            <div style={{ marginBottom: 40 }}>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#C8963E", marginBottom: 16,
              }}>Hours</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {hours.map(({ day, time }) => (
                  <div key={day} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 16,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(239,224,192,0.08)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-body)", fontSize: 14,
                      color: "rgba(253,250,244,0.6)",
                    }}>{day}</span>
                    <span style={{
                      fontFamily: "var(--font-body)", fontSize: 14,
                      fontWeight: 500, color: "#FDFAF4",
                    }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#C8963E", marginBottom: 16,
              }}>Follow Us</p>
              <div style={{ display: "flex", gap: 12 }}>
                {socials.map(({ label, href, icon }) => (
                  <a key={label} href={href}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: "var(--font-body)", fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(253,250,244,0.7)",
                      textDecoration: "none",
                      border: "1px solid rgba(239,224,192,0.15)",
                      padding: "8px 16px", borderRadius: 9999,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#FDFAF4";
                      e.currentTarget.style.borderColor = "rgba(239,224,192,0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(253,250,244,0.7)";
                      e.currentTarget.style.borderColor = "rgba(239,224,192,0.15)";
                    }}
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle — map */}
          <div style={{
            borderRadius: 20, overflow: "hidden",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.6s ease 0.3s",
            border: "1px solid rgba(239,224,192,0.1)",
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802!2d121.0437!3d14.5547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzE3LjAiTiAxMjHCsDAyJzM3LjMiRQ!5e0!3m2!1sen!2sph!4v1234567890"
              width="100%"
              height="380"
              style={{ border: 0, display: "block", filter: "sepia(20%) contrast(90%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Brew Haven Location"
            />
          </div>

          {/* Right — form */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(24px)",
            transition: "all 0.6s ease 0.4s",
          }}>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 11,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#C8963E", marginBottom: 20,
            }}>Send a Message</p>

            {submitted ? (
              <div style={{
                backgroundColor: "rgba(200,150,62,0.1)",
                border: "1px solid rgba(200,150,62,0.3)",
                borderRadius: 16, padding: 32,
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22, color: "#C8963E", marginBottom: 8,
                }}>Thanks! ☕</p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14, color: "rgba(253,250,244,0.6)",
                }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name",    placeholder: "Your name",         type: "text"  },
                  { key: "email",   placeholder: "Email address",     type: "email" },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 14,
                      padding: "14px 18px",
                      backgroundColor: "rgba(253,250,244,0.05)",
                      border: "1px solid rgba(239,224,192,0.15)",
                      borderRadius: 12, color: "#FDFAF4",
                      outline: "none", width: "100%",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(200,150,62,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(239,224,192,0.15)")}
                  />
                ))}
                <textarea
                  placeholder="Your message or reservation request..."
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: 14,
                    padding: "14px 18px",
                    backgroundColor: "rgba(253,250,244,0.05)",
                    border: "1px solid rgba(239,224,192,0.15)",
                    borderRadius: 12, color: "#FDFAF4",
                    outline: "none", width: "100%",
                    resize: "vertical", transition: "border-color 0.2s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(200,150,62,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(239,224,192,0.15)")}
                />
                <button type="submit" className="btn-amber"
                  style={{ fontSize: 15, opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message →"}
                </button>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: 12,
                  color: "rgba(253,250,244,0.3)", textAlign: "center",
                }}>
                  Or call us: <span style={{ color: "rgba(253,250,244,0.6)" }}>+63 912 345 6789</span>
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Footer strip */}
        <div style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: "1px solid rgba(239,224,192,0.08)",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center",
          gap: 16,
          opacity: visible ? 1 : 0,
          transition: "all 0.5s ease 0.6s",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 20, fontWeight: 600,
              color: "#FDFAF4", marginBottom: 4,
            }}>Brew Haven</p>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 12,
              color: "rgba(253,250,244,0.35)",
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Specialty Coffee · Est. 2019</p>
          </div>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 12,
            color: "rgba(253,250,244,0.25)",
          }}>
            © 2025 Brew Haven. All rights reserved.
          </p>
        </div>

      </div>
    </section>
  );
}