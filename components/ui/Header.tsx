"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, User, ShoppingBag, Search } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("header")) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Accessories", href: "/accessories" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <>
      {/* Mobile Overlay - Outside header container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            style={{ top: "56px" }}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white/80 backdrop-blur-md"
        } border-b border-gray-200`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg sm:text-xl md:text-2xl font-bold gradient-text flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0"
            >
              <img
                src="/purefit-logo.ico"
                alt="PureFit Logo"
                width={32}
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full"
              />
              <span className="hidden sm:inline text-black text-sm sm:text-base md:text-lg">
                PureFit
              </span>
            </Link>

            {/* Desktop Navigation - Show on md screens and up */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm md:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded-md hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions - Show on md screens and up */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-1.5 md:space-x-2 bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden lg:inline">Login</span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile/Tablet Actions - Show on screens smaller than md */}
            <div className="flex md:hidden items-center space-x-1 sm:space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 sm:p-2 rounded-full bg-black text-white hover:bg-blue-700 transition-colors"
                  aria-label="Login"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
              {/* Mobile Menu Button */}
              <button
                className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors ml-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden border-t border-gray-200 overflow-hidden relative z-50 bg-white"
              >
                <nav className="py-2 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="block py-2.5 sm:py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors font-medium text-base sm:text-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  {/* Mobile Login Button */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: navItems.length * 0.05,
                      duration: 0.2,
                    }}
                    className="pt-2 px-4 pb-2"
                  >
                    <Link
                      href="/login"
                      className="block py-2.5 sm:py-3 px-4 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center text-base sm:text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
