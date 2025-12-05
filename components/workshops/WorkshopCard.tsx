"use client";

import Image from "next/image";
import { Calendar, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Workshop } from "@/lib/data";
import { motion } from "framer-motion";

interface WorkshopCardProps {
    workshop: Workshop;
    index: number;
}

export default function WorkshopCard({ workshop, index }: WorkshopCardProps) {
    const { addItem } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border border-border overflow-hidden hover:shadow-xl transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="p-6 relative">
                <div className="mb-4">
                    <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors">
                        {workshop.title}
                    </h3>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{workshop.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{workshop.time}</span>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <span className="font-medium text-primary">Location:</span>
                        <a
                            href="https://www.instagram.com/postaneistanbul/?hl=tr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary underline decoration-primary/30 underline-offset-4 transition-colors"
                        >
                            Postane İstanbul
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <span className="text-xl font-medium text-primary">
                        ${workshop.price}
                    </span>
                    <Button
                        onClick={() => addItem(workshop)}
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/50 text-foreground"
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
