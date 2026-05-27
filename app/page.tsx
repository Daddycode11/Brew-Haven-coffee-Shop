import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedDrinks from "@/components/FeaturedDrinks";
import MenuSection from "@/components/MenuSection";
import OnlineOrderSection from "@/components/OnlineOrderSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LoyaltySection from "@/components/LoyaltySection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedDrinks />
      <MenuSection />
      <OnlineOrderSection />
      <AboutSection />
      <TestimonialsSection />
      <LoyaltySection />
      <EventsSection />
      <GallerySection />
      <NewsletterSection />
      <ContactSection />
    </main>
  );
}