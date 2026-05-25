// app/layout.tsx
import type { Metadata } from "next";
import "./global.css";
import SessionProviderWrapper from "./providers";

export const metadata: Metadata = {
  title: "LogiTrack - Smart Logistics",
  description: "Delivery Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}