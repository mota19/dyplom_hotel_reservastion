import { supabase } from "./supabase";

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

  return data;
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

  return data;
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

//вийти з facebook
export async function signOutWithFacebook() {
  await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `http://example.com/auth/callback`,
    },
  });
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
