// js/home.js
import { supabase } from "./supabase.js";

const homeItems = document.getElementById("homeItems");

async function loadHomeItems() {
  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("is_reserved", false)
    .order("created_at", { ascending: false })
    .limit(6);

  homeItems.innerHTML = "";

  data.forEach(item => {
    homeItems.innerHTML += `
      <div class="item-card">
        <img src="${item.image_url}">
        <p>${item.price === 0 ? "Free" : "$" + item.price}</p>
      </div>
    `;
  });
}

loadHomeItems();
