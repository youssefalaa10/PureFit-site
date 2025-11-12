"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function BrandsSlider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; opacity: number }>
  >([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (hoveredBrand === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    }
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setParticles(newParticles);
  };

  useEffect(() => {
    if (hoveredBrand !== null) {
      createParticles();
      const interval = setInterval(createParticles, 2000);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [hoveredBrand]);

  const brands = [
    {
      name: "Nike",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
      mission: "Just Do It - Inspiring athletes worldwide",
      color: "from-orange-500 via-red-500 to-pink-500",
      bgPattern:
        "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      accent: "#FF6B35",
      particles: "🏃‍♂️💨⚡",
    },
    {
      name: "Adidas",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
      mission: "Impossible is Nothing - Performance innovation",
      color: "from-blue-600 via-indigo-600 to-purple-600",
      bgPattern:
        "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      accent: "#0066CC",
      particles: "⚽🏆🔥",
    },
    {
      name: "Under Armour",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/1280px-Under_armour_logo.svg.png",
      mission: "I Will - Protecting athletes everywhere",
      color: "from-gray-800 via-gray-900 to-black",
      bgPattern:
        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
      accent: "#1D1D1B",
      particles: "🛡️💪🎯",
    },
    {
      name: "Puma",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
      mission: "Forever Faster - Speed and style combined",
      color: "from-yellow-400 via-orange-500 to-red-500",
      bgPattern:
        "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      accent: "#FFD700",
      particles: "🐆💨⚡",
    },
    {
      name: "Reebok",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png",
      mission: "Be More Human - Fitness for everyone",
      color: "from-red-500 via-pink-500 to-rose-500",
      bgPattern:
        "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      accent: "#CE1141",
      particles: "🏋️‍♀️❤️🌟",
    },
    {
      name: "New Balance",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png",
      mission: "Endorsed by No One - Crafted for athletes",
      color: "from-emerald-500 via-teal-500 to-blue-500",
      bgPattern:
        "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      accent: "#009639",
      particles: "👟🔧✨",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent px-2"
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shop by{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Brand
            </span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Partner with the world's most innovative fitness brands
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              className="relative group"
              onMouseEnter={() => setHoveredBrand(index)}
              onMouseLeave={() => {
                setHoveredBrand(null);
                setMousePosition({ x: 0, y: 0 });
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <motion.div
                whileHover={{
                  scale: 1.12,
                  rotateY: hoveredBrand === index ? mousePosition.x * 0.5 : 5,
                  rotateX: hoveredBrand === index ? -mousePosition.y * 0.3 : 0,
                  z: 50,
                  boxShadow:
                    hoveredBrand === index
                      ? `0 25px 50px -12px ${brand.accent}40, 0 0 0 1px ${brand.accent}20`
                      : "0 10px 25px -5px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotateY: hoveredBrand === index ? mousePosition.x * 0.5 : 0,
                  rotateX: hoveredBrand === index ? -mousePosition.y * 0.3 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white/90 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer relative overflow-hidden border border-white/30 transition-all duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  background:
                    hoveredBrand === index
                      ? `linear-gradient(135deg, ${brand.color
                          .replace("from-", "")
                          .replace("via-", ", ")
                          .replace("to-", ", ")})`
                      : undefined,
                }}
              >
                {/* Animated particles */}
                {hoveredBrand === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {particles.map((particle, i) => (
                      <motion.div
                        key={particle.id}
                        className="absolute text-2xl"
                        style={{
                          left: `${particle.x}%`,
                          top: `${particle.y}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, particle.opacity, 0],
                          y: [-10, -30, -50],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        {brand.particles[i % 3]}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Ripple effect */}
                {hoveredBrand === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${brand.accent}20 0%, transparent 70%)`,
                    }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50 rounded-2xl"></div>

                {/* Brand logo */}
                <motion.div
                  className="relative z-10 flex items-center justify-center h-12 sm:h-16 md:h-20 mb-2 sm:mb-3 md:mb-4"
                  animate={{
                    scale: hoveredBrand === index ? 1.2 : 1,
                    rotateY: hoveredBrand === index ? mousePosition.x * 0.3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-500"
                    style={{
                      filter:
                        hoveredBrand === index
                          ? "brightness(1.3) contrast(1.2) drop-shadow(0 8px 16px rgba(0,0,0,0.3))"
                          : "brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                    animate={{
                      y: hoveredBrand === index ? -5 : 0,
                    }}
                  />

                  {/* Logo glow effect */}
                  {hoveredBrand === index && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `radial-gradient(circle, ${brand.accent}30 0%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Brand name - always visible */}
                <motion.div
                  className="relative z-10 text-center"
                  animate={{
                    y: hoveredBrand === index ? -5 : 0,
                    scale: hoveredBrand === index ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h3
                    className="font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
                    style={{
                      color: hoveredBrand === index ? "white" : "#374151",
                    }}
                  >
                    {brand.name}
                  </h3>

                  {/* Animated underline */}
                  {hoveredBrand === index && (
                    <motion.div
                      className="h-0.5 bg-white mt-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>

                {/* Hover overlay with mission */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                  animate={{
                    opacity: hoveredBrand === index ? 1 : 0,
                    scale: hoveredBrand === index ? 1 : 0.8,
                    rotateX: hoveredBrand === index ? 0 : -90,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="absolute inset-0 p-6 flex items-center justify-center text-center rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${brand.color
                      .replace("from-", "")
                      .replace("via-", ", ")
                      .replace("to-", ", ")}), ${brand.bgPattern}`,
                    transformOrigin: "bottom",
                  }}
                >
                  {/* Dynamic background shapes */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                          width: `${20 + i * 10}px`,
                          height: `${20 + i * 10}px`,
                          left: `${20 + i * 15}%`,
                          top: `${10 + i * 20}%`,
                        }}
                        animate={{
                          scale: hoveredBrand === index ? [1, 1.5, 1] : 1,
                          rotate: hoveredBrand === index ? [0, 180, 360] : 0,
                          opacity: hoveredBrand === index ? [0.3, 0.6, 0.3] : 0,
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.2,
                          repeat: hoveredBrand === index ? Infinity : 0,
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-white relative z-10">
                    <motion.h3
                      className="font-black text-xl mb-3 drop-shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredBrand === index ? 0 : 20,
                        opacity: hoveredBrand === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {brand.name}
                    </motion.h3>
                    <motion.p
                      className="text-sm font-medium opacity-90 leading-relaxed drop-shadow-sm"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredBrand === index ? 0 : 20,
                        opacity: hoveredBrand === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {brand.mission}
                    </motion.p>

                    {/* Mission accent line */}
                    <motion.div
                      className="w-12 h-1 bg-white rounded-full mx-auto mt-4"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: hoveredBrand === index ? 48 : 0,
                        opacity: hoveredBrand === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Enhanced glow effect */}
                <motion.div
                  className="absolute -inset-2 rounded-2xl blur-lg opacity-0 transition-opacity duration-500"
                  style={{
                    background:
                      hoveredBrand === index
                        ? `linear-gradient(135deg, ${brand.accent}40, ${brand.accent}20)`
                        : `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))`,
                  }}
                  animate={{
                    opacity: hoveredBrand === index ? 0.6 : 0,
                    scale: hoveredBrand === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Magnetic field effect */}
                {hoveredBrand === index && (
                  <motion.div
                    className="absolute -inset-4 rounded-3xl"
                    style={{
                      background: `conic-gradient(from 0deg, ${brand.accent}10, transparent, ${brand.accent}10)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
          >
            Explore All Brands
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
