"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"


import { Clock, Users, Star, Filter } from "lucide-react"

export default function Programs() {
  const [selectedFilter, setSelectedFilter] = useState("All")

  const filters = ["All", "Beginner", "Intermediate", "Advanced", "Strength", "Cardio", "Flexibility"]

  const programs = [
    {
      id: 1,
      title: "Full Body Strength",
      description: "Build muscle and strength with compound movements",
      image: "/placeholder.svg?height=300&width=400",
      duration: "45 mins",
      level: "Intermediate",
      participants: 1250,
      rating: 4.8,
      category: "Strength",
    },
    {
      id: 2,
      title: "HIIT Cardio Blast",
      description: "High-intensity interval training for maximum calorie burn",
      image: "/placeholder.svg?height=300&width=400",
      duration: "30 mins",
      level: "Advanced",
      participants: 890,
      rating: 4.9,
      category: "Cardio",
    },
    {
      id: 3,
      title: "Yoga Flow",
      description: "Improve flexibility and mindfulness with flowing movements",
      image: "/placeholder.svg?height=300&width=400",
      duration: "60 mins",
      level: "Beginner",
      participants: 2100,
      rating: 4.7,
      category: "Flexibility",
    },
    {
      id: 4,
      title: "Powerlifting Basics",
      description: "Master the big three: squat, bench, and deadlift",
      image: "/placeholder.svg?height=300&width=400",
      duration: "90 mins",
      level: "Intermediate",
      participants: 650,
      rating: 4.9,
      category: "Strength",
    },
    {
      id: 5,
      title: "Morning Mobility",
      description: "Start your day with gentle stretches and movement",
      image: "/placeholder.svg?height=300&width=400",
      duration: "20 mins",
      level: "Beginner",
      participants: 1800,
      rating: 4.6,
      category: "Flexibility",
    },
    {
      id: 6,
      title: "Athletic Performance",
      description: "Sport-specific training for competitive athletes",
      image: "/placeholder.svg?height=300&width=400",
      duration: "75 mins",
      level: "Advanced",
      participants: 420,
      rating: 4.8,
      category: "Strength",
    },
  ]

  const filteredPrograms =
    selectedFilter === "All"
      ? programs
      : programs.filter((program) => program.level === selectedFilter || program.category === selectedFilter)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
 

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Fitness <span className="text-yellow-400">Programs</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Discover expertly crafted workout programs designed to help you achieve your fitness goals
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">All Programs</h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Filter by:</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedFilter === filter ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          program.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : program.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {program.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{program.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{program.rating}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Start Program
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

  
    </motion.div>
  )
}
