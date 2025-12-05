import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CartSidebar from "@/components/shared/CartSidebar";
import { CartProvider } from "@/context/CartContext";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Candle Elementals | Premium Handcrafted Candles",
  description: "Experience the luxury of 100% Soy Wax and IFRA-Certified Premium Fragrance candles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cinzel.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
