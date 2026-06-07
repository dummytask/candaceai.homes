import NavBar from "@/components/sections/NavBar";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import ProductDesign from "@/components/sections/ProductDesign";
import ScrollCinematic from "@/components/sections/ScrollCinematic";
import Compliance from "@/components/sections/Compliance";
import LiveLedger from "@/components/sections/LiveLedger";
import OwnershipModel from "@/components/sections/OwnershipModel";
import ProductGallery from "@/components/sections/ProductGallery";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen">
      <NavBar />
      <Hero />
      <Capabilities />
      <ProductDesign />
      <ScrollCinematic />
      <Compliance />
      <LiveLedger />
      <OwnershipModel />
      <ProductGallery />
      <FooterSection />
    </main>
  );
}
