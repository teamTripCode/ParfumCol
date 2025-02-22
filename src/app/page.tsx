"use client"

import { useState } from "react";
import CatalogPreview from "@/components/AllLotions";
import BlockchainDeliverySection from "@/components/Delivery";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

export default function Home() {


  return (
    <>
      <NavBar />
      <div className="pt-20 sm:pt-24"> {/* Evita que el contenido quede detrás */}
        <HeroSection />
        <CatalogPreview />
        <BlockchainDeliverySection />
        <Footer />
      </div>
    </>
  );
}
