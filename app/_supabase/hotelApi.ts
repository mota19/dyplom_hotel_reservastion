import { supabase } from "./supabase";

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

export async function getBookingSearch(city: string) {
  const { data, error } = await supabase
    .from("accommodations")
    .select(`city`)
    .ilike("city", `${city}%`);

  return { data, error };
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
