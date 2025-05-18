import { supabase } from "./supabase";
import { User } from "@/types/supabaseTypes";

//реєстрація користувача
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

//Верифікація емейлу за OTP кодом
export async function verifyEmailOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    console.error(error);
  }

  return { data, error };
}

export async function resendEmailOtp(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) {
    console.error(error);
  }
}

//Відновити пароль
export async function recoverPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error(error);
  }

  return data;
}

//Оновити пароль користувача
export async function updateUser(new_password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });
  if (error) {
    console.error(error);
  }

  return data;
}

//зайти на акк
export async function signInWithEmailPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
  }

  return { data, error };
}

//перевіряє чи користувач зайшов на акаунт
export async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error(error);
  }

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }

  document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  return { error };
}

//зайти на facebook
export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

//зайти на google
export async function signInWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

//зайти на discord
export async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

//Отримати фотограійї користувача
export async function getProfileImage(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("profile_image")
    .eq("id", id)
    .single();

  if (error || !data) return { data: null, error };

  return { data: data.profile_image, error: null };
}

export async function getAllInfoProfile(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export async function updateUserInfo(user: User) {
  const { id, ...rest } = user;

  const { data, error } = await supabase
    .from("users")
    .update(rest)
    .eq("id", id);

  console.log(data);

  if (error || !data) return { data: null, error };

  return { data, error: null };
}

export const uploadProfileImage = async (file: File, userId: string) => {
  // Завантаження файлу
  const { error: uploadError } = await supabase.storage
    .from("profile")
    .upload(`avatar.png`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  // Отримання публічного посилання
  const { data: urlData } = supabase.storage
    .from("profile")
    .getPublicUrl(`/avatar.png`);

  const publicUrl = urlData.publicUrl;

  // Оновлення поля у таблиці "users"
  const { error: updateError } = await supabase
    .from("users")
    .update({ profile_image: publicUrl })
    .eq("id", userId);

  if (updateError) throw updateError;

  return publicUrl;
};

export function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      // шукаємо щось типу "userId=123"
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}
