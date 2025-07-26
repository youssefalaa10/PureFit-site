"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, ShoppingCart, Star, Award, Zap, Shield, Users } from "lucide-react"


// Mock product data
const accessories = [
  {
    id: 1,
    name: "Resistance Bands Set",
    description: "Premium latex resistance bands with multiple resistance levels",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Bands"
  },
  {
    id: 2,
    name: "Workout Gloves",
    description: "Breathable gym gloves with superior grip and wrist support",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1594737626072-90dc274bc2ff?w=400&h=300&fit=crop",
    category: "Gloves"
  },
  {
    id: 3,
    name: "Lifting Straps",
    description: "Heavy-duty cotton lifting straps for maximum grip strength",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    category: "Straps"
  },
  {
    id: 4,
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and mobility",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    category: "Recovery"
  },
  {
    id: 5,
    name: "Jump Rope",
    description: "Adjustable speed rope with ball bearings for smooth rotation",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Cardio"
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Non-slip premium yoga mat with alignment lines",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1506629905607-53e103a0265d?w=400&h=300&fit=crop",
    category: "Yoga"
  },
  {
    id: 7,
    name: "Wrist Wraps",
    description: "Adjustable wrist wraps for heavy lifting support",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Support"
  },
  {
    id: 8,
    name: "Gym Towel",
    description: "Ultra-absorbent microfiber gym towel with clip attachment",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    category: "Essentials"
  }
]

const features = [
  {
    icon: Shield,
    title: "Durability",
    description: "Built to withstand intense training sessions"
  },
  {
    icon: Award,
    title: "Design",
    description: "Sleek, modern aesthetics meet functionality"
  },
  {
    icon: Zap,
    title: "Portability",
    description: "Lightweight and travel-friendly equipment"
  },
  {
    icon: Users,
    title: "Trainer-Approved",
    description: "Recommended by certified fitness professionals"
  }
]

const categories = ["All", "Bands", "Gloves", "Straps", "Recovery", "Cardio", "Yoga", "Support", "Essentials"]

export default function AccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const filteredAccessories = selectedCategory === "All" 
    ? accessories 
    : accessories.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 z-10" />
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop"
            alt="Gym Accessories"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div style={{ opacity }} className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Gear Up for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Greatness</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto"
          >
            Browse our handpicked selection of top-tier gym accessories designed to elevate your workout experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              <span>View All Categories</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        />

        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-20 w-16 h-16 bg-green-500/20 rounded-full blur-lg"
        />
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAccessories.map((accessory, index) => (
              <ProductCard key={accessory.id} accessory={accessory} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Accessories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every piece of equipment is carefully selected for quality, durability, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Upgrade Your Workout?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join thousands of fitness enthusiasts who trust our premium accessories for their training needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Shop All Accessories
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ accessory, index }: { accessory: any, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={accessory.image}
          alt={accessory.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
            {accessory.category}
          </span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{accessory.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{accessory.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{accessory.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -5 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 group-hover:shadow-lg transition-shadow duration-300"
      >
        <feature.icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  )
}