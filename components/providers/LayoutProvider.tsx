"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const isAuthPage =
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/register") ||
    currentPath.startsWith("/signup");

  const isDashboardPage = currentPath.startsWith("/dashboard");

  const shouldHideHeaderFooter = isAuthPage || isDashboardPage;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  // Prevent hydration mismatch and ensure stable rendering
  if (!mounted) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <div className="hidden">
          <Header />
        </div>
        <main className="overflow-x-hidden">{children}</main>
        <div className="hidden">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className={shouldHideHeaderFooter ? "hidden" : "block"}>
        <Header />
      </div>
      <main className="overflow-x-hidden">{children}</main>
      <div className={shouldHideHeaderFooter ? "hidden" : "block"}>
        <Footer />
      </div>
    </div>
  );
}
