export type FilterCategory = "popular" | "price" | "rating" | "types";

export type Filters = {
  popular: string[];
  price: string[];
  rating: string[];
  types: string[];
  country: string[];
};
