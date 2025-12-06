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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {workshops.map((workshop, index) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
                ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto border-t border-border/40 pt-16">
                <h2 className="text-3xl font-serif font-bold text-center mb-12">Common Questions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white/50 p-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-serif font-bold text-lg mb-3 text-primary">Do I need prior experience?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Not at all! Our workshops are designed for all skill levels. Our master artisans will guide you step-by-step, making it perfect for beginners and enthusiasts alike.
                        </p>
                    </div>

                    <div className="bg-white/50 p-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-serif font-bold text-lg mb-3 text-primary">Private Workshops?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Absolutely. We love hosting private events for birthdays, corporate team building, or special gatherings. Contact us to reserve a private session for your group.
                        </p>
                    </div>

                    <div className="bg-white/50 p-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-serif font-bold text-lg mb-3 text-primary">Cancellation Policy?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We understand plans change. Cancellations made at least 48 hours in advance are fully refundable. For last-minute changes, please contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
