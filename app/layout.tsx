import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "LogiTrack - Smart Logistics",
  description: "Delivery Management System",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}