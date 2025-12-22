// js/login.js
import { supabase } from "./supabase.js";

// ============================
// DOM ELEMENTS
// ============================
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const googleBtn = document.getElementById("googleLogin");
const msgBox = document.getElementById("msg");

// ============================
// HELPERS
// ============================
function showMsg(text, type = "error") {
  msgBox.textContent = text;
  msgBox.className = type;
  msgBox.style.display = "block";
}

function getRedirectUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "index.html";
}

// ============================
// EMAIL LOGIN / SIGNUP
// ============================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgBox.style.display = "none";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showMsg("Please enter email and password");
    return;
  }

  // Try LOGIN first
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password
    });

  if (loginError) {
    // If login fails, try SIGN UP
    const { data: signupData, error: signupError } =
      await supabase.auth.signUp({
        email,
        password
      });

    if (signupError) {
      showMsg(signupError.message);
      return;
    }

    showMsg(
      "Account created! Please check your email to confirm your account.",
      "success"
    );
    return;
  }

  // Login success
  window.location.href = getRedirectUrl();
});

// ============================
// GOOGLE LOGIN
// ============================
googleBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/" + getRedirectUrl()
    }
  });

  if (error) {
    showMsg(error.message);
  }
});
