"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkshopCalendarProps {
    dates: Date[];
    onDateSelect: (date: Date | null) => void;
    selectedDate: Date | null;
}

export default function WorkshopCalendar({ dates, onDateSelect, selectedDate }: WorkshopCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // December 2025

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const workshopDates = dates.map(d => d.toDateString());

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
        const dateString = date.toDateString();
        const hasWorkshop = workshopDates.includes(dateString);
        const isSelected = selectedDate?.toDateString() === dateString;

        return {
            date,
            day: i + 1,
            hasWorkshop,
            isSelected,
        };
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-bold text-lg text-primary">
                    {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex gap-2">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {weekDays.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {days.map(({ date, day, hasWorkshop, isSelected }) => (
                    <button
                        key={day}
                        onClick={() => hasWorkshop && onDateSelect(isSelected ? null : date)}
                        disabled={!hasWorkshop}
                        className={cn(
                            "aspect-square rounded-full flex items-center justify-center text-sm transition-all relative",
                            hasWorkshop
                                ? "hover:bg-primary/10 cursor-pointer font-bold text-primary"
                                : "text-muted-foreground/40 cursor-default",
                            isSelected && "bg-primary text-white hover:bg-primary hover:text-white shadow-md",
                            !hasWorkshop && !isSelected && "hover:bg-transparent"
                        )}
                    >
                        {day}
                        {hasWorkshop && !isSelected && (
                            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 text-xs text-center text-muted-foreground">
                <p>Select a highlighted date to see available workshops.</p>
            </div>
        </div>
    );
}
