export interface MenuItem {
  id: string;
  title: string;
  description: string;
  category: "burgers" | "ribs" | "lunch" | "beets" | "coffee" | "all";
  price: number;
  tag?: string; // e.g. "TOP Bestselleris", "Sotus kombo"
  image: string; // High-quality Unsplash image url
  rating: number; // e.g. 4.9
  ingredients: string[]; // e.g. ["Brandinta jautiena", "Čederis",...]
  isSpicy?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  preparationTime?: string; // e.g. "12-15 min"
}

export interface Review {
  id: string;
  author: string;
  role: string; // e.g. "Panevėžio vietinis", "Užkietėjęs mėsėdis"
  text: string;
  rating: number;
  date: string;
  sentiment: "amazing" | "funny" | "loyal";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface DayLunch {
  day: string;
  soup: string;
  main: string;
  price: number;
}
