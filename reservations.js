async function loadReservations(user) {
  const { data, error } = await supabase
    .from("reservations")
    .select(`
      pickup_date,
      created_at,
      items (
        title,
        location,
        donor_email
      )
    `)
    .eq("user_id", user.id)   
    .order("created_at", { ascending:false });

  if (error) {
    console.error(error);
    list.innerHTML = "<p>Error loading reservations.</p>";
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = `<p style="color:#8ba0a4">You have no reservations yet.</p>`;
    return;
  }

  list.innerHTML = "";
  data.forEach(r => {
    const div = document.createElement("div");
    div.className = "reservation";
    div.innerHTML = `
      <h3>${r.items.title}</h3> 
      <p>📍 ${r.items.location}</p>
      <p>📅 Pickup date: ${r.pickup_date}</p>
      <p>📧 Donor notified: ${r.items.donor_email}</p>
      <span class="badge">Reserved</span>
    `;
    list.appendChild(div);
  });
}
