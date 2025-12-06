"use client";

import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/data";

export default function ProductsPage() {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-foreground">
                    Collection
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 font-light">
                    Discover our range of artisanal candles, each hand-poured with precision using <span className="text-primary font-medium">100% biodegradable soy wax</span> and premium <span className="text-primary font-medium">IFRA-compliant essences</span>.
                </p>
                <div className="inline-block px-8 py-4 border border-[#cba135]/30 rounded-full bg-gradient-to-r from-[#cba135]/5 to-[#cba135]/10 backdrop-blur-md shadow-sm">
                    <p className="text-sm md:text-base font-serif font-medium text-[#cba135] tracking-[0.2em] uppercase">
                        Available exclusively through our workshops
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    );
}
