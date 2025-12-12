import { Flame, Sparkles, MapPin } from "lucide-react";

export default function Highlights() {
    const highlights = [
        {
            icon: Flame,
            title: "Small-batch soy candles",
            description: "Hand-poured with care to ensure the highest quality burn.",
        },
        {
            icon: Sparkles,
            title: "Workshop exclusive scents",
            description: "Unique fragrances curated specifically for our community.",
        },
        {
            icon: MapPin,
            title: "Intimate workshops in Istanbul",
            description: "Join us for a hands-on experience in the heart of the city.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            {highlights.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-full bg-secondary/30 text-primary mb-2">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium font-serif">{item.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[250px]">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
