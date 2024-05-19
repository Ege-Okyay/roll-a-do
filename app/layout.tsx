// Import types and styles
import type { Metadata } from "next";
import "./globals.css";

// Import components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Define app metadata
export const metadata: Metadata = {
  title: "Roll a Do",
  description: "Turn your to-do list into a roll of the dice! Add tasks, shake 'em up, and let fate decide what to tackle next.",
  creator: "Ege Okyay",
};

// Main layout component
export default function RootLayout({
  children, // Nested components
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />   {/* Top navigation */}
        {children}   {/* Main content */}
        <Footer />   {/* Bottom footer */}
      </body>
    </html>
  );
}
