export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  category?: Category;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode?: string;
    qrCode?: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  id: number;
  product_id: number;
  rating: number;
  comment?: string;
  date: string;
  reviewer_name: string;
  reviewer_email: string;
  created_at?: string;
}

export interface CartItem {
  id: number;
  cart_id?: number;
  product_id: number;
  user_id?: number;
  quantity: number;
  created_at?: string;
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
}

export type ProductFormData = Pick<
  Product,
  | "title"
  | "brand"
  | "price"
  | "description"
  | "thumbnail"
  | "categoryId"
  | "stock"
>;
