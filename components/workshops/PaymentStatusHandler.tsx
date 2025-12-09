"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentStatusHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<"success" | "canceled" | null>(null);

    useEffect(() => {
        if (searchParams.get("success")) {
            setPaymentStatus("success");
            router.replace("/workshops");
        }
        if (searchParams.get("canceled")) {
            setPaymentStatus("canceled");
            router.replace("/workshops");
        }
    }, [searchParams, router]);

    return (
        <AnimatePresence>
            {paymentStatus && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
                >
                    <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-4 ${paymentStatus === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                        {paymentStatus === "success" ? (
                            <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                        ) : (
                            <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                        )}
                        <div>
                            <h3 className="font-serif font-bold text-lg">
                                {paymentStatus === "success" ? "Payment Successful!" : "Payment Canceled"}
                            </h3>
                            <p className="text-sm opacity-90">
                                {paymentStatus === "success"
                                    ? "Thank you for your reservation. You will receive a confirmation email shortly."
                                    : "Your payment was canceled. No charges were made."}
                            </p>
                        </div>
                        <button
                            onClick={() => setPaymentStatus(null)}
                            className="ml-auto p-1 hover:bg-black/5 rounded-full"
                        >
                            <XCircle className="w-5 h-5 opacity-50" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
