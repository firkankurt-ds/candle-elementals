"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col h-full"
        >
            {/* Image Container - Minimalist Premium */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-transparent transition-transform duration-500 hover:shadow-xl rounded-2xl">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Product Details - Framed like WorkshopCard */}
            <div className="p-6 mt-4 border border-border/60 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30">
                <div className="text-center space-y-3">
                    <h3 className="text-xl font-serif font-medium tracking-wide text-foreground/90 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed line-clamp-2 font-light italic">
                        {product.description}
                    </p>
                    <div className="pt-3 border-t border-border/40 w-full">
                        <span className="text-lg font-medium text-primary tracking-widest">
                            ${product.price}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
