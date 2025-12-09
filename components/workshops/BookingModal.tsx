"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Loader2, User, Phone, Mail, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/lib/data";

interface BookingModalProps {
    workshop: Workshop;
    isOpen: boolean;
    onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function BookingModal({ workshop, isOpen, onClose }: BookingModalProps) {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [guestNames, setGuestNames] = useState<string[]>([""]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("+90 ");
    const [language, setLanguage] = useState("");
    const [notes, setNotes] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [marketingAccepted, setMarketingAccepted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setGuestNames([""]);
            setEmail("");
            setPhone("+90 ");
            setLanguage("");
            setNotes("");
            setTermsAccepted(false);
            setMarketingAccepted(false);
            setStatus("idle");
            setErrors({});
        }
    }, [isOpen]);

    const handleGuestCountChange = (count: number) => {
        const newCount = Math.max(1, Math.min(8, count));
        setGuestNames(prev => {
            const newNames = [...prev];
            if (newCount > prev.length) {
                // Add new guests
                for (let i = prev.length; i < newCount; i++) {
                    newNames.push("");
                }
            } else {
                // Remove guests
                newNames.splice(newCount);
            }
            return newNames;
        });
    };

    const handleNameChange = (index: number, value: string) => {
        // Only allow letters and spaces
        if (!/^[a-zA-Z\sçğıöşüÇĞİÖŞÜ]*$/.test(value)) return;

        const newNames = [...guestNames];
        newNames[index] = value;
        setGuestNames(newNames);
    };

