import { supabase } from "./supabase";

export async function getPopularDestinations() {
  const { data, error } = await supabase
    .from("accommodations")
    .select("country")
    .limit(6);

  return { data, error };
}

export async function getPopularAccommodations() {
  const { data, error } = await supabase
    .from("accommodations")
    .select("id, name, city, country, star_rating, pricePerNight")
    .order("star_rating", { ascending: false })
    .limit(15);

  return { data, error };
}

export async function getBookingSearch(city: string) {
  const { data, error } = await supabase
    .from("accommodations")
    .select(`city`)
    .ilike("city", `${city}%`);

  return { data, error };
}
