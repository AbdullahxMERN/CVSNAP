'use client';

import Loader from '@/components/landing/Loader';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import TrustBanner from '@/components/landing/TrustBanner';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff4c2] text-black overflow-x-hidden selection:bg-[#ff64d5] selection:text-white">
      <Loader />
      {/* 1. The Navbar */}
      <Navbar />

      {/* 2. The Hero Section */}
      <Hero />

      {/* 3. The Trust Banner */}
      <TrustBanner />

      {/* 4. Template Showcase Section */}
      <TemplateShowcase />

      {/* 5. The Pricing Section */}
      <Pricing />

      {/* 6. FAQ Section */}
      <FAQ />

      {/* 7. Final Footer CTA */}
      <Footer />
    </main>
  );
}
