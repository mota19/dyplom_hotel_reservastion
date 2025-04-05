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

export async function signInWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function signOutWithFacebook() {
  await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `http://example.com/auth/callback`,
    },
  });
}

export async function signInWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });

  if (error) {
    console.error(error);
  }

  return data;
}
