export type Product = {
  id: number;
  handle: string;
  name: string;
  name_fr: string;
  description: string;
  description_fr: string;
  price: number;
  price_24: number;
  image: string;
  hover_image: string;
  menu_image: string;
  gallery: string[];
  color: string;
  text_color: string;
  sort_order: number;
};

export type CartItem = {
  id: number;
  session_id: string;
  product_id: number;
  variant: string;
  quantity: number;
  price: number;
  products: Product;
};

export type Store = { id: number; name: string; address: string; city: string; postal_code: string; phone: string };
export type Faq = { id: number; category: string; question: string; answer: string; sort_order: number };
