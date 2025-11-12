"use client";

import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import CategoryGrid from "@/components/sections/CategoryGrid";
import BrandsSlider from "@/components/sections/BrandsSlider";
import Educational from "@/components/sections/Educational";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import AiFeature from "@/components/sections/AiFeature";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-hidden"
    >
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <CategoryGrid />
        <BrandsSlider />
        <Educational />
        <AiFeature />
        <Testimonials />
        <Newsletter />
      </main>
    </motion.div>
  );
}
