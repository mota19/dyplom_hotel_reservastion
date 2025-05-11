export interface PropPopularHotes {
  id: number;
  name: string;
  city: string | null;
  country: string | null;
  star_rating: number | null;
  pricePerNight: number | null;
  image: string | null;
}

export interface infoAboutBookingProp {
  destination: string;
  inDate: string;
  outDate: string;
  numberOfGuest: number;
}

export interface IuserProviderState {
  google: boolean;
  facebook: boolean;
  discord: boolean;
}

export type Accomodation = {
  city?: string | null;
  country?: string | null;
  created_at?: string | null;
  description?: string | null;
  id: number;
  image: string | null;
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
  pricePerNight?: number | null;
  star_rating?: number | null;
  type_id?: number;
  updated_at?: string | null;
};
