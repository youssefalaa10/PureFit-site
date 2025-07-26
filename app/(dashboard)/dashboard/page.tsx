"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Activity,
  Target,
  Calendar,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Workouts",
      value: "1,234",
      change: "+12.5%",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8.2%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Calories Burned",
      value: "45,678",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Goals Achieved",
      value: "67",
      change: "+23.1%",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentActivities = [
    {
      name: "Morning Cardio",
      time: "2 hours ago",
      type: "Cardio",
      duration: "45 min",
    },
    {
      name: "Strength Training",
      time: "4 hours ago",
      type: "Strength",
      duration: "60 min",
    },
    {
      name: "Yoga Session",
      time: "1 day ago",
      type: "Flexibility",
      duration: "30 min",
    },
    {
      name: "HIIT Workout",
      time: "2 days ago",
      type: "Cardio",
      duration: "25 min",
    },
  ];

  const goals = [
    { name: "Weekly Workouts", current: 4, target: 5, progress: 80 },
    { name: "Calories Burned", current: 2800, target: 3500, progress: 70 },
    { name: "Steps Taken", current: 8500, target: 10000, progress: 85 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, Youssef Alaa! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your fitness journey today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>
                Your latest workout sessions and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.type} • {activity.duration}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals Progress */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Weekly Goals</span>
              </CardTitle>
              <CardDescription>
                Track your progress towards this week's targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {goal.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Start a new workout or track your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Activity className="w-6 h-6 text-blue-600" />
                <span className="font-medium">Start Workout</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <Calendar className="w-6 h-6 text-green-600" />
                <span className="font-medium">Schedule Session</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <Award className="w-6 h-6 text-purple-600" />
                <span className="font-medium">View Achievements</span>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
