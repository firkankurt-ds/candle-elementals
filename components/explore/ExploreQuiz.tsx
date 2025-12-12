"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCcw, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/lib/data";
import { Button } from "@/components/ui/button";

// Question Configuration
const questions = [
    {
        id: 1,
        question: "What scent profile speaks to your soul?",
        options: [
            { label: "Woody & Earthy", value: "Woody" },
            { label: "Floral & Delicate", value: "Floral" },
            { label: "Gourmand & Sweet", value: "Gourmand" },
        ]
    },
    {
        id: 2,
        question: "What is your intention for this candle?",
        options: [
            { label: "Deep Relaxation", value: "Relaxation" },
            { label: "Focus & Clarity", value: "Focus" },
            { label: "Daily Ritual", value: "Ritual" },
        ]
    },
    {
        id: 3,
        question: "Where will this candle live?",
        options: [
            { label: "Living Room", value: "Living Room" },
            { label: "Bedroom Sanctuary", value: "Bedroom" },
            { label: "Creative Workspace", value: "Workspace" },
        ]
    }
];

// Mapping Logic (Scores)
// Scent: Woody, Floral, Gourmand
// Intention: Relaxation, Focus, Ritual
// Location: Living Room, Bedroom, Workspace
// Products: 
// 1: Soft Embrace (Floral, Relaxation, Bedroom)
// 2: Palo Santo (Woody, Focus/Ritual, Workspace/Living)
// 3: White Coconut (Gourmand, Relaxation, Living)
// 4: Moon Shadow (Woody/Floral, Ritual, Bedroom)
// 5: Botanical Breeze (Green/Fresh -> Focus, Workspace) -> lets map "Focus" to this too.
// 6: Mystic Ruby (Gourmand/Fruity, Relaxation, Living)

const calculateResult = (answers: string[]) => {
    const scores: Record<string, number> = {};
    products.forEach(p => scores[p.id] = 0);

    const [scent, intention, location] = answers;

    // SCENT LOGIC
    if (scent === "Woody") {
        scores["2"] += 3; // Palo Santo
        scores["4"] += 2; // Moon Shadow
        scores["5"] += 1; // Botanical
    } else if (scent === "Floral") {
        scores["1"] += 3; // Soft Embrace
        scores["4"] += 2; // Moon Shadow
    } else if (scent === "Gourmand") {
        scores["3"] += 3; // White Coconut
        scores["6"] += 3; // Mystic Ruby
    }

    // INTENTION LOGIC
    if (intention === "Relaxation") {
        scores["1"] += 2;
        scores["3"] += 2;
        scores["6"] += 2;
    } else if (intention === "Focus") {
        scores["2"] += 2;
        scores["5"] += 3;
    } else if (intention === "Ritual") {
        scores["4"] += 3;
        scores["2"] += 2;
    }

    // LOCATION LOGIC
    if (location === "Living Room") {
        scores["3"] += 1;
        scores["6"] += 1;
        scores["2"] += 1;
    } else if (location === "Bedroom") {
        scores["1"] += 2;
        scores["4"] += 2;
    } else if (location === "Workspace") {
        scores["5"] += 2;
        scores["2"] += 1;
    }

    // Find winner
    let winnerId = "1";
    let maxScore = -1;

    Object.entries(scores).forEach(([id, score]) => {
        if (score > maxScore) {
            maxScore = score;
            winnerId = id;
        }
    });

    return products.find(p => p.id === winnerId) || products[0];
};

export default function ExploreQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Product | null>(null);

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setTimeout(() => setStep(step + 1), 300); // Slight delay for effect
        } else {
            // Calculate Result
            const winner = calculateResult(newAnswers);
            setTimeout(() => setResult(winner), 500);
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    const currentQuestion = questions[step];

    return (
        <div className="w-full max-w-4xl mx-auto px-4 min-h-[600px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key={`question-${step}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-lg mx-auto text-center"
                    >
                        {/* Progress */}
                        <div className="flex justify-center gap-2 mb-8">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-primary" : "w-2 bg-border"}`}
                                />
                            ))}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10 leading-tight">
                            {currentQuestion.question}
                        </h2>

                        <div className="grid gap-4">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(option.value)}
                                    className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-stone-200 hover:border-primary/50 text-stone-800 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-left flex items-center justify-between"
                                >
                                    <span className="font-serif text-lg font-medium">{option.label}</span>
                                    <ArrowRight className="w-5 h-5 text-primary/0 group-hover:text-primary transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-center"
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative aspect-square rounded-xl overflow-hidden shadow-lg group">
                            <Image
                                src={result.image}
                                alt={result.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                                <Sparkles className="w-3 h-3" />
                                <span>Perfect Match</span>
                            </div>

                            <div>
                                <h2 className="text-4xl font-serif font-bold text-foreground mb-2">{result.name}</h2>
                                <p className="text-primary font-medium text-xl">${result.price}</p>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/30 pl-4">
                                {result.description}
                            </p>

                            <div className="pt-6 flex flex-col sm:flex-row gap-4">
                                <Link href={`/products`} className="flex-1">
                                    <Button size="lg" className="w-full h-12 text-sm uppercase tracking-widest font-bold">
                                        Shop This Candle
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={resetQuiz}
                                    className="flex-1 h-12 text-sm uppercase tracking-widest gap-2 bg-transparent hover:bg-white/50"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    Start Over
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
