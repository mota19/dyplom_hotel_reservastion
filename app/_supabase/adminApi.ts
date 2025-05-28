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

import { formatISO, subDays } from "date-fns";

export async function getDashboardInfo(
  userId: string,
  daysAgo: 7 | 30 | 90 | "All" = "All",
) {
  let query = supabase
    .from("booking_details")
    .select("booking_id, start_date, end_date, room_id, pricepernight, status")
    .eq("owner_id", userId);

  if (daysAgo !== "All") {
    const fromDate = formatISO(subDays(new Date(), daysAgo), {
      representation: "date",
    });
    query = query.gte("start_date", fromDate);
  }

  const { data: bookingDetails, error } = await query;

  if (error || !bookingDetails) return { bookingDetails: null, error };

  const { data: apartmentId, error: apartmentError } = await supabase
    .from("accommodations")
    .select("id, rooms (id)")
    .eq("user_id", userId);

  if (apartmentError || !apartmentId)
    return { apartmentId: null, apartmentError };

  return { dat: { apartmentId, bookingDetails }, apartmentError: null };
}

export async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  return { error };
}

export async function deleteAccommodation(id: number) {
  const { error } = await supabase.from("accommodations").delete().eq("id", id);

  return { error };
}

export async function deleteRoom(id: number) {
  const { error } = await supabase.from("rooms").delete().eq("id", id);

  return { error };
}

export async function getRoomsForUpdate(id: number) {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `id, name, description, capacity, pricepernight, room_type, image, discount, sqm, accommodation_id (name, id), room_beds (bed_count, bed_types (id,name))`,
    )
    .eq("id", id);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export async function RoomsUpdate(
  id: number,
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
) {
  console.log(beds);
  const { data, error } = await supabase
    .from("rooms")
    .update(roomData)
    .eq("id", id);

  const bedsInsert = beds.map(({ bed_type_id, bed_count }) => ({
    room_id: id,
    bed_type_id,
    bed_count,
  }));

  await supabase.from("room_beds").delete().eq("room_id", id);

  const { error: bedsInsertError } = await supabase
    .from("room_beds")
    .insert(bedsInsert);
  if (error || !data) {
    return { data: null, error };
  }
  if (bedsInsertError) return { data: null, error: bedsInsertError };
  return { data, error: null };
}
