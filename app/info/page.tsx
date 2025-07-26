"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Calendar,
  Settings,
  HelpCircle,
  Play,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set personalized fitness goals and track your progress",
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvements with detailed analytics",
    color: "bg-green-500",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow fitness enthusiasts",
    color: "bg-purple-500",
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description: "Access your most used features instantly",
    color: "bg-orange-500",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Set up your account with personal information and fitness goals",
    icon: Users,
  },
  {
    number: "02",
    title: "Explore Dashboard",
    description: "Navigate through exercises, foods, and drinks management",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Track Progress",
    description:
      "Monitor your workouts, nutrition, and overall fitness journey",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Stay Consistent",
    description: "Use our tools to maintain your fitness routine",
    icon: Calendar,
  },
];

const tips = [
  {
    icon: Lightbulb,
    title: "Start Small",
    description: "Begin with manageable goals and gradually increase intensity",
  },
  {
    icon: CheckCircle,
    title: "Be Consistent",
    description: "Regular tracking leads to better results and motivation",
  },
  {
    icon: Settings,
    title: "Customize Your Experience",
    description: "Adjust settings to match your preferences and needs",
  },
  {
    icon: HelpCircle,
    title: "Ask for Help",
    description: "Use our support system when you need assistance",
  },
];

const faqs = [
  {
    question: "How do I add a new exercise?",
    answer:
      "Navigate to the Exercises page, click 'Add Exercise', fill in the details, and save. You can also edit existing exercises using the dropdown menu.",
  },
  {
    question: "Can I track my nutrition?",
    answer:
      "Yes! Use the Foods page to log your meals and track calories, protein, carbs, and fat. The Drinks page helps you monitor hydration.",
  },
  {
    question: "How do I update my profile?",
    answer:
      "Go to the Profile page and click 'Edit Profile'. You can update personal information, fitness goals, and preferences.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and security measures to protect your personal information and fitness data.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Currently, data export features are in development. You can view all your information in the dashboard.",
  },
  {
    question: "How often should I update my progress?",
    answer:
      "We recommend updating your progress daily for the best tracking experience, but you can update as frequently as you prefer.",
  },
];

export default function InfoPage() {
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
            Dashboard
            <span className="gradient-text"> Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Learn how to make the most of your PureFit dashboard. Discover
            features, tips, and best practices to optimize your fitness journey.
          </motion.p>
        </div>
      </motion.div>

      {/* Features Overview */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive fitness management platform with powerful tools
              for tracking exercises, nutrition, and progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
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

      {/* Getting Started Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Getting Started
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to set up your fitness journey and start
              tracking your progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {step.number}
                          </Badge>
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Pro Tips for Success
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Maximize your fitness journey with these expert recommendations
              and best practices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about using the dashboard
              effectively.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center space-x-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground pl-6">
                        {faq.answer}
                      </p>
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
        transition={{ duration: 0.8, delay: 3.0 }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground text-lg">
                Now that you understand the dashboard, it's time to put your
                knowledge into action and achieve your fitness goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="glass-effect">
                  <Play className="mr-2 h-4 w-4" />
                  Start Using Dashboard
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
