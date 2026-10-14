"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { ProductDetailModal } from "@/components/ui/product-detail-modal";
import {
  HeroSection,
  HighlightsSection,
  SignatureMenuSection,
  BrandStorySection,
  FranchiseTeaserSection,
  BranchTeaserSection,
  FinalCtaSection,
} from "./index";

export function HomePageContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="bg-black text-white selection:bg-[#c69255] selection:text-stone-950">
      {/* Section A: Cinematic Hero */}
      <HeroSection />

      {/* Section B: Brand Highlights */}
      <HighlightsSection />

      {/* Section C: Signature Menu Showcase */}
      <SignatureMenuSection onSelectProduct={(p) => setSelectedProduct(p)} />

      {/* Section D: Brand Story */}
      <BrandStorySection />

      {/* Section E: Franchise Opportunities Preview */}
      <FranchiseTeaserSection />

      {/* Section F: Branch Locator Teaser */}
      <BranchTeaserSection />

      {/* Section G: Final Editorial CTA */}
      <FinalCtaSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
