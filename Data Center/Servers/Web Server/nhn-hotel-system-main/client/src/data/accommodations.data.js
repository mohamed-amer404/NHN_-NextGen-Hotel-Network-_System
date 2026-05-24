import deluxeSuite from "../assets/Rooms_Grand-Central-Suite.webp";
import executiveRoom from "../assets/Rooms_Hotel-Amsterdam_Royal-Suite.webp";
import presidentialVilla from "../assets/Rooms_inner-courtyard-with-swimming-pool.webp";
import juniorSuite from "../assets/Rooms_luxury-living-room-with-bookshelf.webp";
import familyTerrace from "../assets/Rooms_scandinavian-living-room-with-working-table-bookshelf.webp";
import oceanViewKing from "../assets/Rooms_interior-design-minimal-concept.webp";

export const accommodations = [
    {
        id: 1,
        name: "Deluxe Suite",
        description:
            "Experience luxury in our spacious suites featuring premium linens, curated art, and stunning city views.",
        price: 350,
        category: "suites",
        image: deluxeSuite,
    },
    {
        id: 2,
        name: "Executive Room",
        description:
            "Perfect for the business traveler. Blending high-speed productivity with sophisticated comfort.",
        price: 280,
        category: "rooms",
        image: executiveRoom,
    },
    {
        id: 3,
        name: "Presidential Villa",
        description:
            "The pinnacle of luxury with private pool access, expansive living quarters, and dedicated 24/7 butler service.",
        price: 1200,
        category: "villas",
        image: presidentialVilla,
    },
    {
        id: 4,
        name: "Junior Suite",
        description:
            "A cozy yet elegant space perfect for solo travelers or couples, featuring a boutique lounge and warm ambiance.",
        price: 220,
        category: "suites",
        image: juniorSuite,
    },
    {
        id: 5,
        name: "Family Terrace",
        description:
            "Spacious interconnected rooms with a private terrace. Ideal for families seeking comfort and collective luxury.",
        price: 450,
        category: "rooms",
        image: familyTerrace,
    },
    {
        id: 6,
        name: "Ocean View King",
        description:
            "Wake up to breathtaking ocean horizons in our most popular king room, featuring a private balcony and spa-inspired bath.",
        price: 550,
        category: "rooms",
        image: oceanViewKing,
    },
];

export const categories = [
    { id: "all", label: "All Rooms" },
    { id: "suites", label: "Suites" },
    { id: "villas", label: "Villas" },
];
