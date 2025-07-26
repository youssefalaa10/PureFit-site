"use client"

import { motion } from "framer-motion"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import CategoryGrid from "@/components/sections/CategoryGrid"
import BrandsSlider from "@/components/sections/BrandsSlider"
import Educational from "@/components/sections/Educational"
import Testimonials from "@/components/sections/Testimonials"
import Newsletter from "@/components/sections/Newsletter"
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import AiFeature from "@/components/sections/AiFeature"

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Header />
      <main>
        <Hero />
        <About />
        <CategoryGrid />
        <BrandsSlider />
        <Educational />
        <AiFeature />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </motion.div>
  )
}
