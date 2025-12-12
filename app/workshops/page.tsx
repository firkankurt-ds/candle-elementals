"use client";

import { Suspense, useState, useMemo } from "react";
import WorkshopCard from "@/components/workshops/WorkshopCard";
import WorkshopCalendar from "@/components/workshops/WorkshopCalendar";
import PaymentStatusHandler from "@/components/workshops/PaymentStatusHandler";
import { workshops, Workshop } from "@/lib/data";
import { ChevronDown, ChevronUp, MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WorkshopsPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);

    // Get unique dates for the calendar
    const workshopDates = workshops.map(w => new Date(w.date));

    // Logic: If a date is selected, show workshops for that date.
    // If NO workshops on that date (or none selected initially), find the nearest upcoming workshop(s).
    // Actually, the calendar filter usually implies filtering strictly. 
    // BUT the user asked: "Let's say today is December 13th and there are no workshops today. The workshop pages for the nearest date should be listed."
    // So if I pick a date in the calendar and it has NO workshops (which shouldn't happen if I only disable non-workshop dates, but if I allow clicking empty dates...)
    // The current calendar implementation ONLY allows clicking dates WITH workshops.
    // So if I click a date, it HAS workshops.
    // However, if the user means "When I first land on the page" or "If I pick a date that is empty (logic change needed in Cal)", 
    // Let's assume the calendar triggers selection.

    // Let's Refine: The user wants "Upcoming Workshops" list to be smart.
    // If selectedDate is null, show all upcoming? Or just nearest?
    // Let's show ALL upcoming by default, sorted by date.
    // If selectedDate is set, show strictly that date.

    // WAIT, User said: "Workshops that are clicked on the calendar should open. Let's say today is December 13th and there are no workshops today. The workshop pages for the nearest date should be listed."
    // This implies if I enter the page today (Dec 13) and there are none, show the next one.
    // Since we are mocking "Today" as Dec 13 in the example, let's just make the list smart.

    const displayedWorkshops = useMemo(() => {
        if (selectedDate) {
            const exactMatches = workshops.filter(w => new Date(w.date).toDateString() === selectedDate.toDateString());
            if (exactMatches.length > 0) return exactMatches;

            // Fallback: If selected date has no workshops (if we allowed clicking empty dates), search forward
            // Finding next available workshop after selectedDate
            return workshops
                .filter(w => new Date(w.date) > selectedDate)
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 3); // Show top 3 nearest
        }

        // Default: Sort all by date, nearest first
        return [...workshops].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [selectedDate]);

    // Grouping for the list view if distinct dates? 
    // For simplicity, just listing them elegantly as requested.

    return (
        <div className="pt-24 pb-20 container mx-auto px-4 md:px-6">
            <Suspense fallback={null}>
                <PaymentStatusHandler />
            </Suspense>

            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                    The Art of Candle Making
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                    Join us for an intimate, hands-on experience. Learn the secrets of 100% Soy Wax crafting and strict IFRA fragrance standards from our master artisans.
                </p>

                {/* Collapsible Calendar Section */}
                <div className="mb-10 flex flex-col items-center">
                    <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-border/60 shadow-sm rounded-full text-sm font-medium hover:bg-secondary/20 transition-all duration-300 group"
                    >
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span>{selectedDate ? selectedDate.toLocaleDateString() : "View Workshop Calendar"}</span>
                        {isCalendarOpen ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isCalendarOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, y: -10 }}
                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden w-full max-w-sm mt-4 z-20 relative"
                            >
                                <WorkshopCalendar
                                    dates={workshopDates}
                                    selectedDate={selectedDate}
                                    onDateSelect={(date) => {
                                        setSelectedDate(date);
                                        // Optional: Close calendar on selection if desired, but user might want to browse. keeping open.
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Collapsible Upcoming List */}
                <div className="mb-12 flex flex-col items-center">
                    <button
                        onClick={() => setIsListOpen(!isListOpen)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-border/60 shadow-sm rounded-full text-sm font-medium hover:bg-secondary/20 transition-all duration-300 group"
                    >
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{selectedDate ? `Availability: ${selectedDate.toLocaleDateString()}` : "View Upcoming Workshops"}</span>
                        {isListOpen ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isListOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, y: -10 }}
                                animate={{ height: "auto", opacity: 1, y: 0 }}
                                exit={{ height: 0, opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden w-full max-w-2xl mt-6 z-20 relative"
                            >
                                <div className="max-w-2xl mx-auto text-left">
                                    <div className="grid gap-4">
                                        {displayedWorkshops.length > 0 ? (
                                            displayedWorkshops.map((w, i) => {
                                                const seatsLeft = w.totalSeats - w.bookedSeats;
                                                const isSoldOut = seatsLeft <= 0;
                                                const isAlmostFull = !isSoldOut && (seatsLeft / w.totalSeats <= 0.2);

                                                return (
                                                    <div key={w.id} className="group relative bg-white/40 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                                                        <div className="flex items-start gap-4">
                                                            {/* Date Box */}
                                                            <div className="flex flex-col items-center justify-center bg-stone-100 min-w-[60px] h-[60px] rounded-lg border border-stone-200">
                                                                <span className="text-xs font-bold uppercase text-stone-500">{new Date(w.date).toLocaleString('default', { month: 'short' })}</span>
                                                                <span className="text-xl font-serif font-bold text-stone-800">{new Date(w.date).getDate()}</span>
                                                            </div>

                                                            <div>
                                                                <h4 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">{w.title}</h4>
                                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        <span>{w.time}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <MapPin className="w-3.5 h-3.5" />
                                                                        <span>{w.location}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between w-full sm:w-auto gap-4 pl-[76px] sm:pl-0">
                                                            <div className="flex flex-col items-end">
                                                                {isSoldOut ? (
                                                                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Sold Out</span>
                                                                ) : (
                                                                    <>
                                                                        <span className="font-serif font-medium text-lg">${w.price}</span>
                                                                        {isAlmostFull && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wide">Final Seats</span>}
                                                                    </>
                                                                )}
                                                            </div>
                                                            {/* Simple visual cue arrow or button */}
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ${isSoldOut ? "border-gray-200 text-gray-300" : "border-primary/30 text-primary group-hover:bg-primary group-hover:text-white"}`}>
                                                                <ChevronDown className={`w-4 h-4 -rotate-90 ${isSoldOut ? "" : "transform group-hover:translate-x-0.5 transition-transform"}`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="text-center py-10 bg-secondary/10 rounded-xl border border-dashed border-border">
                                                <p className="text-muted-foreground">No workshops found for this selection.</p>
                                                <button onClick={() => setSelectedDate(null)} className="text-primary text-sm font-bold mt-2 hover:underline">View All Upcoming</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {displayedWorkshops.map((workshop, index) => (
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
