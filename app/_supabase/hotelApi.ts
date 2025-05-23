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

export async function getBookingSearch(city: string, filters: Filters) {
  let query = supabase.from("accommodations").select("*");
  if (city && city.trim() !== "") {
    query = query.ilike("city", `${city}%`);
  }

  const { popular, price, rating, types, country } = filters;

  console.log(popular);

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

  // Виконання запиту
  const { data, error } = await query;

  return { data, error };
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
  console.log(booking);
  const { data, error } = await supabase.from("bookings").insert([booking]);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}
