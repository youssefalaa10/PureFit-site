"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1652911366117-cbbab4ed43f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGd5bSUyMGJhY2tncm91bmQlMjBsYW5kc2NhcGUlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1586085184491-37fa04f6ec6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGd5bSUyMGJhY2tncm91bmQlMjBsYW5kc2NhcGUlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1586085184491-37fa04f6ec6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGd5bSUyMGJhY2tncm91bmQlMjBsYW5kc2NhcGUlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDB8fDB8fHww"
          alt="Fitness Background"
          fill
          className="object-cover"
          priority
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
          Shaping the <span className="gradient-text">Future</span> of Health
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          Transform your fitness journey with premium equipment, expert programs, and personalized nutrition guidance.
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
            className="flex items-center space-x-2 bg-black hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 glass-effect text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
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
    </section>
  )
}
