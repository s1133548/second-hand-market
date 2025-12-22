// js/login.js
import { supabase } from "./supabase.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const msg = document.getElementById("msg");

function showMsg(text, type = "error") {
  msg.textContent = text;
  msg.className = type;
  msg.style.display = "block";
}

// EMAIL SIGN UP
document.getElementById("signupBtn").addEventListener("click", async () => {
  msg.style.display = "none";

  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) {
    showMsg(error.message);
  } else {
    showMsg("Account created successfully 💚 You can now log in.", "success");
  }
});

// EMAIL LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
  msg.style.display = "none";

  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) {
    showMsg(error.message);
  } else {
    window.location.href = "index.html";
  }
});

// GOOGLE LOGIN
document.getElementById("googleBtn").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://your-username.github.io/second-hand-market/index.html"
    },
  });

  if (error) {
    showMsg(error.message);
  }
});
