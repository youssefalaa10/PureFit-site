import type React from "react";
import { ReduxProvider } from "@/components/providers/ReduxProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <main>{children}</main>
    </ReduxProvider>
  );
}
