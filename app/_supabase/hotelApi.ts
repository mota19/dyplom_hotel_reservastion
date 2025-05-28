import { supabase } from "./supabase";
import { Filters } from "@/types/filters";

export async function getPopularDestinations() {
  const { data, error } = await supabase
    .from("accommodations")
    .select("country")
    .limit(6);

  if (error || !data) return { data: null, error };

  const bucketUrl =
    "https://wuyjwewhunrbgamxmsrz.supabase.co/storage/v1/object/public/destinations";

  const destinationsWithImages = data.map(({ country }) => ({
    country,
    image: `${bucketUrl}/${country}.jpg`,
  }));

  return { data: destinationsWithImages, error: null };
}

export async function getPopularAccommodations() {
  const { data, error } = await supabase
    .from("accommodations")
    .select("id, name, city, country, star_rating, pricePerNight, image")
    .order("star_rating", { ascending: false })
    .limit(15);

  return { data, error };
}

export async function getBookingSearch(
  city: string,
  filters: Filters,
  startDate: string,
  endDate: string,
  guests: number = 1,
) {
  const { price, rating, types, country, amenities } = filters;

  // 🔍 1. Отримати всі кімнати з достатньою місткістю
  const { data: allCandidateRooms, error: roomError } = await supabase
    .from("rooms")
    .select(
      `
    id,
    accommodation_id,
    pricepernight,
    room_type,
    capacity,
    room_beds (
      bed_count,
      bed_types (
        id,
        name
      )
    )
  `,
    )
    .gte("capacity", guests);

  if (roomError || !allCandidateRooms) {
    return {
      data: null,
      error: roomError || new Error("Failed to fetch rooms"),
    };
  }

  const candidateRoomIds = allCandidateRooms.map((r) => r.id);

  // 🛑 2. Отримати бронювання, які перекриваються з вибраними датами
  const { data: bookedRooms, error: bookingError } = await supabase
    .from("bookings")
    .select("room_id")
    .in("room_id", candidateRoomIds)
    .or(`and(start_date.lte.${endDate},end_date.gte.${startDate})`);

  if (bookingError) {
    return { data: null, error: bookingError };
  }

  const bookedRoomIds = new Set(bookedRooms?.map((b) => b.room_id) ?? []);

  // ✅ 3. Вибрати лише вільні кімнати
  const availableRooms = allCandidateRooms.filter(
    (r) => !bookedRoomIds.has(r.id),
  );

  if (availableRooms.length === 0) {
    return { data: [], error: null };
  }

  const availableAccommodationIds = [
    ...new Set(availableRooms.map((r) => r.accommodation_id)),
  ];

  // 📦 4. Формуємо запит до житла з фільтрами
  let query = supabase
    .from("accommodations")
    .select("*")
    .in("id", availableAccommodationIds);

  if (city && city.trim() !== "") {
    query = query.ilike("city", `${city}%`);
  }

  if (country.length > 0 && country[0].trim() !== "") {
    query = query.ilike("country", `${country}%`);
  }

  if (types.length > 0) {
    const { data: typesData, error: typeError } = await supabase
      .from("accommodation_types")
      .select("id, name")
      .in("name", types);

    if (typeError || !typesData) {
      return {
        data: null,
        error: typeError || new Error("Failed to fetch types"),
      };
    }

    const typeIds = typesData.map((t) => t.id);
    query = query.in("type_id", typeIds);
  }

  if (price.length > 0) {
    const priceRanges: { [key: string]: number[] } = {
      "Less than $50": [0, 50],
      "$50 to $100": [50, 100],
      "$100 to $150": [100, 150],
      "$150 and more": [150, 10000],
    };

    const priceFilters = price
      .map((label) => {
        const [min, max] = priceRanges[label];
        return `and(pricePerNight.gte.${min},pricePerNight.lte.${max})`;
      })
      .join(",");

    query = query.or(priceFilters);
  }

  if (rating.length > 0) {
    const ratings: { [key: string]: { min: number; max: number } } = {
      Any: { min: 1, max: 10 },
      Excellent: { min: 9, max: 10 },
      "Very good": { min: 7, max: 9 },
      Good: { min: 5, max: 7 },
      Fair: { min: 3, max: 5 },
      Poor: { min: 1, max: 3 },
    };

    const ratingFilters = rating
      .map((label) => {
        const { min, max } = ratings[label];
        return `and(star_rating.gte.${min},star_rating.lte.${max})`;
      })
      .join(",");

    query = query.or(ratingFilters);
  }

  if (amenities.length > 0) {
    const { data: amenityData, error: amenityError } = await supabase
      .from("amenities")
      .select("id")
      .in("name", amenities);

    if (amenityError || !amenityData) {
      return {
        data: null,
        error: amenityError || new Error("Failed to fetch amenities"),
      };
    }

    const amenityIds = amenityData.map((a) => a.id);

    const { data: accommodationAmenityData, error: accAmenityError } =
      await supabase
        .from("accommodation_amenities")
        .select("accommodation_id")
        .in("amenity_id", amenityIds);

    if (accAmenityError || !accommodationAmenityData) {
      return {
        data: null,
        error:
          accAmenityError ||
          new Error("Failed to fetch accommodation_amenities"),
      };
    }

    const matchedIds = [
      ...new Set(accommodationAmenityData.map((a) => a.accommodation_id)),
    ];
    query = query.in("id", matchedIds);
  }

  // 🏠 5. Отримуємо житло
  const { data, error } = await query;

  if (error) return { data: null, error };

  if (data && data.length > 0) {
    const accommodationIds = data.map((a) => a.id);

    // З доступних кімнат вибираємо найдешевшу для кожного accommodation
    const cheapestRoomByAccommodation = new Map<number, unknown>();

    const availableCheapestRooms = availableRooms
      .filter(
        (r) =>
          accommodationIds.includes(r.accommodation_id) &&
          r.pricepernight !== null,
      )
      .sort((a, b) => a.pricepernight! - b.pricepernight!);

    for (const room of availableCheapestRooms) {
      if (!cheapestRoomByAccommodation.has(room.accommodation_id)) {
        cheapestRoomByAccommodation.set(room.accommodation_id, room);
      }
    }

    const enrichedData = data.map((acc) => ({
      ...acc,
      cheapestRoom: cheapestRoomByAccommodation.get(acc.id) || null,
    }));

    return { data: enrichedData, error: null };
  }

  return { data: [], error: null };
}

