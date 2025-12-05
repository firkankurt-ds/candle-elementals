"use client";

import WorkshopCard from "@/components/workshops/WorkshopCard";
import { workshops } from "@/lib/data";

export default function WorkshopsPage() {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                    The Art of Candle Making
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Join us for an intimate, hands-on experience. Learn the secrets of 100% Soy Wax crafting and strict IFRA fragrance standards from our master artisans.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workshops.map((workshop, index) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
                ))}
            </div>
        </div>
    );
}
