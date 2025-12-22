// js/navbar.js
import { supabase } from "./supabase.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const { data } = await supabase.auth.getSession();

if (data.session) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
} else {
  logoutBtn.style.display = "none";
}

logoutBtn.onclick = async () => {
  await supabase.auth.signOut();
  location.reload();
};
