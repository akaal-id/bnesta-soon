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
    image: "/images/Matahari1.png",
    gallery: [
      "/images/Matahari1.png",
      "/images/front1.png",
      "/images/pool1.png",
      "/images/yoga1.png",
      "/images/20251118_BVilla Interior_페이지_19_이미지_0002 1.png",
      "/images/front2.png",
      "/images/cahaya1.png",
      "/images/svarga1.png",
      "/images/alaswarna1.png",
      "/images/mahakarya1.png",
    ]
  },
  {
    id: "cahaya",
    name: "Cahaya",
    bedroomType: "2 BEDROOM",
    description: "Soft light and gentle tones. For steady, quiet thinking.",
    image: "/images/cahaya1.png",
    gallery: [
      "/images/cahaya1.png",
      "/images/front2.png",
      "/images/pool1.png",
      "/images/20251118_BVilla Interior_페이지_26_이미지_0002 1.png",
      "/images/yoga1.png",
      "/images/front1.png",
      "/images/Matahari1.png",
      "/images/svarga1.png",
      "/images/alaswarna1.png",
      "/images/mahakarya1.png",
    ]
  },
  {
    id: "alas-wana",
    name: "Alas Wana",
    bedroomType: "2 BEDROOM",
    description: "Earthy textures and grounding elements. For balance and connection to nature.",
    image: "/images/alaswarna1.png",
    gallery: [
      "/images/alaswarna1.png",
      "/images/front1.png",
      "/images/pool1.png",
      "/images/20251118_BVilla Interior_페이지_36_이미지_0002 1.png",
      "/images/yoga1.png",
      "/images/front2.png",
      "/images/Matahari1.png",
      "/images/cahaya1.png",
      "/images/svarga1.png",
      "/images/mahakarya1.png",
    ]
  },
  {
    id: "svarga",
    name: "Svarga",
    bedroomType: "3 BEDROOM",
    description: "Calm colors and spacious comfort. For deep rest and slow breathing.",
    image: "/images/svarga1.png",
    gallery: [
      "/images/svarga1.png",
      "/images/front2.png",
      "/images/pool1.png",
      "/images/20251118_BVilla Interior_페이지_46_이미지_0002 1.png",
      "/images/yoga1.png",
      "/images/front1.png",
      "/images/Matahari1.png",
      "/images/cahaya1.png",
      "/images/alaswarna1.png",
      "/images/mahakarya1.png",
    ]
  },
  {
    id: "mahakarya",
    name: "Mahakarya",
    bedroomType: "2 BEDROOM",
    description: "Refined natural details. For cozy warmth and thoughtful, artful living.",
    image: "/images/mahakarya1.png",
    gallery: [
      "/images/mahakarya1.png",
      "/images/front1.png",
      "/images/pool1.png",
      "/images/yoga1.png",
      "/images/20251118_BVilla Interior_페이지_19_이미지_0002 1.png",
      "/images/front2.png",
      "/images/Matahari1.png",
      "/images/cahaya1.png",
      "/images/svarga1.png",
      "/images/alaswarna1.png",
    ]
  },
];
