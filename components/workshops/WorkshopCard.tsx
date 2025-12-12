"use client";


import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Plus, Users, Gift, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Workshop } from "@/lib/data";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

interface WorkshopCardProps {
    workshop: Workshop;
    index: number;
}

export default function WorkshopCard({ workshop, index }: WorkshopCardProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Default values if data is missing (fallback)
    const totalSeats = workshop.totalSeats || 15;
    const bookedSeats = workshop.bookedSeats || 0;
    const seatsLeft = totalSeats - bookedSeats;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white border border-border overflow-hidden hover:shadow-xl transition-all duration-500 rounded-xl flex flex-col h-full"
            >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden shrink-0">
                    <Image
                        src={workshop.image}
                        alt={workshop.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Age Badge for Kids */}
                    {workshop.ageGroup && (
                        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#ff9f43] text-white text-xs font-bold rounded-full shadow-lg border-2 border-white/30 flex items-center gap-1">
                            <span>🧸</span>
                            <span>{workshop.ageGroup}</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-4 text-sm font-medium mb-1">
                            <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{workshop.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{workshop.time}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                        {workshop.title}
                    </h3>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6 text-sm text-muted-foreground/80">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary/70" />
                            <span>{workshop.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-primary/70" />
                            <span>{workshop.itemsMade}</span>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                            <Globe className="w-4 h-4 text-primary/70" />
                            <span>{workshop.language}</span>
                        </div>
                    </div>

                    {/* Included Items */}
                    <div className="mb-6 space-y-2 bg-muted/30 p-3 rounded-lg border border-border/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">Included:</span>
                        <div className="flex flex-wrap gap-2">
                            {workshop.included.map((item, i) => (
                                <span key={i} className="text-xs bg-white px-2 py-1 rounded-md border border-border/50 text-foreground/80 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-600/70" /> {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer - Price & Seats */}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/60 mb-4">
                        <div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-0.5">Price / Person</span>
                            <span className="text-2xl font-serif font-medium text-primary">
                                ${workshop.price}
                            </span>
                        </div>

                        {/* Seat Availability - FOMO */}
                        <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-muted-foreground mb-1">
                                {seatsLeft > 0 ? (
                                    <span className={seatsLeft < 5 ? "text-red-500" : "text-green-600"}>
                                        {seatsLeft} / {workshop.totalSeats} seats left
                                    </span>
                                ) : (
                                    <span className="text-red-600">Sold Out</span>
                                )}
                            </span>
                            {seatsLeft < 5 && seatsLeft > 0 && (
                                <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
                                    Almost Full
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={() => setIsBookingOpen(true)}
                        disabled={seatsLeft === 0}
                        className={`w-full text-white shadow-md hover:shadow-xl transition-all duration-300 py-6 rounded-full font-serif font-medium tracking-widest text-xs uppercase
                                ${seatsLeft === 0
                                ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                                : "bg-gradient-to-r from-[#cba135] to-[#a88225] hover:from-[#b58e2f] hover:to-[#967421]"
                            }
                            `}
                    >
                        {seatsLeft === 0 ? "Join Waitlist" : "Book Now"}
                    </Button>
                </div>
            </motion.div>

            <BookingModal
                workshop={workshop}
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
            />
        </>
    );
}
