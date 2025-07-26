"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Play, BookOpen } from "lucide-react"

export default function Educational() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Educational <span className="gradient-text">Highlights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Master the fundamentals with expert guidance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Train Smarter */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
                  alt="Train Smarter"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </motion.button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">Train Smarter</h3>
                <p className="text-gray-200 mb-4">
                  Learn proper form, technique, and progressive overload principles to maximize your workout efficiency
                  and prevent injuries.
                </p>
                <div className="flex items-center space-x-2 text-blue-300">
                  <BookOpen className="w-5 h-5" />
                  <span>15 Video Lessons</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Eat Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop"
                  alt="Eat Right"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </motion.button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">Eat Right</h3>
                <p className="text-gray-200 mb-4">
                  Discover the science of nutrition, meal planning, and how to fuel your body for optimal performance
                  and recovery.
                </p>
                <div className="flex items-center space-x-2 text-green-300">
                  <BookOpen className="w-5 h-5" />
                  <span>12 Nutrition Guides</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
