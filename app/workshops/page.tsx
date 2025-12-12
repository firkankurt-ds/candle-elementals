"use client";

import { Suspense, useState } from "react";
import WorkshopCard from "@/components/workshops/WorkshopCard";
import WorkshopCalendar from "@/components/workshops/WorkshopCalendar";
import PaymentStatusHandler from "@/components/workshops/PaymentStatusHandler";
import { workshops } from "@/lib/data";

export default function WorkshopsPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Get unique dates for the calendar
    const workshopDates = workshops.map(w => new Date(w.date));

    // Filter workshops
    const filteredWorkshops = selectedDate
        ? workshops.filter(w => new Date(w.date).toDateString() === selectedDate.toDateString())
        : workshops;

    return (
        <div className="pt-24 pb-20 container mx-auto px-4 md:px-6">
            <Suspense fallback={null}>
                <PaymentStatusHandler />
            </Suspense>

            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                    The Art of Candle Making
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Join us for an intimate, hands-on experience. Learn the secrets of 100% Soy Wax crafting and strict IFRA fragrance standards from our master artisans.
                </p>

                {/* Calendar Section */}
                <div className="mb-12">
                    <WorkshopCalendar
                        dates={workshopDates}
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />
                </div>

                {/* Compact Schedule List */}
                <div className="max-w-xl mx-auto bg-secondary/20 rounded-xl p-6 border border-border/40 text-left">
                    <h3 className="font-serif font-bold text-lg mb-4 text-center">
                        {selectedDate ? `Schedule for ${selectedDate.toLocaleDateString()}` : "Upcoming Workshops"}
                    </h3>
                    <div className="space-y-3">
                        {filteredWorkshops.length > 0 ? (
                            filteredWorkshops.map(w => (
                                <div key={w.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white/60 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-border/60">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 text-primary font-bold text-xs uppercase px-2 py-1 rounded">
                                            {new Date(w.date).getDate()} {new Date(w.date).toLocaleString('default', { month: 'short' })}
                                        </div>
                                        <span className="font-medium text-sm text-foreground/90">{w.title}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground ml-11 sm:ml-0">
                                        <span>{w.time}</span>
                                        {w.totalSeats > 0 && (w.totalSeats - w.bookedSeats) < 5 && (w.totalSeats - w.bookedSeats) > 0 && (
                                            <span className="text-red-500 font-bold hidden sm:inline-block">Almost Full</span>
                                        )}
                                        {(w.totalSeats - w.bookedSeats) === 0 && (
                                            <span className="text-red-600 font-bold hidden sm:inline-block">Sold Out</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground text-sm py-4">No workshops found for this date.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {filteredWorkshops.map((workshop, index) => (
                    <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
                ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto border-t border-border/40 pt-16">
                <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
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
