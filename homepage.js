import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const itemsContainer = document.getElementById("items-container");

onValue(ref(db, "donations/"), (snapshot) => {
    itemsContainer.innerHTML = "";

    snapshot.forEach((child) => {
        const item = child.val();

        const card = `
        <div class="item-card">
            <img src="${item.imageURL}" alt="Item Image">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="category">${item.category}</span>
        </div>`;

        itemsContainer.innerHTML += card;
    });
});
