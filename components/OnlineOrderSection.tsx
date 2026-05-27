"use client";

import { useEffect, useRef, useState } from "react";

type Size = { id: string; label: string; oz: string; extra: number };
type Milk = { id: string; label: string };
type Extra = { id: string; label: string; price: number };
type DrinkOption = {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  category: string;
};

const drinks: DrinkOption[] = [
  { id: 1, name: "Signature Flat White", basePrice: 185, description: "Double ristretto + velvety microfoam", category: "Espresso" },
  { id: 2, name: "Hazel Latte", basePrice: 195, description: "Hazelnut praline, oat milk, espresso", category: "Espresso" },
  { id: 3, name: "Cortado", basePrice: 165, description: "Equal espresso and warm milk", category: "Espresso" },
  { id: 4, name: "Cold Brew Tonic", basePrice: 210, description: "18-hr cold brew + premium tonic", category: "Cold Brew" },
  { id: 5, name: "Brown Sugar Cold Brew", basePrice: 200, description: "Cold brew, brown sugar, fresh cream", category: "Cold Brew" },
  { id: 6, name: "Golden Milk Latte", basePrice: 175, description: "Turmeric, ginger, cinnamon, oat milk", category: "Non-Coffee" },
  { id: 7, name: "Ceremonial Matcha", basePrice: 195, description: "Stone-ground matcha + steamed oat milk", category: "Non-Coffee" },
];

const sizes: Size[] = [
  { id: "small", label: "Small", oz: "8 oz", extra: 0 },
  { id: "regular", label: "Regular", oz: "12 oz", extra: 20 },
  { id: "large", label: "Large", oz: "16 oz", extra: 40 },
];

const milks: Milk[] = [
  { id: "whole", label: "Whole Milk" },
  { id: "oat", label: "Oat Milk" },
  { id: "almond", label: "Almond Milk" },
  { id: "skim", label: "Skim Milk" },
];

const extras: Extra[] = [
  { id: "shot", label: "Extra Shot", price: 40 },
  { id: "syrup", label: "Flavour Syrup", price: 25 },
  { id: "oat", label: "Upgrade to Oat", price: 30 },
  { id: "decaf", label: "Decaf Swap", price: 0 },
];

type OrderItem = {
  drink: DrinkOption;
  size: Size;
  milk: Milk;
  extras: Extra[];
  qty: number;
};

