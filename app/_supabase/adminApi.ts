import { supabase } from "./supabase";

export const getAccomodationByUser = async (user_id: string) => {
  const { data, error } = await supabase
    .from("accommodations")
    .select(
      `id, name, type_id (name), description, city, country, star_rating, image`,
    )
    .eq("user_id", user_id);

  if (error || !data) return { data: null, error };

  return { data, error: null };
};

export const getRoomsByUser = async (user_id: string) => {
  const { data, error } = await supabase
    .from("user_rooms_view")
    .select("*")
    .eq("owner_id", user_id);

  if (error || !data) return { data: null, error };

  return { data, error: null };
};

export const insertAccommodation = async (
  accommodationData: {
    name: string;
    type_id: number;
    description: string;
    city: string;
    country: string;
    star_rating: number;
    image: string | null;
    user_id: string;
  },
  amenityIds: number[],
) => {
  const { data, error } = await supabase
    .from("accommodations")
    .insert([accommodationData])
    .select();

  if (error || !data || data.length === 0) return { data: null, error };

  const accommodationId = data[0].id;

  const amenitiesInsert = amenityIds.map((amenity_id) => ({
    accommodation_id: accommodationId,
    amenity_id,
  }));

  const { error: amenitiesError } = await supabase
    .from("accommodation_amenities")
    .insert(amenitiesInsert);

  if (amenitiesError) return { data: null, error: amenitiesError };

  return { data, error: null };
};

export const insertRoom = async (
  roomData: {
    name: string;
    description: string;
    accommodation_id: number;
    sqm: number;
    capacity: number;
    pricepernight: number;
    discount: number;
    room_type: string;
    image: string | null;
  },
  beds: { bed_type_id: number; bed_count: number }[],
) => {
  // 1. Insert into rooms
  const { data, error } = await supabase
    .from("rooms")
    .insert([roomData])
    .select();

  if (error || !data) return { data: null, error };

  const roomId = data[0].id;

  // 2. Insert into room_beds
  const bedsInsert = beds.map(({ bed_type_id, bed_count }) => ({
    room_id: roomId,
    bed_type_id,
    bed_count,
  }));

  const { error: bedsError } = await supabase
    .from("room_beds")
    .insert(bedsInsert);

  if (bedsError) return { data: null, error: bedsError };

  return { data, error: null };
};

export async function uploadImage(
  userId: string,
  storageName: string,
  file: File,
) {
  const filePath = `${userId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(storageName)
    .upload(filePath, file);

  if (error) return { publicUrl: null, error };

  const { data: urlData } = supabase.storage
    .from(storageName)
    .getPublicUrl(filePath);

  return { publicUrl: urlData.publicUrl, error: null };
}

export async function getAccommodationNameByUser(user_id: string) {
  const { data, error } = await supabase
    .from("accommodations")
    .select(`id, name`)
    .eq("user_id", user_id);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export async function getBookingByUser(userId: string) {
  const { data, error } = await supabase
    .from("booking_details")
    .select(
      "booking_id, accommodation_name, room_id, guest_name, guest_email, status, numberOfGuests, start_date, end_date, pricepernight",
    )
    .eq("owner_id", userId);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}
