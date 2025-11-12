"use client";

import { motion } from "framer-motion";
import { Bell, Search, Sun, Moon, Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logoutUser } from "@/lib/slices/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function DashboardHeader({
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b px-3 sm:px-4 md:px-6 py-3 sm:py-4"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 min-w-0 flex-1">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMobileMenuToggle}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 md:space-x-4 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 truncate hidden sm:block">
              Welcome back, {user?.email?.split("@")[0] || "Youssef Alaa"}!
            </p>
            <p className="text-xs text-gray-500 truncate sm:hidden">
              Welcome back!
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 flex-shrink-0">
          {/* Search - Hidden on mobile, compact on tablet */}
          <div className="hidden md:block relative">
            <Search className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 md:w-4 md:h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base w-32 lg:w-48 xl:w-64"
            />
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </motion.button>

          {/* Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full p-0 flex-shrink-0"
                aria-label="User menu"
              >
                <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs sm:text-sm">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => dispatch(logoutUser())}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-sm">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
