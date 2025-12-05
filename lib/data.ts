export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
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
}

export const products: Product[] = [
    {
        id: "1",
        name: "Soft Embrace",
        description: "A gentle floral symphony that wraps your space in comfort. delicate notes of pink peony and cashmere musk.",
        price: 45,
        image: "/images/soft-embrace.png",
    },
    {
        id: "2",
        name: "Palo Santo",
        description: "Sacred wood notes with a cleansing, grounding aroma. Hints of citrus and mint elevate the earthy base.",
        price: 48,
        image: "/images/palo-santo.png",
    },
    {
        id: "3",
        name: "White Coconut",
        description: "Creamy and tropical, a pure island escape. Rich coconut milk blended with a whisper of vanilla bean.",
        price: 45,
        image: "/images/white-coconut.jpg",
    },
    {
        id: "4",
        name: "Moon Shadow",
        description: "Mysterious and allure. Deep indigo nights captured in scent with smoky oud, blackberry, and midnight jasmine.",
        price: 50,
        image: "/images/moon-shadow.jpg",
    },
    {
        id: "5",
        name: "Botanical Breeze",
        description: "Fresh from the garden. Crisp notes of basil, tomato leaf, and wild mint bring the outdoors in.",
        price: 42,
        image: "/images/botanical-breeze.jpg",
    },
    {
        id: "6",
        name: "Mystic Ruby",
        description: "A bold statement of passion. Rich amber and fruity pomegranate blend to create a warm, inviting glow.",
        price: 48,
        image: "/images/mystic-ruby.jpg",
    },
];

export const workshops: Workshop[] = [
    {
        id: "1",
        title: "Introduction to Soy Candles",
        date: "October 15, 2025",
        time: "14:00 - 17:00",
        price: 120,
        image: "/images/workshop-process.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
    },
    {
        id: "2",
        title: "Scent Blending Masterclass",
        date: "October 22, 2025",
        time: "10:00 - 14:00",
        price: 150,
        image: "/images/workshop-table.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
    },
    {
        id: "3",
        title: "Workshop for Children",
        date: "November 5, 2025",
        time: "15:00 - 19:00",
        price: 135,
        image: "/images/workshop.png",
        location: "Postane İstanbul",
        locationLink: "https://www.instagram.com/postaneistanbul/?hl=tr",
    },
];
