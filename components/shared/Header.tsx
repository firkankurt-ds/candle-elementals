"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";


const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Explore", href: "/explore" },
    { name: "Workshops", href: "/workshops" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartOpen, setCartOpen, items } = useCart();
    const pathname = usePathname();

    // Check if we are on the home page
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine text color class based on state
    // Scrolled: Foreground (Dark)
    // Not Scrolled & Home: White/Light
    // Not Scrolled & Not Home: Foreground (Dark)
    const textColorClass = isScrolled || !isHomePage ? "text-foreground" : "text-white";
    const navLinkBaseClass = isScrolled || !isHomePage ? "text-foreground/80 hover:text-primary" : "text-white/80 hover:text-white";
    const activeLinkClass = isScrolled || !isHomePage ? "text-primary" : "text-white font-semibold";

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-border/40 py-2 shadow-sm"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* Use Lucide FLAME or similar as a simple logo icon if we don't have an SVG yet */}
                        <Flame className={cn("w-6 h-6 transition-transform duration-500 group-hover:scale-110", isScrolled || !isHomePage ? "text-primary" : "text-white")} />
                        <span className={cn("text-xl md:text-2xl font-serif font-bold tracking-wide transition-colors", textColorClass)}>
                            Candle Elementals
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm uppercase tracking-widest transition-colors duration-300 relative group",
                                    pathname === link.href ? activeLinkClass : navLinkBaseClass
                                )}
                            >
                                {link.name}
                                <span className={cn("absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full", isScrolled || !isHomePage ? "bg-primary" : "bg-white")} />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("relative hover:bg-transparent transition-colors", isScrolled || !isHomePage ? "hover:text-primary text-foreground" : "hover:text-white/80 text-white")}
                            aria-label="Shopping Cart"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {items.length > 0 && (
                                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
                            )}
                        </Button>

                        {/* Mobile Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("md:hidden", textColorClass)}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[60] bg-[#fdfbf7] pt-24 px-6 md:hidden flex flex-col gap-6"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-serif font-medium text-foreground hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-8 pt-8 border-t border-border">
                            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
                                Candle Elementals
                            </p>
                            <p className="text-sm text-foreground/60">
                                Premium Handmade Soy Candles
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
