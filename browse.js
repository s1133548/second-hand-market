// js/browse.js
import { supabase } from "./supabase.js";
import { requireLogin } from "./auth.js";

const itemsContainer = document.getElementById("items");
const modal = document.getElementById("modal");
const reserveBtn = document.getElementById("reserveBtn");
const pickupDateInput = document.getElementById("pickupDate");

let selectedItem = null;

/* =========================
   LOAD ITEMS
========================= */
export async function loadItems(category = "All") {
  itemsContainer.innerHTML = "<p>Loading items...</p>";

  let query = supabase
    .from("items")
    .select("*")
    .eq("is_reserved", false)
    .order("created_at", { ascending: false });

  if (category !== "All") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Load items error:", error);
    itemsContainer.innerHTML = "<p>Failed to load items.</p>";
    return;
  }

  itemsContainer.innerHTML = "";

  if (!data || data.length === 0) {
    itemsContainer.innerHTML = "<p>No items available.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p class="price">${item.price === 0 ? "Free" : "$" + item.price}</p>
      <p class="location">📍 ${item.location}</p>
    `;

    card.addEventListener("click", () => openModal(item));
    itemsContainer.appendChild(card);
  });
}

/* =========================
   OPEN MODAL
========================= */
function openModal(item) {
  selectedItem = item;

  document.getElementById("modalTitle").innerText = item.title;
  document.getElementById("modalDesc").innerText = item.description || "";
  document.getElementById("modalPrice").innerText =
    item.price === 0 ? "Free" : "$" + item.price;
  document.getElementById("modalLocation").innerText = item.location || "";

  // reset pickup date
  pickupDateInput.value = "";

  modal.style.display = "flex";
}

/* =========================
   RESERVE ITEM
========================= */
reserveBtn.addEventListener("click", async () => {
  if (!selectedItem) return;

  // Require login
  const user = await requireLogin("login.html?redirect=browse");
  if (!user) return;

  const pickupDate = pickupDateInput.value;
  if (!pickupDate) {
    alert("Please select a pickup date.");
    return;
  }

  reserveBtn.disabled = true;

  /* 1️⃣ Insert reservation */
  const { error: reservationError } = await supabase
    .from("reservations")
    .insert({
      item_id: selectedItem.id,
      user_id: user.id,
      pickup_date: pickupDate
    });

  if (reservationError) {
    console.error("Reservation error:", reservationError);
    alert("Failed to reserve item.");
    reserveBtn.disabled = false;
    return;
  }

  /* 2️⃣ Mark item as reserved */
  const { error: updateError } = await supabase
    .from("items")
    .update({ is_reserved: true })
    .eq("id", selectedItem.id);

  if (updateError) {
    console.error("Item update error:", updateError);
    alert("Reservation saved, but item status failed to update.");
  }

  /* 3️⃣ UI update */
  alert("Item reserved successfully 💚");

  modal.style.display = "none";
  reserveBtn.disabled = false;

  loadItems();
});

/* =========================
   INIT
========================= */
loadItems();
