// NOTE: This is currently mock data and will be replaced by backend or database integration.
// The structure should be future-proof to accommodate API responses or database queries.

export interface Villa {
  id: string;
  name: string;
  bedroomType: string;
  description: string;
  image: string;
}

export const villaData: Villa[] = [
  {
    id: "matahari",
    name: "Matahari",
    bedroomType: "1 BEDROOM",
    description: "Bright, warm, and open. For an energizing start to the day.",
    image: "/images/Matahari1.png",
  },
  {
    id: "cahaya",
    name: "Cahaya",
    bedroomType: "2 BEDROOM",
    description: "Soft light and gentle tones. For steady, quiet thinking.",
    image: "/images/cahaya1.png",
  },
  {
    id: "alas-wana",
    name: "Alas Wana",
    bedroomType: "2 BEDROOM",
    description: "Earthy textures and grounding elements. For balance and connection to nature.",
    image: "/images/alaswarna1.png",
  },
  {
    id: "svarga",
    name: "Svarga",
    bedroomType: "3 BEDROOM",
    description: "Calm colors and spacious comfort. For deep rest and slow breathing.",
    image: "/images/svarga1.png",
  },
  {
    id: "mahakarya",
    name: "Mahakarya",
    bedroomType: "2 BEDROOM",
    description: "Refined natural details. For cozy warmth and thoughtful, artful living.",
    image: "/images/mahakarya1.png",
  },
];