export async function getAccommodationsByType() {
  const { data: types, error: typeError } = await supabase
    .from("accommodation_types")
    .select("id")
    .eq("name", "Hotel")
    .single();

  if (typeError) {
    return { data: null, error: typeError };
  }

  const { data, error } = await supabase
    .from("accommodations")
    .select("*, accommodation_types(name)")
    .eq("type_id", types.id);

  return { data, error };
}

export async function getAccommodationById(id: number) {
  const { data, error } = await supabase
    .from("accommodations")
    .select(
      `
      *,
      accommodation_amenities (
        amenities (
          id,
          name
        )
      ),
      rooms (
        *,
        room_beds (
          bed_count,
          bed_types (
            id,
            name
          )
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching accommodation:", error);
    return null;
  }

  return data;
}
export async function saveUserData(
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  country?: string | null,
  phone_number?: string | null,
  birthday?: string | undefined,
  role?: string,
) {
  const { data, error } = await supabase.from("users").insert([
    {
      id,
      first_name,
      last_name,
      country,
      phone_number,
      birthday,
      role,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function saveBooking(booking: {
  user_id: string;
  start_date: string;
  end_date: string;
  status: string;
  room_id: number;
  numberOfGuests: number;
}) {
  const { data, error } = await supabase.from("bookings").insert([booking]);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export async function getBookedDatesById(roomId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("start_date, end_date")
    .eq("room_id", roomId);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export async function getBookingById(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "start_date, end_date, id, room_id (name, capacity, pricepernight,room_type,sqm, image, room_beds (bed_count, bed_types (id,name)))",
    )
    .eq("user_id", userId);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}
