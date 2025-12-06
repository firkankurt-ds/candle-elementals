export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    features?: string[];
    burnTime?: string;
}

export interface Workshop {
    id: string;
    title: string;
    date: string;
    time: string;
    price: number;
    image: string;
    location: string;
    locationLink: string;
    capacity: string;
    itemsMade: string;
    included: string[];
    language: string;
    ageGroup?: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Soft Embrace",
        description: "A gentle floral symphony that wraps your space in comfort. Delicate notes of pink peony and cashmere musk. These scents are available exclusively to our workshop guests.",
        price: 45,
        image: "/images/soft-embrace.png",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "40–45 hours"
    },
    {
        id: "2",
        name: "Palo Santo",
        description: "Sacred wood notes with a cleansing, grounding aroma. Hints of citrus and mint elevate the earthy base. These scents are available exclusively to our workshop guests.",
        price: 48,
        image: "/images/palo-santo.png",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "45–50 hours"
    },
    {
        id: "3",
        name: "White Coconut",
        description: "Creamy and tropical, a pure island escape. Rich coconut milk blended with a whisper of vanilla bean. These scents are available exclusively to our workshop guests.",
        price: 45,
        image: "/images/white-coconut.jpg",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "45–60 hours"
    },
    {
        id: "4",
        name: "Moon Shadow",
        description: "Full of mystery and allure. Deep indigo nights captured in scent with smoky oud, blackberry, and midnight jasmine. These scents are available exclusively to our workshop guests.",
        price: 50,
        image: "/images/moon-shadow.jpg",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "50–60 hours"
    },
    {
        id: "5",
        name: "Botanical Breeze",
        description: "Fresh from the garden. Crisp notes of basil, tomato leaf, and wild mint bring the outdoors in. These scents are available exclusively to our workshop guests.",
        price: 42,
        image: "/images/botanical-breeze.jpg",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "45–60 hours"
    },
    {
        id: "6",
        name: "Mystic Ruby",
        description: "A bold statement of passion. Rich amber and fruity pomegranate blend to create a warm, inviting glow. These scents are available exclusively to our workshop guests.",
        price: 48,
        image: "/images/mystic-ruby.jpg",
        features: ["Soy Wax", "Vegan", "Phthalate-free"],
        burnTime: "50–60 hours"
    },
];

export const workshops: Workshop[] = [
    {
        id: "1",
        title: "Introduction to Soy Candles",
        date: "December 13, 2025",
        time: "1:00 PM - 2:30 PM",
        price: 120,
        image: "/images/workshop-process.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
        capacity: "12-15 People",
        itemsMade: "3-5 Candles",
        included: ["All Materials", "Snacks", "Tea & Coffee"],
        language: "Turkish / English"
    },
    {
        id: "2",
        title: "Scent Blending Masterclass",
        date: "December 13, 2025",
        time: "3:00 PM - 4:30 PM",
        price: 150,
        image: "/images/workshop-table.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
        capacity: "12-15 People",
        itemsMade: "3-5 Candles",
        included: ["All Materials", "Snacks", "Tea & Coffee"],
        language: "Turkish / English"
    },
    {
        id: "3",
        title: "Workshop for Children",
        date: "December 13, 2025",
        time: "11:00 AM - 12:30 PM",
        price: 135,
        image: "/images/workshop.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
        capacity: "12-15 Kids",
        itemsMade: "3-5 Candles",
        included: ["All Materials", "Snacks", "Juice"],
        language: "Turkish / English",
        ageGroup: "5-12 Years"
    },
];