    const handlePhoneChange = (value: string) => {
        // Ensure it always starts with +90 
        let raw = value;
        if (!raw.startsWith("+90 ")) {
            // Did user delete the space?
            if (raw.startsWith("+90")) {
                raw = "+90 " + raw.substring(3);
            } else {
                // Did user delete +90?
                raw = "+90 ";
            }
        }

        // Allow only numbers after prefix
        const prefix = "+90 ";
        const rest = raw.substring(prefix.length);
        const numbersOnly = rest.replace(/[^0-9]/g, "");

        // Max 10 digits
        if (numbersOnly.length > 10) return;

        setPhone(prefix + numbersOnly);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        guestNames.forEach((name, index) => {
            if (!name.trim()) {
                newErrors[`guest_${index}`] = index === 0 ? "Please enter your full name." : `Please enter guest ${index + 1}'s name.`;
            }
        });

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address.";
        if (phone.length < 14) newErrors.phone = "Please enter a valid phone number (10 digits).";
        if (!language) newErrors.language = "Please select a preferred language.";
        if (!termsAccepted) newErrors.termsAccepted = "Please accept the booking terms.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus("submitting");

        try {
            const response = await fetch("/api/checkout_session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    workshop,
                    quantity: guestNames.length,
                    guests: guestNames,
                    contactInfo: {
                        fullName: guestNames[0], // Primary contact is the first guest
                        email,
                        phone,
                        language,
                        notes,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Checkout failed");
            }

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            // Optionally show error message to user here
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0c0a05]/80 backdrop-blur-sm z-50 transition-all"
                    />
                    <div className="fixed inset-0 flex items-start justify-center z-50 p-4 pt-12 md:pt-24 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#faf9f6] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto border border-[#d4af37]/20 flex flex-col"
                        >
                            {/* Header - Fixed */}
                            <div className="sticky top-0 bg-[#faf9f6]/95 backdrop-blur-md px-8 py-6 flex items-center justify-between z-10 border-b border-[#d4af37]/10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Sparkles className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-xs font-bold tracking-[0.2em] text-[#d4af37] uppercase">Reservation</span>
                                    </div>
                                    <h2 className="text-3xl font-serif font-medium text-gray-900 tracking-tight">Reserve Your Spot</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 space-y-8">
                                {status === "success" ? (
                                    <div className="text-center py-12">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#d4af37]/20"
                                        >
                                            <CheckCircle className="w-10 h-10 text-[#d4af37]" />
                                        </motion.div>
                                        <h3 className="text-3xl font-serif font-medium mb-4 text-gray-900">Request Received</h3>
                                        <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                                            We have received your booking request. Our team will review it and contact you shortly via WhatsApp or email to finalize your reservation.
                                        </p>
                                        <Button
                                            onClick={onClose}
                                            className="bg-[#1a1a1a] text-white px-8 py-6 rounded-full font-serif tracking-wider hover:bg-black transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
                                        >
                                            Close Window
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">

                                        {/* Workshop Summary Card */}
                                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                                            <div className="w-20 h-24 relative rounded-lg overflow-hidden shrink-0 shadow-inner">
                                                {/* Keeping it simple with just color if no image passed, but workshop has image so: */}
                                                <img src={workshop.image} alt={workshop.title} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <h4 className="font-serif font-medium text-lg text-gray-900 leading-tight mb-2">{workshop.title}</h4>
                                                <div className="space-y-1 text-sm text-gray-500 font-light">
                                                    <p className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> {workshop.date}</p>
                                                    <p className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> {workshop.time}</p>
                                                    <p className="flex items-center gap-2 text-[#d4af37] font-medium mt-2">${workshop.price} / person</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Guest Count */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Number of Guests</label>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleGuestCountChange(guestNames.length - 1)}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-30 disabled:hover:border-gray-200"
                                                        disabled={guestNames.length <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-xl font-serif font-medium w-8 text-center">{guestNames.length}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleGuestCountChange(guestNames.length + 1)}
                                                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#d4af37] hover:text-[#d4af37] transition-all disabled:opacity-30 disabled:hover:border-gray-200"
                                                        disabled={guestNames.length >= 8}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Dynamic Guest Name Fields */}
                                            <div className="space-y-4">
                                                {guestNames.map((name, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                                            {index === 0 ? "Primary Contact Name" : `Guest ${index + 1} Name`}
                                                        </label>
                                                        <div className="relative">
                                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <input
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => handleNameChange(index, e.target.value)}
                                                                placeholder={index === 0 ? "E.g., Eda Gaş" : `Guest ${index + 1} Full Name`}
                                                                className={`w-full pl-11 pr-4 py-4 bg-white rounded-lg border ${errors[`guest_${index}`] ? "border-red-300 focus:border-red-500 ring-red-100" : "border-gray-200 focus:border-[#d4af37] ring-[#d4af37]/10"} outline-none focus:ring-4 transition-all placeholder:text-gray-300 text-gray-700`}
                                                            />
                                                        </div>
                                                        {errors[`guest_${index}`] && (
                                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors[`guest_${index}`]}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Contact Info Group */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            value={phone}
                                                            onChange={(e) => handlePhoneChange(e.target.value)}
                                                            className={`w-full pl-11 pr-4 py-4 bg-white rounded-lg border ${errors.phone ? "border-red-300 focus:border-red-500 ring-red-100" : "border-gray-200 focus:border-[#d4af37] ring-[#d4af37]/10"} outline-none focus:ring-4 transition-all text-gray-700`}
                                                        />
                                                    </div>
                                                    {errors.phone && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder="you@example.com"
                                                            className={`w-full pl-11 pr-4 py-4 bg-white rounded-lg border ${errors.email ? "border-red-300 focus:border-red-500 ring-red-100" : "border-gray-200 focus:border-[#d4af37] ring-[#d4af37]/10"} outline-none focus:ring-4 transition-all placeholder:text-gray-300 text-gray-700`}
                                                        />
                                                    </div>
                                                    {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                                                </div>
                                            </div>

                                            {/* Language */}
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Preferred Language</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    {["Turkish", "English", "Both are fine"].map((lang) => (
                                                        <label key={lang} className={`relative cursor-pointer group`}>
                                                            <input
                                                                type="radio"
                                                                name="language"
                                                                value={lang}
                                                                checked={language === lang}
                                                                onChange={(e) => setLanguage(e.target.value)}
                                                                className="sr-only"
                                                            />
                                                            <div className={`px-4 py-3 rounded-lg border text-sm text-center transition-all ${language === lang ? "bg-[#d4af37]/10 border-[#d4af37] text-[#967421] font-medium shadow-inner" : "bg-white border-gray-200 hover:border-[#d4af37]/50 text-gray-600"}`}>
                                                                {lang}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.language && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.language}</p>}
                                            </div>

                                            {/* Notes */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Special Notes</label>
                                                <textarea
                                                    rows={3}
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Allergies, gift requests, etc."
                                                    className="w-full p-4 bg-white rounded-lg border border-gray-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none transition-all resize-none placeholder:text-gray-300 text-gray-700"
                                                />
                                            </div>
                                        </div>

                                        {/* Terms & Actions */}
                                        <div className="pt-6 border-t border-gray-100 space-y-6">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <div className="relative flex items-center mt-0.5">
                                                    <input
                                                        type="checkbox"
                                                        checked={termsAccepted}
                                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                                        className="peer h-5 w-5 rounded border-gray-300 text-[#d4af37] focus:ring-[#d4af37]/20 transition-all checked:bg-[#d4af37] checked:border-[#d4af37]"
                                                    />
                                                </div>
                                                <div className="text-sm leading-relaxed">
                                                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">I agree to the booking terms & conditions.</span>
                                                    <p className="text-gray-400 text-xs mt-0.5 font-light">Your spot is held once we receive payment.</p>
                                                    {errors.termsAccepted && (
                                                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.termsAccepted}</p>
                                                    )}
                                                </div>
                                            </label>

                                            <Button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#333] hover:from-black hover:to-[#1a1a1a] text-white py-7 rounded-xl font-serif text-lg shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 group"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Processing Request...
                                                    </>
                                                ) : (
                                                    <>
                                                        Proceed to Payment
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </>
                                                )}
                                            </Button>

                                            {status === "error" && (
                                                <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                                    <p>Something went wrong. Please try again or check your connection.</p>
                                                </div>
                                            )}

                                            <p className="text-center text-xs text-gray-400 font-light">
                                                You will be redirected to a secure payment page.
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
