"use client";

import ExploreQuiz from "@/components/explore/ExploreQuiz";
import { motion } from "framer-motion";

export default function ExplorePage() {
    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-[#faf9f6]">
            {/* Background Atmosphere */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#d4c5a3]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-gradient-to-t from-white/80 to-transparent" />

            {/* Content */}
            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
                        Discover Your Essence
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
                        Find Your Perfect Candle
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Answer three simple questions to reveal the scent that resonates with your spirit, space, and intention.
                    </p>
                </motion.div>

                <ExploreQuiz />
            </div>
        </div>
    );
}
