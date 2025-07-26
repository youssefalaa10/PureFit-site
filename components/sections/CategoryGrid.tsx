"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CategoryGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = [
    {
      title: "Accessories",
      description: "Premium gear for every workout",
      image: "https://images.unsplash.com/photo-1685633225097-10c8f8e6e889?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fEFjY2Vzc29yaWVzJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/accessories",
    },
    {
      title: "Equipment",
      description: "Professional-grade fitness equipment",
      image: "https://images.unsplash.com/photo-1597076545399-91a3ff0e71b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RXF1aXBtZW50JTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/equipment",
    },
    {
      title: "Nutrition",
      description: "Fuel your body with the best",
      image: "https://images.unsplash.com/photo-1511909525232-61113c912358?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TnV0cml0aW9uJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/nutrition",
    },
    {
      title: "Apparel",
      description: "Comfortable and stylish activewear",
      image: "https://images.unsplash.com/photo-1619037961380-5ab533fc7129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFjY2Vzc29yaWVzJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
      href: "/apparel",
    },
  ]

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
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover everything you need to elevate your fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 p-8 text-white"
                  >
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-200">{category.description}</p>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
