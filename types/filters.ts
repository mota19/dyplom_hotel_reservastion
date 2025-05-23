export type FilterCategory = "price" | "rating" | "types" | "amenities";

export type Filters = {
  price: string[];
  rating: string[];
  types: string[];
  country: string[];
  amenities: string[];
};
