"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";

import { Flame, Leaf, Sprout } from "lucide-react";

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

                {/* Workshop Exclusive Badge */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-[#cba135] to-[#a88225] text-white text-[10px] uppercase tracking-widest font-bold rounded-full shadow-lg border border-white/20">
                    Workshop Exclusive
                </div>
            </div>

            {/* Product Details - Framed like WorkshopCard */}
            <div className="p-6 mt-4 border border-border/60 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30">
                <div className="text-center space-y-4">
                    <h3 className="text-xl font-serif font-medium tracking-wide text-foreground/90 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed line-clamp-3 font-light italic">
                        {product.description}
                    </p>



                    {/* Premium Info Badges */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border/30">
                        {/* Burn Time */}
                        <div className="flex flex-col items-center justify-center gap-1 group/icon">
                            <Flame className="w-3 h-3 text-primary/60 group-hover/icon:text-primary transition-colors" />
                            <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">{product.burnTime || '40h'}</span>
                        </div>
                        {/* Soy Wax */}
                        <div className="flex flex-col items-center justify-center gap-1 group/icon">
                            <Leaf className="w-3 h-3 text-primary/60 group-hover/icon:text-primary transition-colors" />
                            <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">Soy Wax</span>
                        </div>
                        {/* Vegan */}
                        <div className="flex flex-col items-center justify-center gap-1 group/icon">
                            <Sprout className="w-3 h-3 text-primary/60 group-hover/icon:text-primary transition-colors" />
                            <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">Vegan</span>
                        </div>
                    </div>

                    <div className="w-full pt-1">
                        <span className="text-lg font-medium text-primary tracking-widest">
                            ${product.price}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
