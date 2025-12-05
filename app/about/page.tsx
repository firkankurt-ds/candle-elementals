"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-background pt-24 pb-20">
            {/* Introduction */}
            <div className="container mx-auto px-4 md:px-6 mb-24 text-center max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8"
                >
                    Crafting Light, Creating Memories
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                    Candle Elementals is born from a passion for purity and design. Founded by Eda Gaş, our mission is to bring the serenity of nature into your home through meticulously handcrafted soy candles.
                </motion.p>
            </div>

            {/* The Creator Section */}
            <section className="container mx-auto px-4 md:px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-lg"
                    >
                        <Image
                            src="/images/workshop-process.png"
                            alt="Studio Atmosphere"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold">The Artisan Touch</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Every candle is a piece of art, poured by hand with precision and care. Eda Gaş brings years of expertise to every creation, ensuring that each product not only looks beautiful but burns cleanly and evenly.
                        </p>
                        <div className="p-4 border border-primary/20 bg-primary/5 rounded-md my-4">
                            <p className="text-primary italic text-lg leading-relaxed">
                                "It's not just about making a candle; it's about curating an atmosphere. I want my workshops to be a place where people can disconnect from the noise and reconnect with their creativity."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quality & Certifications */}
            <section className="bg-secondary text-secondary-foreground py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 md:order-1 space-y-8"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Unique Quality</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">100% Natural Soy Wax</h3>
                                        <p className="text-secondary-foreground/80">
                                            Biodegradable, renewable, and free from toxins. Soy wax burns slower and cooler than paraffin, giving you a longer-lasting candle.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">IFRA-Certified Premium Fragrances</h3>
                                        <p className="text-secondary-foreground/80">
                                            We adhere to the strictest safety standards set by the International Fragrance Association. non-toxic, phthalate-free, and safe for your home.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Eco-Friendly Wicks</h3>
                                        <p className="text-secondary-foreground/80">
                                            We use lead-free cotton or sustainably sourced wooden wicks for a clean burn and a soothing crackle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 md:order-2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-lg"
                        >
                            <Image
                                src="/images/products.png"
                                alt="Unique Quality Details"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
