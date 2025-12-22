// js/auth.js
import { supabase } from "./supabase.js";

export async function requireLogin(redirect = "login.html") {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = redirect;
    return null;
  }
  return data.session.user;
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
