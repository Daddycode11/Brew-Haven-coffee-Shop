"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Menu",      href: "#full-menu" },
  { label: "Order",     href: "#order"     },
  { label: "Events",    href: "#events"    },
  { label: "Loyalty",   href: "#loyalty"   },
  { label: "About",     href: "#about"     },
  { label: "Gallery",   href: "#gallery"   },
  { label: "Contact",   href: "#contact"   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        backgroundColor: scrolled ? "rgba(253,250,244,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", lineHeight: 1, flexShrink: 0 }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 600,
              color: scrolled ? "#2C1A0E" : "#FDFAF4",
              transition: "color 0.3s",
              letterSpacing: "-0.01em",
            }}>
              Brew Haven
            </div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: scrolled ? "#8C7B6B" : "rgba(253,250,244,0.6)",
              marginTop: 2,
              transition: "color 0.3s",
            }}>
              Specialty Coffee
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: scrolled ? "#5C3A1E" : "rgba(253,250,244,0.85)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8963E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#5C3A1E" : "rgba(253,250,244,0.85)")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }} className="desktop-nav">
            <a
              href="#order"
              className="btn-amber"
              style={{ padding: "8px 20px", fontSize: 13 }}
            >
              Order Ahead
            </a>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: "8px 20px", fontSize: 13 }}
            >
              Visit Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: 2,
                  width: 24,
                  backgroundColor: scrolled || menuOpen ? "#2C1A0E" : "#FDFAF4",
                  borderRadius: 2,
                  transition: "all 0.25s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translateY(7px)"
                      : i === 2
                      ? "rotate(-45deg) translateY(-7px)"
                      : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          backgroundColor: "#FDFAF4",
          display: "flex",
          flexDirection: "column",
          paddingTop: 96,
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 40,
          transition: "opacity 0.3s, transform 0.3s",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, overflowY: "auto" }}>
          {navLinks.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 500,
                color: "#2C1A0E",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: i < navLinks.length - 1 ? "1px solid #EFE0C0" : "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C8963E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2C1A0E")}
            >
              {label}
            </a>
          ))}
        </nav>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          borderTop: "1px solid #EFE0C0",
          paddingTop: 24,
          marginTop: 24,
        }}>
          <a
            href="#order"
            onClick={() => setMenuOpen(false)}
            className="btn-amber"
            style={{ textAlign: "center", fontSize: 15 }}
          >
            Order Ahead
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-outline"
            style={{ textAlign: "center", fontSize: 15 }}
          >
            Visit Us
          </a>
        </div>
      </div>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}