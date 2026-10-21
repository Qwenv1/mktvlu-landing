export type ProductExample = {
  id: string; category: string; name: string; detail: string; image: string; alt: string;
  price: number; low: number; high: number; listings: number; confidence: number; position: string; asking: number;
};

// Illustrative demo data, not current marketplace valuations.
export const examples: ProductExample[] = [
  { id: "golf", category: "Golf", name: "TaylorMade P770 / P7MB irons", detail: "4–PW · Steel shafts · Right-handed", image: "/images/golf-iron-set.png", alt: "A fan of black forged golf irons with metallic details", price: 999, low: 890, high: 1120, listings: 24, confidence: 88, position: "50% 42%", asking: 1095 },
  { id: "phone", category: "Phones", name: "iPhone 15 Pro", detail: "256GB · Natural Titanium", image: "/images/iphone-15-pro.webp", alt: "An iPhone 15 Pro held in a hand outdoors", price: 820, low: 740, high: 910, listings: 38, confidence: 92, position: "50% 38%", asking: 850 },
  { id: "watch", category: "Watches", name: "Rolex GMT-Master II ‘Batgirl’", detail: "Oyster bracelet · Black and blue bezel", image: "/images/rolex-gmt-master-ii-batgirl.webp", alt: "A Rolex GMT-Master II watch with a black and blue bezel", price: 26500, low: 24400, high: 28300, listings: 18, confidence: 86, position: "50% 62%", asking: 27000 },
  { id: "coffee", category: "Coffee", name: "Breville Barista Express Impress", detail: "Stainless steel · Espresso machine", image: "/images/breville-barista-express-impress.png", alt: "A Breville Barista Express Impress espresso machine", price: 650, low: 570, high: 735, listings: 29, confidence: 90, position: "50% 45%", asking: 699 },
];
export const money = (value: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);
