'use client';

import { useEffect, useState } from 'react';
import { ChromeNav } from '@/components/client/furtif/ChromeNav';
import { HeroSection } from '@/components/client/furtif/HeroSection';
import { ActCar } from '@/components/client/furtif/ActCar';
import { ActWash } from '@/components/client/furtif/ActWash';
import { ActLight } from '@/components/client/furtif/ActLight';
import { Footer } from '@/components/client/furtif/Footer';
import { OrganicLoader } from '@/components/ui/OrganicLoader';

export default function FurtifPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading to show off Claude's organic loader
    const t = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#F4F2ED]">
        <OrganicLoader />
        <div className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[#8A8A85]">
          Chargement de l&apos;expérience Furtif
        </div>
      </div>
    );
  }

  return (
    <>
      <ChromeNav />
      <HeroSection />
      <ActCar />
      <ActWash />
      <ActLight />
      <Footer />
    </>
  );
}
