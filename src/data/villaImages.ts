// NOTE: This is currently mock data and will be replaced by backend or database integration.
// The structure should be future-proof to accommodate API responses or database queries.

export interface Villa {
  id: string;
  name: string;
  bedroomType: string;
  description: string;
  image: string;
  gallery: string[];
}

export const villaData: Villa[] = [
  {
    id: "matahari",
    name: "Matahari",
    bedroomType: "1 BEDROOM",
    description: "Bright, warm, and open. For an energizing start to the day.",
    image: "/images/villa/Matahari1.webp",
    gallery: [
      "/images/villa/matahari2.webp",
      "/images/villa/matahari3.webp",
      "/images/villa/matahari4.webp",
    ]
  },
  {
    id: "cahaya",
    name: "Cahaya",
    bedroomType: "2 BEDROOM",
    description: "Soft light and gentle tones. For steady, quiet thinking.",
    image: "/images/villa/cahaya1.webp",
    gallery: [
      "/images/villa/cahaya2.webp",
      "/images/villa/cahaya3.webp",
      "/images/villa/cahaya4.webp",
    ]
  },
  {
    id: "alas-wana",
    name: "Alas Wana",
    bedroomType: "2 BEDROOM",
    description: "Earthy textures and grounding elements. For balance and connection to nature.",
    image: "/images/villa/alaswarna1.webp",
    gallery: [
      "/images/villa/alaswarna2.webp",
      "/images/villa/alaswarna3.webp",
      "/images/villa/alaswarna4.webp",
    ]
  },
  {
    id: "svarga",
    name: "Svarga",
    bedroomType: "3 BEDROOM",
    description: "Calm colors and spacious comfort. For deep rest and slow breathing.",
    image: "/images/villa/svarga1.webp",
    gallery: [
      "/images/villa/svarga3.webp",
      "/images/villa/svarga4.webp",
      "/images/villa/svarga2.webp",
    ]
  },
  {
    id: "ONE",
    name: "ONE",
    bedroomType: "2 BEDROOM",
    description: "Refined natural details. For cozy warmth and thoughtful, artful living.",
    image: "/images/villa/mahakarya1.webp",
    gallery: [
      "/images/villa/mahakarya2.webp",
      "/images/villa/mahakarya3.webp",
      "/images/villa/mahakarya4.webp",
    ]
  },
];
