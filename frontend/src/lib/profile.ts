import { supabase } from "./supabase";

export type Profile = {
  id: string;
  auth_user_id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  profile_image: string | null;
  current_rank: string | null;
  target_rank: string | null;
  unit: string | null;
  joining_year: number | null;
  role: string;
  premium: boolean;
  subscription_status: string;
  created_at: string;
  updated_at: string;
};

// Columns the client is ALLOWED to update (role / premium / subscription are
// column-level REVOKED at the database — the server rejects them regardless).
export type EditableProfile = Partial<
  Pick<Profile, "full_name" | "phone" | "email" | "profile_image" | "current_rank" | "target_rank" | "unit" | "joining_year">
>;

export async function loadMyProfile(): Promise<Profile | null> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function updateMyProfile(fields: EditableProfile): Promise<void> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) throw new Error("Not signed in");
  const { error } = await supabase
    .from("profiles")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("auth_user_id", user.id);
  if (error) throw error;
}