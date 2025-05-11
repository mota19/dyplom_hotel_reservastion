export interface PropPopularHotes {
  id: number;
  name: string;
  city: string | null;
  country: string | null;
  star_rating: number | null;
  pricePerNight: number | null;
  image: string | null;
}

export interface BookingSearch {
  city: string | null;
}

export type BookingSearchArray = BookingSearch[] | null;

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
