import * as Linking from "expo-linking";

import { supabase } from "./supabase";

export type SignUpParams = {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  current_rank: string | null;
  target_rank: string | null;
  unit: string;
  joining_year: number | null;
};

// Sign up with email/password. Profile fields go into user_metadata and are
// copied into public.profiles by the on_auth_user_created DB trigger.
// NOTE: role is NEVER sent from the client — the trigger forces role = 'USER'.
export function signUpWithProfile(params: SignUpParams) {
  const { email, password, ...meta } = params;
  return supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: meta.full_name,
        phone: meta.phone,
        email: email.trim().toLowerCase(),
        current_rank: meta.current_rank,
        target_rank: meta.target_rank,
        unit: meta.unit,
        joining_year: meta.joining_year,
      },
    },
  });
}

export function signInEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
}

export function logout() {
  return supabase.auth.signOut();
}

// Sends a recovery email. The link deep-links back to /reset-password.
export function forgotPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: Linking.createURL("/reset-password"),
  });
}

// Call on the reset-password screen once a recovery session is active.
export function resetPassword(password: string) {
  return supabase.auth.updateUser({ password });
}

export function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value.trim());
}