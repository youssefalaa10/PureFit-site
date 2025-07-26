"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Target, Users, Award, Zap, ArrowRight, CheckCircle, Sparkles, Heart, Rocket, Flame } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const sectionRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  const values = [
    {
      icon: Target,
      title: "Precision Training",
      description: "Scientific precision to maximize results and minimize injury risk.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      accent: "text-blue-600",
      particles: [
        { icon: Sparkles, delay: 0, x: 10, y: -10 },
        { icon: Rocket, delay: 0.2, x: -15, y: 5 }
      ]
    },
    {
      icon: Users,
      title: "Community Driven", 
      description: "Join thousands who support and motivate each other daily.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      accent: "text-purple-600",
      particles: [
        { icon: Heart, delay: 0.1, x: -8, y: -12 },
        { icon: Users, delay: 0.3, x: 12, y: 8 }
      ]
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Learn from certified trainers with years of experience.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      accent: "text-orange-600",
      particles: [
        { icon: Award, delay: 0.15, x: 15, y: -8 },
        { icon: Flame, delay: 0.25, x: -10, y: 12 }
      ]
    },
    {
      icon: Zap,
      title: "Smart Technology",
      description: "AI-powered tools to track progress and optimize performance.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      accent: "text-green-600",
      particles: [
        { icon: Zap, delay: 0.05, x: -12, y: -15 },
        { icon: Sparkles, delay: 0.35, x: 8, y: 10 }
      ]
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Members", icon: Users, color: "text-blue-600" },
    { number: "98%", label: "Success Rate", icon: Target, color: "text-green-600" },
    { number: "500+", label: "Expert Trainers", icon: Award, color: "text-purple-600" },
    { number: "4.9", label: "App Rating", icon: Sparkles, color: "text-orange-600" }
  ]

  // Animated counter hook
  const useCounter = (end: string | number, duration = 2000, startTrigger = false) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      if (!startTrigger) return
      
      let startTime: number | null = null
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        if (typeof end === 'string') {
          const numEnd = parseInt(end.replace(/[^\d]/g, ''))
          setCount(Math.floor(numEnd * progress))
        } else {
          setCount(Math.floor(end * progress))
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [end, duration, startTrigger])
    
    return count
  }

  return (
    <section id="about" ref={sectionRef} className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium mb-6 border border-blue-200/50"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Transforming Lives Since 2020
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
          >
            About{" "}
            <motion.span
              initial={{ backgroundSize: "0% 100%" }}
              animate={isInView ? { backgroundSize: "100% 100%" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative"
              style={{
                backgroundImage: "linear-gradient(90deg, #2563eb, #9333ea, #ec4899)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%"
              }}
            >
              PureFit
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            We believe fitness is not just about physical transformation—it's about building confidence, discipline, and
            a lifestyle that empowers you to achieve your greatest potential.
          </motion.p>

          {/* <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7, type: "spring", bounce: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 shadow-xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Learn More</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 relative z-10" />
            </motion.div>
          </motion.button> */}
        </motion.div>

        {/* Enhanced Stats with Animated Counters */}
        <motion.div
          ref={statsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Counter = ({ stat, index, statsInView }: { stat: any, index: number, statsInView: boolean }) => {
              const count = useCounter(stat.number, 2000, statsInView)
              const formatCount = (num: number) => {
                if (stat.number.includes('K')) return `${num}K+`
                if (stat.number.includes('%')) return `${num}%`
                if (stat.number.includes('.')) return `${(num/10).toFixed(1)}`
                return `${num}+`
              }
              
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  animate={statsInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  className="text-center group cursor-pointer perspective-1000"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-gray-100`}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </motion.div>
                  
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                    animate={statsInView ? { 
                      scale: 1.1,
                      rotateZ: 5
                    } : {
                      scale: 1,
                      rotateZ: 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2 + 1,
                      type: "spring",
                      bounce: 0.4
                    }}
                  >
                    {statsInView ? formatCount(count) : '0'}
                  </motion.div>
                  
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              )
            }
            
            return <Counter key={stat.label} stat={stat} index={index} statsInView={statsInView} />
          })}
        </motion.div>

        {/* Enhanced Values Grid with Particle Effects */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1, 
                delay: index * 0.2,
                type: "spring",
                bounce: 0.3
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5
              }}
              onHoverStart={() => setHoveredCard(index as any)}
              onHoverEnd={() => setHoveredCard(null as any)}
              className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center group border border-gray-100 perspective-1000 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Floating Particles */}
              {hoveredCard === index && value.particles.map((particle, pIndex) => (
                <motion.div
                  key={pIndex}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: 0,
                    y: 0
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: particle.x,
                    y: particle.y,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 2,
                    delay: particle.delay,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className={`absolute top-4 right-4 ${value.accent}`}
                >
                  <particle.icon className="w-4 h-4" />
                </motion.div>
              ))}

              {/* Icon with Enhanced Animation */}
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  y: -10
                }}
                animate={{
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  rotate: { 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className={`relative z-10 w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-500`}
              >
                <value.icon className="w-10 h-10 text-white" />
                
                {/* Pulsing Ring */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color}`}
                  animate={hoveredCard === index ? {
                    scale: 1.2,
                    opacity: 0
                  } : {
                    scale: 1,
                    opacity: 0.5
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <motion.h3 
                className="relative z-10 text-xl font-bold mb-4 text-gray-900"
                animate={hoveredCard === index ? {
                  scale: 1.05
                } : {
                  scale: 1
                }}
                transition={{ duration: 0.5 }}
              >
                {value.title}
              </motion.h3>

              <motion.p 
                className="relative z-10 text-gray-600 text-sm leading-relaxed"
                animate={hoveredCard === index ? {
                  y: -2
                } : {
                  y: 0
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {value.description}
              </motion.p>

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={hoveredCard === index ? { 
                  x: "200%" 
                } : { 
                  x: "-100%" 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Floating Elements */}
        <motion.div
          animate={{
            y: [-20, 0],
            rotate: [0, 10],
            scale: [1, 1.1]
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-lg pointer-events-none"
        />
        
        <motion.div
          animate={{
            y: [0, 25],
            rotate: [0, -15],
            scale: [1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-lg pointer-events-none"
        />

        <motion.div
          animate={{
            y: [-15, 0],
            x: [0, 10],
            rotate: [0, 5]
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-full blur-lg pointer-events-none"
        />
      </div>
    </section>
  )
}