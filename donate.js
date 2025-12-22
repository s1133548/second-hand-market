// js/donate.js
import { supabase } from "./supabase.js";

const form = document.getElementById("donateForm");
const msg = document.getElementById("msg");

function showMsg(text, type) {
  msg.textContent = text;
  msg.className = type;
  msg.style.display = "block";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const price = Number(document.getElementById("price").value);
  const location = document.getElementById("location").value;
  const file = document.getElementById("image").files[0];

  if (!file) {
    showMsg("Please upload an image", "error");
    return;
  }

  const fileName = `${Date.now()}-${file.name}`;

  // Upload image
  const { error: uploadError } = await supabase.storage
    .from("item-images")
    .upload(fileName, file);

  if (uploadError) {
    showMsg(uploadError.message, "error");
    return;
  }

  const { data } = supabase.storage
    .from("item-images")
    .getPublicUrl(fileName);

  // Save item
  const { error } = await supabase.from("items").insert([{
    title,
    description,
    category,
    price,
    location,
    image_url: data.publicUrl,
    is_reserved: false
  }]);

  if (error) {
    showMsg(error.message, "error");
  } else {
    showMsg("Thank you for lending a hand 💚", "success");
    form.reset();
  }
});