export default function OnlineOrderSection() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<DrinkOption>(drinks[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(sizes[1]);
  const [selectedMilk, setSelectedMilk] = useState<Milk>(milks[1]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [qty, setQty] = useState(1);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [added, setAdded] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleExtra = (ex: Extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === ex.id) ? prev.filter((e) => e.id !== ex.id) : [...prev, ex]
    );
  };

  const itemTotal = (selectedDrink.basePrice + selectedSize.extra + selectedExtras.reduce((s, e) => s + e.price, 0)) * qty;

  const addToOrder = () => {
    setOrder((prev) => [...prev, { drink: selectedDrink, size: selectedSize, milk: selectedMilk, extras: selectedExtras, qty }]);
    setAdded(true);
    setQty(1);
    setSelectedExtras([]);
    setTimeout(() => setAdded(false), 2000);
  };

  const removeItem = (i: number) => setOrder((prev) => prev.filter((_, idx) => idx !== i));

  const orderTotal = order.reduce((sum, item) => {
    const base = item.drink.basePrice + item.size.extra + item.extras.reduce((s, e) => s + e.price, 0);
    return sum + base * item.qty;
  }, 0);

  const cats = ["All", ...Array.from(new Set(drinks.map((d) => d.category)))];
  const filteredDrinks = filterCat === "All" ? drinks : drinks.filter((d) => d.category === filterCat);

  const labelStyle = { fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500 as const, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#8C7B6B", display: "block" as const, marginBottom: 10 };
  const sectionGap = { marginBottom: 24 };

  return (
    <section id="order" style={{ padding: "96px 0", backgroundColor: "#2C1A0E" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8963E", display: "block", marginBottom: 16, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease" }}>
            Order Ahead
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#FDFAF4", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.1s" }}>
            Skip the Queue
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(239,224,192,0.65)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.5s ease 0.2s" }}>
            Customise your order, we&apos;ll have it ready when you walk in.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }} className="order-layout">

          {/* Builder */}
          <div style={{ backgroundColor: "#FDFAF4", borderRadius: 24, padding: "32px" }}>

            {/* Step 1: Choose drink */}
            <div style={sectionGap}>
              <span style={labelStyle}>1 — Choose your drink</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                {cats.map((c) => (
                  <button key={c} onClick={() => setFilterCat(c)} style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, padding: "6px 16px", borderRadius: 9999, border: "1px solid", cursor: "pointer", transition: "all 0.2s", backgroundColor: filterCat === c ? "#2C1A0E" : "#F7F0E0", color: filterCat === c ? "#FDFAF4" : "#2C1A0E", borderColor: filterCat === c ? "#2C1A0E" : "#EFE0C0" }}>
                    {c}
                  </button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {filteredDrinks.map((d) => (
                  <button key={d.id} onClick={() => setSelectedDrink(d)} style={{ textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${selectedDrink.id === d.id ? "#C8963E" : "#EFE0C0"}`, backgroundColor: selectedDrink.id === d.id ? "#FFF8EE" : "#FDFAF4", cursor: "pointer", transition: "all 0.2s" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "#2C1A0E", marginBottom: 3 }}>{d.name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B", marginBottom: 6 }}>{d.description}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#C8963E" }}>from ₱{d.basePrice}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size */}
            <div style={sectionGap}>
              <span style={labelStyle}>2 — Size</span>
              <div style={{ display: "flex", gap: 10 }}>
                {sizes.map((s) => (
                  <button key={s.id} onClick={() => setSelectedSize(s)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1.5px solid ${selectedSize.id === s.id ? "#C8963E" : "#EFE0C0"}`, backgroundColor: selectedSize.id === s.id ? "#FFF8EE" : "#FDFAF4", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#2C1A0E", marginBottom: 2 }}>{s.label}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8C7B6B" }}>{s.oz}</p>
                    {s.extra > 0 && <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#C8963E", marginTop: 2 }}>+₱{s.extra}</p>}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Milk */}
            <div style={sectionGap}>
              <span style={labelStyle}>3 — Milk</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {milks.map((m) => (
                  <button key={m.id} onClick={() => setSelectedMilk(m)} style={{ padding: "9px 18px", borderRadius: 9999, border: `1.5px solid ${selectedMilk.id === m.id ? "#C8963E" : "#EFE0C0"}`, backgroundColor: selectedMilk.id === m.id ? "#FFF8EE" : "#FDFAF4", cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: selectedMilk.id === m.id ? 500 : 400, color: "#2C1A0E" }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Extras */}
            <div style={{ marginBottom: 28 }}>
              <span style={labelStyle}>4 — Extras</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {extras.map((ex) => {
                  const active = !!selectedExtras.find((e) => e.id === ex.id);
                  return (
                    <button key={ex.id} onClick={() => toggleExtra(ex)} style={{ padding: "9px 18px", borderRadius: 9999, border: `1.5px solid ${active ? "#C8963E" : "#EFE0C0"}`, backgroundColor: active ? "#FFF8EE" : "#FDFAF4", cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: active ? 500 : 400, color: "#2C1A0E" }}>
                      {ex.label}{ex.price > 0 ? ` +₱${ex.price}` : " (free)"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty + Add */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 20, borderTop: "1px solid #EFE0C0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #EFE0C0", borderRadius: 9999, overflow: "hidden" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#2C1A0E", fontFamily: "var(--font-body)" }}>−</button>
                <span style={{ width: 32, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#2C1A0E" }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} style={{ width: 40, height: 40, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#2C1A0E", fontFamily: "var(--font-body)" }}>+</button>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8C7B6B", marginBottom: 2 }}>Item total</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "#2C1A0E" }}>₱{itemTotal}</p>
              </div>
              <button onClick={addToOrder} style={{ backgroundColor: added ? "#5C3A1E" : "#C8963E", color: "#FDFAF4", border: "none", borderRadius: 9999, padding: "14px 28px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.3s", flexShrink: 0 }}>
                {added ? "Added ✓" : "Add to Order"}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div style={{ backgroundColor: "#3D2510", borderRadius: 24, padding: "28px", position: "sticky", top: 24 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(239,224,192,0.5)", marginBottom: 20 }}>Your Order</p>
            {order.length === 0 ? (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(239,224,192,0.35)", textAlign: "center", padding: "32px 0" }}>Nothing added yet</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {order.map((item, i) => (
                  <div key={i} style={{ backgroundColor: "rgba(253,250,244,0.06)", borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "#FDFAF4" }}>{item.qty}× {item.drink.name}</p>
                      <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,224,192,0.3)", fontSize: 16, padding: 0, lineHeight: 1 }}>×</button>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(239,224,192,0.5)" }}>
                      {item.size.label} · {item.milk.label}{item.extras.length > 0 ? ` · ${item.extras.map((e) => e.label).join(", ")}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {order.length > 0 && (
              <>
                <div style={{ borderTop: "1px solid rgba(239,224,192,0.1)", paddingTop: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(239,224,192,0.5)" }}>Subtotal</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#FDFAF4" }}>₱{orderTotal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#FDFAF4" }}>Total</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "#C8963E" }}>₱{orderTotal}</span>
                  </div>
                </div>
                <button style={{ width: "100%", backgroundColor: "#C8963E", color: "#FDFAF4", border: "none", borderRadius: 9999, padding: "14px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                  Confirm Pickup Order
                </button>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(239,224,192,0.3)", textAlign: "center", marginTop: 10 }}>Ready in ~10 minutes</p>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .order-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}