import { storage, db } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
import { push, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

document.getElementById("donateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("itemName").value;
    const desc = document.getElementById("itemDesc").value;
    const category = document.getElementById("itemCategory").value;
    const imageFile = document.getElementById("itemImage").files[0];

    if (!imageFile) return alert("Please upload an image");

    // Step 1: Upload image
    const storageRef = ref(storage, "donated_items/" + Date.now() + "_" + imageFile.name);
    await uploadBytes(storageRef, imageFile);

    const imageURL = await getDownloadURL(storageRef);

    // Step 2: Save item data
    const itemsRef = push(ref(db, "donations/"));
    await set(itemsRef, {
        name,
        desc,
        category,
        imageURL
    });

    alert("Item donated successfully!");
    document.getElementById("donateForm").reset();
});
