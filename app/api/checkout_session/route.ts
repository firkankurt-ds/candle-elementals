import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    // apiVersion: "2024-12-18.acacia", // Updated to a recognized version or remove if causing issues. 
    // Actually, simplest is to omit or cast if types are mismatching.
    // Let's try omitting it if possible, or using the one the error suggested if I was sure.
    // The error said "not assignable to ... '2025-11-17.clover'". 
    // Wait, I'll just remove it to let it default.
    typescript: true,
});


export async function POST(req: Request) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return new NextResponse("No items in checkout", { status: 400 });
        }

        const line_items = items.map((item: any) => ({
            price_data: {
                currency: "usd", // Should be TRY if using Iyzico/local currency, but Stripe supports USD/TRY
                product_data: {
                    name: item.title,
                    images: [item.image], // Note: These must be public URLs for Stripe to show them
                },
                unit_amount: Math.round(item.price * 100), // Amount in cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${req.headers.get("origin")}/?success=true`,
            cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
