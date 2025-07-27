import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import LayoutProvider from "@/components/providers/LayoutProvider";
import ErrorBoundary from "@/components/providers/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PureFit",
  description:
    "PureFit is a platform for fitness enthusiasts to find the best equipment, programs, and personalized nutrition.",
  icons: {
    icon: "/purefit-logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ReduxProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
