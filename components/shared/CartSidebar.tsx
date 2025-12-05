"use client";

import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartSidebar() {
    const { cartOpen, setCartOpen, items, removeItem, addItem, decreaseItem, total } = useCart();

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#fdfbf7] text-foreground shadow-2xl z-[70] flex flex-col border-l border-primary/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 border-b border-primary/20 bg-white/30 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-serif font-medium tracking-wide text-primary">Your Collection</h2>
                                <span className="text-xs font-medium text-white bg-primary px-2 py-1 rounded-full">
                                    {items.length}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setCartOpen(false)}
                                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                                    <div className="p-8 bg-primary/5 rounded-full border border-primary/10">
                                        <ShoppingBag className="w-12 h-12 text-primary/40" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-serif text-foreground/80">Your sanctuary is empty.</p>
                                        <p className="text-sm text-muted-foreground font-light">Time to fill it with light.</p>
                                    </div>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-primary/30 text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs"
                                        onClick={() => setCartOpen(false)}
                                    >
                                        <a href="/products">Explore Candles</a>
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group pb-8 border-b border-primary/10 last:border-0 last:pb-0">
                                        {/* Image */}
                                        <div className="relative h-28 w-24 flex-shrink-0 bg-[#f4efe4] rounded-sm overflow-hidden shadow-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-serif font-medium text-xl text-foreground/90 leading-tight">
                                                        {item.title}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-muted-foreground/60 hover:text-red-900 transition-colors p-1 -mr-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                {item.type === 'workshop' && 'date' in item && (
                                                    <p className="text-xs text-primary/80 uppercase tracking-wider font-medium">{item.date}</p>
                                                )}
                                            </div>

                                            <div className="flex items-end justify-between">
                                                {/* Quantity Controls - Pill Shape Luxury */}
                                                <div className="flex items-center gap-4 border border-primary/30 rounded-full px-3 py-1 bg-white/40">
                                                    <button
                                                        onClick={() => decreaseItem(item.id)}
                                                        className="text-primary hover:text-primary/70 transition-colors disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-serif font-medium w-4 text-center text-foreground">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addItem(item)}
                                                        className="text-primary hover:text-primary/70 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-lg font-medium text-foreground tracking-wide">
                                                        ${item.price * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-8 border-t border-primary/20 bg-white/40 backdrop-blur-md">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground uppercase tracking-wider text-xs">Subtotal</span>
                                        <span className="font-medium text-foreground">${total}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground uppercase tracking-wider text-xs">Shipping</span>
                                        <span className="text-muted-foreground italic font-serif">Calculated at checkout</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-primary/10">
                                        <span className="text-xl font-serif text-foreground">Total</span>
                                        <span className="text-3xl font-serif font-medium text-primary">${total}</span>
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-14 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-medium hover:bg-primary/90 hover:scale-[1.01] transition-all duration-500 shadow-lg hover:shadow-xl rounded-sm"
                                    onClick={async () => {
                                        try {
                                            const response = await fetch("/api/checkout_session", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ items }),
                                            });
                                            if (!response.ok) throw new Error("Checkout failed");
                                            const { url } = await response.json();
                                            window.location.href = url;
                                        } catch (error) {
                                            console.error("Checkout error:", error);
                                            alert("Checkout service is currently in test mode. Configure Stripe keys to enable.");
                                        }
                                    }}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
