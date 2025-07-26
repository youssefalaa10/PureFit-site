"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Coffee,
  BarChart3,
  User,
  ChevronRight,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Detect screen size and handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Exercises", href: "/dashboard/exercises", icon: Dumbbell },
    { name: "Foods", href: "/dashboard/foods", icon: Apple },
    { name: "Drinks", href: "/dashboard/drinks", icon: Coffee },

    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
    mobile: { x: 0 },
    mobileClosed: { x: -300 },
  };

  const menuVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  const SidebarContent = () => (
    <motion.aside
      variants={sidebarVariants}
      animate={
        isMobile
          ? isMobileOpen
            ? "mobile"
            : "mobileClosed"
          : isCollapsed
          ? "collapsed"
          : "expanded"
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed md:relative z-50 h-full bg-white shadow-lg flex flex-col ${
        isMobile ? "w-80" : ""
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          {!isCollapsed && <img src="/purefit-logo.ico" alt="PureFit Logo" width={68} height={58} className="rounded-xl" />}
        </Link>
        {!isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        )}
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <motion.ul
          className="space-y-2"
          variants={menuVariants}
          initial="closed"
          animate="open"
        >
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.li key={item.name} variants={itemVariants}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-r-2 border-blue-600 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    {(!isCollapsed || isMobile) && (
                      <>
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <ChevronRight className="w-4 h-4 text-blue-600" />
                          </motion.div>
                        )}
                      </>
                    )}
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* User Info */}
      {(!isCollapsed || isMobile) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t"
        >
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Youssef Alaa</p>
              <p className="text-sm text-gray-500">Premium Member</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg md:hidden"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      )}

      {/* Sidebar */}
      <SidebarContent />
    </>
  );
}
