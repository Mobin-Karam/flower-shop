
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional: for showing discounts
  image: string;
  
  // New fields for Digicala-style card
  rating?: number; // 0-5 stars (default: 4.5)
  reviewCount?: number; // Number of reviews (default: 128)
  inStock?: boolean; // Stock availability (default: true)
  isBestseller?: boolean; // Bestseller badge
  isNew?: boolean; // New product badge
  
  // Additional optional fields
  category?: string;
  tags?: string[];
  freeShipping?: boolean; // For delivery info badge
}

export type CartItem = Product & {
  quantity: number
}