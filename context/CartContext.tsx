"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Workshop } from "@/lib/data";

// Combined Cart Item Type
export type CartItem = (Product | Workshop) & {
    quantity: number;
    title: string; // Normalize 'name' vs 'title' to 'title' for cart
    image: string;
    price: number;
    type: 'product' | 'workshop';
};

interface CartContextType {
    items: CartItem[];
    addItem: (item: Product | Workshop) => void;
    decreaseItem: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsMounted(true);
        const saved = localStorage.getItem("cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, isMounted]);

    const addItem = (item: Product | Workshop) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            // Determine type based on properties
            const type = 'date' in item ? 'workshop' : 'product';
            return [...prev, { ...item, quantity: 1, type, title: 'name' in item ? item.name : item.title }];
        });
        setCartOpen(true);
    };

    const decreaseItem = (id: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === id);
            if (existing && existing.quantity > 1) {
                return prev.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev;
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, decreaseItem, removeItem, clearCart, cartOpen, setCartOpen, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
