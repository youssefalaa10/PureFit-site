"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  const footerLinks = {
    Company: [
      { name: "About Us", href: "/#about" },
      { name: "Contact", href: "/#contact" },
    ],
    Products: [
      { name: "Programs", href: "/programs" },
      { name: "Accessories", href: "/accessories" },
      { name: "Brands", href: "/brands" },
    ],
    Support: [
      { name: "Help Center", href: "/" },
      { name: "Community", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-3xl font-bold gradient-text mb-4 block">
              <img src="/purefit-logo.ico" alt="PureFit Logo" width={58} height={58} className="rounded-xl" />
            </Link>
            <p className="text-gray-400 mb-6">
              Shaping the future of health through innovative fitness solutions and community support.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Inject Google Play badge after "Terms of Service" in Support column */}
              {category === "Support" && (
                <div className="mt-6">
                  <p className="font-semibold mb-2">Download the PureFit App</p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.annotex.PureFit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download PureFit App from Google Play"
                    title="Download PureFit App from Google Play"
                  >
                    <img
                      src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                      alt="Get it on Google Play"
                      className="h-12 w-auto"
                    />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2024 PureFit. All rights reserved.</p>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 text-gray-400">
            <span>Powered by</span>
            <a
              href="https://annotex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Annotex
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
