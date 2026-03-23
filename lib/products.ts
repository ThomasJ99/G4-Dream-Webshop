export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wool Blend Overcoat",
    description:
      "A timeless overcoat crafted from premium wool blend. Features a classic single-breasted design with notched lapels, perfect for the modern minimalist wardrobe.",
    price: 2499,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Camel", "Black"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    description:
      "Essential crew neck t-shirt made from 100% organic cotton. Relaxed fit with a soft, breathable feel for everyday comfort.",
    price: 399,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy"],
    inStock: true,
  },
  {
    id: "3",
    name: "High-Waist Wide Trousers",
    description:
      "Elegant wide-leg trousers with a flattering high waist. Crafted from a premium wool blend for a refined drape and lasting comfort.",
    price: 1299,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Cream"],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Cashmere Knit Sweater",
    description:
      "Luxuriously soft cashmere sweater with ribbed cuffs and hem. A wardrobe essential that combines comfort with understated elegance.",
    price: 1899,
    category: "Knitwear",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal", "Grey", "Black"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Linen Blend Shirt",
    description:
      "Relaxed-fit shirt in a breathable linen blend. Perfect for warm days with its effortless Scandinavian style.",
    price: 799,
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Sand"],
    inStock: true,
  },
  {
    id: "6",
    name: "Tailored Wool Blazer",
    description:
      "A structured single-breasted blazer in premium wool. Designed with clean lines for a polished, professional look.",
    price: 2199,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
  },
  {
    id: "7",
    name: "Merino Wool Cardigan",
    description:
      "A versatile cardigan knitted from fine merino wool. Features a relaxed fit and classic button closure.",
    price: 1499,
    category: "Knitwear",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Forest Green", "Burgundy"],
    inStock: true,
  },
  {
    id: "8",
    name: "Slim Fit Chinos",
    description:
      "Modern slim-fit chinos in a comfortable cotton stretch blend. A versatile piece for both casual and semi-formal occasions.",
    price: 899,
    category: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    inStock: true,
  },
  {
    id: "9",
    name: "Quilted Down Jacket",
    description:
      "Lightweight yet warm quilted jacket filled with responsibly sourced down. Water-resistant outer shell for all-weather protection.",
    price: 1799,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Olive"],
    inStock: true,
  },
  {
    id: "10",
    name: "Silk Blend Scarf",
    description:
      "A luxurious scarf woven from a silk and wool blend. Adds an elegant touch to any outfit while keeping you warm.",
    price: 599,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    sizes: ["One Size"],
    colors: ["Grey", "Burgundy", "Navy"],
    inStock: true,
  },
  {
    id: "11",
    name: "Leather Belt",
    description:
      "Full-grain leather belt with a sleek minimalist buckle. A timeless accessory built to last.",
    price: 449,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Tan"],
    inStock: true,
  },
  {
    id: "12",
    name: "Cotton Poplin Dress",
    description:
      "A minimalist midi dress in crisp cotton poplin. Features a relaxed silhouette with subtle pleating details.",
    price: 1199,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Sage"],
    inStock: true,
    featured: true,
  },
];

export const categories = [
  "All",
  "Outerwear",
  "Tops",
  "Bottoms",
  "Knitwear",
  "Dresses",
  "Accessories",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All" || !category) {
    return products;
  }
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm),
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  }).format(price);
}
