"use client"

import { useState } from "react";
import CatalogPreview from "@/components/AllLotions";
import BlockchainDeliverySection from "@/components/Delivery";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import DevelopmentBanner from "@/components/TopAlert";

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      <DevelopmentBanner onClose={() => setBannerVisible(false)} />
      <NavBar bannerVisible={bannerVisible} />
      <div className="pt-20 sm:pt-24"> {/* Evita que el contenido quede detrás */}
        <HeroSection />
        <CatalogPreview />
        <BlockchainDeliverySection />
        <Footer />
      </div>
    </>
  );
}
