"use client";

import { useEffect, useRef, useState } from "react";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  tags: string[];
  badge?: string;
  popular?: boolean;
};

type Category = {
  id: string;
  label: string;
  items: MenuItem[];
};

const categories: Category[] = [
  {
    id: "espresso",
    label: "Espresso",
    items: [
      {
        id: 1,
        name: "Signature Flat White",
        description: "Velvety microfoam over a double ristretto. Clean, balanced, impossible to resist.",
        price: "₱185",
        tags: ["Single Origin", "Milk"],
        badge: "Best Seller",
        popular: true,
      },
      {
        id: 2,
        name: "Hazel Latte",
        description: "House-made hazelnut praline syrup, oat milk, and a single-origin espresso shot.",
        price: "₱195",
        tags: ["Oat Milk", "Hazelnut"],
        badge: "New",
      },
      {
        id: 3,
        name: "Cortado",
        description: "Equal parts espresso and warm milk. Bold yet silky — for the purist.",
        price: "₱165",
        tags: ["Strong", "Classic"],
      },
      {
        id: 4,
        name: "Dirty Matcha",
        description: "A shot of espresso poured over ceremonial-grade matcha and steamed oat milk.",
        price: "₱210",
        tags: ["Matcha", "Oat Milk"],
        badge: "Fan Fave",
        popular: true,
      },
      {
        id: 5,
        name: "Caramel Macchiato",
        description: "Vanilla-sweetened milk marked with espresso and a drizzle of house caramel.",
        price: "₱195",
        tags: ["Sweet", "Caramel"],
      },
      {
        id: 6,
        name: "Lungo Noir",
        description: "Extended espresso pull over ice with a hint of black cardamom. Unexpected depth.",
        price: "₱175",
        tags: ["Black", "Spiced"],
      },
    ],
  },
  {
    id: "cold",
    label: "Cold Brew",
    items: [
      {
        id: 7,
        name: "Cold Brew Tonic",
        description: "18-hour steeped cold brew meets premium tonic water. A summer afternoon in a glass.",
        price: "₱210",
        tags: ["Effervescent", "Refreshing"],
        badge: "Seasonal",
        popular: true,
      },
      {
        id: 8,
        name: "Classic Cold Brew",
        description: "Slow-steeped 18 hours, served over ice. Smooth with zero bitterness.",
        price: "₱185",
        tags: ["Strong", "Smooth"],
      },
      {
        id: 9,
        name: "Brown Sugar Cold Brew",
        description: "Cold brew with house brown sugar syrup and a splash of fresh cream.",
        price: "₱200",
        tags: ["Sweet", "Creamy"],
        popular: true,
      },
      {
        id: 10,
        name: "Salted Caramel Nitro",
        description: "Nitrogen-infused cold brew with a salted caramel swirl. Pours like a stout.",
        price: "₱230",
        tags: ["Nitro", "Caramel"],
        badge: "Premium",
      },
    ],
  },
  {
    id: "non-coffee",
    label: "Non-Coffee",
    items: [
      {
        id: 11,
        name: "Golden Milk Latte",
        description: "Turmeric, ginger, cinnamon, and oat milk. Ancient comfort, modern cup.",
        price: "₱175",
        tags: ["Caffeine-Free", "Spiced"],
        popular: true,
      },
      {
        id: 12,
        name: "Ceremonial Matcha",
        description: "Stone-ground ceremonial grade matcha whisked with steamed oat milk.",
        price: "₱195",
        tags: ["Matcha", "Oat Milk"],
        badge: "Staff Pick",
      },
      {
        id: 13,
        name: "Strawberry Hojicha",
        description: "Roasted hojicha latte swirled with fresh strawberry compote.",
        price: "₱205",
        tags: ["Fruity", "Roasted"],
      },
      {
        id: 14,
        name: "Sparkling Lemonade",
        description: "Hand-squeezed lemon, cane sugar, and chilled sparkling water.",
        price: "₱145",
        tags: ["Citrus", "Refreshing"],
      },
    ],
  },
  {
    id: "pastries",
    label: "Pastries",
    items: [
      {
        id: 15,
        name: "Kouign-Amann",
        description: "Caramelized, buttery, and flaky. Baked fresh every morning — gone by noon.",
        price: "₱120",
        tags: ["Buttery", "Baked"],
        badge: "Morning Only",
        popular: true,
      },
      {
        id: 16,
        name: "Cardamom Knot",
        description: "Soft, pillowy dough twisted with cardamom butter and pearl sugar.",
        price: "₱110",
        tags: ["Spiced", "Soft"],
        badge: "House Fave",
      },
      {
        id: 17,
        name: "Almond Croissant",
        description: "Twice-baked with almond frangipane and toasted flaked almonds.",
        price: "₱135",
        tags: ["Flaky", "Nutty"],
        popular: true,
      },
      {
        id: 18,
        name: "Banana Walnut Loaf",
        description: "Dense, moist, and spiced with a hint of brown butter.",
        price: "₱95",
        tags: ["Sweet", "Nutty"],
      },
      {
        id: 19,
        name: "Sourdough Toast",
        description: "Thick-cut house sourdough with whipped butter and choice of jam or avocado.",
        price: "₱150",
        tags: ["Savory", "Light"],
      },
    ],
  },
];

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
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

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        padding: "20px 24px",
        borderRadius: 16,
        border: `1px solid ${hovered ? "#C8963E" : "#EFE0C0"}`,
        backgroundColor: hovered ? "#FFF8EE" : "#FDFAF4",
        transition: "all 0.25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionProperty: "opacity, transform, background-color, border-color",
        transitionDuration: `0.5s, 0.5s, 0.25s, 0.25s`,
        transitionDelay: `${index * 60}ms, ${index * 60}ms, 0ms, 0ms`,
        cursor: "default",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 17, fontWeight: 600,
            color: "#2C1A0E", lineHeight: 1.2,
          }}>
            {item.name}
          </h3>
          {item.popular && (
            <span style={{
              fontSize: 10, fontFamily: "var(--font-body)",
              fontWeight: 500, letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "2px 8px", borderRadius: 9999,
              backgroundColor: "#C8963E", color: "#FDFAF4",
            }}>
              {item.badge ?? "Popular"}
            </span>
          )}
          {!item.popular && item.badge && (
            <span style={{
              fontSize: 10, fontFamily: "var(--font-body)",
              fontWeight: 500, letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "2px 8px", borderRadius: 9999,
              backgroundColor: "#F7F0E0", color: "#5C3A1E",
              border: "1px solid #EFE0C0",
            }}>
              {item.badge}
            </span>
          )}
        </div>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: 13,
          color: "#8C7B6B", lineHeight: 1.6, marginBottom: 10,
        }}>
          {item.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11, fontFamily: "var(--font-body)",
              padding: "3px 10px", borderRadius: 9999,
              backgroundColor: "#F7F0E0", color: "#7A4F2D",
              border: "1px solid #EFE0C0",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: 18, fontWeight: 600,
        color: hovered ? "#C8963E" : "#2C1A0E",
        flexShrink: 0,
        transition: "color 0.25s",
        paddingTop: 2,
      }}>
        {item.price}
      </span>
    </div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("espresso");
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

  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="full-menu" style={{ padding: "96px 0", backgroundColor: "#F7F0E0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 11,
            fontWeight: 500, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#C8963E",
            display: "block", marginBottom: 16,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
          }}>
            The Full Menu
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
            Something for Everyone
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16,
            color: "#8C7B6B", maxWidth: 460, margin: "0 auto",
            lineHeight: 1.7,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease 0.2s",
          }}>
            Seasonal ingredients, thoughtful sourcing, and recipes refined over years of mornings.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "center", gap: 8,
          marginBottom: 40,
          opacity: headerVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                fontFamily: "var(--font-body)", fontSize: 14,
                fontWeight: 500, padding: "10px 24px",
                borderRadius: 9999, border: "1px solid",
                cursor: "pointer", transition: "all 0.2s",
                backgroundColor: activeCategory === cat.id ? "#2C1A0E" : "#FDFAF4",
                color: activeCategory === cat.id ? "#FDFAF4" : "#2C1A0E",
                borderColor: activeCategory === cat.id ? "#2C1A0E" : "#EFE0C0",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 12,
        }}>
          {active.items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center", marginTop: 40,
          fontFamily: "var(--font-body)", fontSize: 13,
          color: "#8C7B6B", lineHeight: 1.7,
        }}>
          All espresso drinks available with oat, almond, or full-cream milk.
          Menu changes seasonally — ask your barista what&apos;s fresh today.
        </p>
      </div>
    </section>
  );
}