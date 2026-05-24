import presidentialSuite from "../assets/signature_presidential_suites.webp";
import executiveKingRoom from "../assets/signature_executive_king_room.webp";
import deluxeGardenVilla from "../assets/signature_deluxe_graden_villa.webp";

export const signatureSuites = [
    {
        id: 1,
        title: "Presidential Suite",
        description:
            "The pinnacle of luxury with panoramic 360-degree city views and private terrace.",
        price: 1200,
        image: presidentialSuite,
    },
    {
        id: 2,
        title: "Executive King Room",
        description:
            "Refined comfort designed for the modern traveler seeking both style and functionality.",
        price: 550,
        image: executiveKingRoom,
    },
    {
        id: 3,
        title: "Deluxe Garden Villa",
        description:
            "A private sanctuary surrounded by lush tropical greenery and your own dip pool.",
        price: 890,
        image: deluxeGardenVilla,
    },
];
