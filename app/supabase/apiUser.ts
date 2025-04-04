import { supabase } from "./supabase";

export async function postRegisterUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
  }

  return data;
}
