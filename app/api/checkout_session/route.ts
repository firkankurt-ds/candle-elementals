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
        const { workshop, quantity, guests, contactInfo } = await req.json();

        if (!workshop) {
            return new NextResponse("Workshop data missing", { status: 400 });
        }

        // Create line item for the workshop
        const origin = req.headers.get("origin");
        const imageUrl = workshop.image.startsWith("http")
            ? workshop.image
            : `${origin}${workshop.image}`;

        const line_items = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: `Workshop: ${workshop.title}`,
                    description: `${workshop.date} ${workshop.time} - ${workshop.language}`,
                    images: [imageUrl],
                    metadata: {
                        workshopId: workshop.id,
                        date: workshop.date,
                        time: workshop.time
                    }
                },
                unit_amount: Math.round(workshop.price * 100),
            },
            quantity: quantity || 1,
        }];

        // Flatten guest names for metadata (Stripe metadata has limit on keys/values)
        const guestMetadata: Record<string, string> = {};
        guests.forEach((name: string, index: number) => {
            guestMetadata[`guest_${index + 1}`] = name;
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            customer_email: contactInfo?.email,
            success_url: `${req.headers.get("origin")}/?success=true`,
            cancel_url: `${req.headers.get("origin")}/workshops?canceled=true`,
            metadata: {
                workshopTitle: workshop.title,
                workshopDate: workshop.date,
                workshopTime: workshop.time,
                primaryName: contactInfo?.fullName,
                primaryPhone: contactInfo?.phone,
                notes: contactInfo?.notes,
                language: contactInfo?.language,
                ...guestMetadata
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
