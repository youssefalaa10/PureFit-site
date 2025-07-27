"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/signup");

  return (
    <>
      {!isAuthPage && <Header />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
}
