"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dumbbell,
  Heart,
  Target,
  TrendingUp,
  Star,
  Users,
  Award,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const brands = [
  {
    id: 1,
    name: "PureFit Pro",
    category: "Equipment",
    rating: 4.8,
    users: "50K+",
    description: "Premium fitness equipment for serious athletes",
    features: ["Durable", "Professional", "Warranty"],
    icon: Dumbbell,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "VitalCore",
    category: "Supplements",
    rating: 4.6,
    users: "30K+",
    description: "Natural supplements for optimal performance",
    features: ["Natural", "Certified", "Effective"],
    icon: Heart,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "EliteGear",
    category: "Apparel",
    rating: 4.9,
    users: "75K+",
    description: "High-performance athletic wear",
    features: ["Moisture-wicking", "Comfortable", "Stylish"],
    icon: Target,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "PowerFuel",
    category: "Nutrition",
    rating: 4.7,
    users: "40K+",
    description: "Advanced nutrition for peak performance",
    features: ["Science-backed", "Clean", "Results"],
    icon: TrendingUp,
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "FlexTech",
    category: "Technology",
    rating: 4.5,
    users: "25K+",
    description: "Smart fitness tracking and analytics",
    features: ["AI-powered", "Accurate", "User-friendly"],
    icon: Zap,
    color: "bg-indigo-500",
  },
  {
    id: 6,
    name: "GuardianFit",
    category: "Safety",
    rating: 4.8,
    users: "35K+",
    description: "Safety equipment for all fitness levels",
    features: ["Certified", "Reliable", "Comprehensive"],
    icon: Shield,
    color: "bg-red-500",
  },
];

const features = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "All brands meet our strict quality standards",
  },
  {
    icon: Users,
    title: "Community Trusted",
    description: "Loved by thousands of fitness enthusiasts",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in fitness",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Available worldwide with local support",
  },
];

export default function BrandsPage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Trusted
            <span className="gradient-text"> Fitness Brands</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Discover premium fitness brands that power your journey to health
            and wellness. Each partner is carefully selected for quality,
            innovation, and results.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Brands Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Featured Partners
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our carefully curated selection of premium fitness brands that
              deliver exceptional quality and results for every fitness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 ${brand.color} rounded-lg flex items-center justify-center`}
                      >
                        <brand.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">
                          {brand.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{brand.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {brand.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Category</span>
                        <Badge variant="secondary">{brand.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Active Users
                        </span>
                        <span className="font-medium">{brand.users}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">
                          Key Features
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {brand.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Transform Your Fitness?
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of fitness enthusiasts who trust our partner
                brands to achieve their health and wellness goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="glass-effect">
                  Explore All Brands
                </Button>
                <Button size="lg" variant="outline">
                  Contact Partners
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
