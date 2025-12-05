import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-primary/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif text-primary">Candle Elementals</h3>
                        <p className="text-secondary-foreground/70 max-w-xs text-sm leading-relaxed">
                            Crafting memories through scent. 100% Soy Wax, IFRA-Certified Premium Fragrances. Hand-poured with precision and passion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80">Navigation</h4>
                        <nav className="flex flex-col gap-2">
                            <Link href="/products" className="text-sm hover:text-primary transition-colors w-fit">Shop Candles</Link>
                            <Link href="/workshops" className="text-sm hover:text-primary transition-colors w-fit">Workshops</Link>
                            <Link href="/about" className="text-sm hover:text-primary transition-colors w-fit">Our Story</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-primary/80">Connect</h4>
                        <div className="space-y-2">
                            <a href="https://www.instagram.com/candlelementals/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                <Instagram className="w-4 h-4" /> @candlelementals
                            </a>
                            <a href="mailto:info@candleelements.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" /> info@candleelements.com
                            </a>
                            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                                <MapPin className="w-4 h-4" /> Istanbul, Turkey
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-foreground/50">
                    <p>&copy; {currentYear} CandleElements. All rights reserved.</p>
                    <p>Designed with elegance.</p>
                </div>
            </div>
        </footer>
    );
}
