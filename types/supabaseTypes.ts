export interface PropPopularHotes {
  id: number;
  name: string;
  city: string | null;
  country: string | null;
  star_rating: number | null;
  pricePerNight: number | null;
  image: string | null;
  onClickText: string;
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
  email?: string;
  profileImage?: string | null;
  fileImage?: File | null;
}

type room_beds = {
  bed_count: number;
  bed_types: {
    id: number;
    name: string;
  };
};

type cheapestRoom = {
  accommodation_id?: number;
  id?: number;
  pricepernight?: number;
  capacity?: number;
  room_beds?: room_beds[];
  room_type?: string;
};

export type Accomodation = {
  city?: string | null;
  country?: string | null;
  created_at?: string | null;
  description?: string | null;
  id: number;
  cheapestRoom?: cheapestRoom | null;
  image: string | null;
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
  pricePerNight?: number | null;
  star_rating?: number | null;
  type_id?: number;
  updated_at?: string | null;
  nights?: number | null;
  onClick?: () => void;
};

export type User = {
  birthday: string | null;
  country: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  nationality: string | null;
  phone_number: string | null;
  profile_image: string | null;
  role: string | null;
};

export interface IAccommodationWithRelations {
  id: number;
  city: string | null;
  country: string | null;
  created_at: string | null;
  description: string | null;
  image: string | null;
  latitude: number | null;
  longitude: number | null;
  name: string;
  pricePerNight: number | null;
  reveiws: number | null;
  star_rating: number | null;
  type_id: number;
  updated_at: string | null;
  user_id: string | null;

  accommodation_amenities: {
    amenities: {
      id: number;
      name: string;
    };
  }[];

  rooms: {
    id: number;
    name: string | null;
    description: string | null;
    discount: number | null;
    image: string | null;
    pricepernight: number | null;
    sqm: number | null;
    room_type: string | null;
    accommodation_id: number;
    capacity: number | null;
    room_beds: {
      bed_count: number;
      bed_types: {
        id: number;
        name: string;
      };
    }[];
  }[];
}
