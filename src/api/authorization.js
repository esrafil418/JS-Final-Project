import { BASE_URL } from "../constants";
import { router } from "../utils/router";
import { store } from "../utils/store";
import { authHelper } from "../utils/auth";

//! Main Auth Request 
export async function authRequest(endpoint) {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const messageEl = document.getElementById("log-message");

  const username = usernameInput?.value.trim() || "";
  const password = passwordInput?.value.trim() || "";

  if (!username || !password) {
    if (messageEl) {
      messageEl.innerText = "Please fill in all fields.";
      messageEl.style.color = "red";
    }
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      store.setState("user", data);

      if (data.token) {
        authHelper.setToken(data.token);
      }

      if (messageEl) {
        const successMsg = endpoint.includes("signup")
          ? "Registration successful! Moving to login page"
          : "Login successful!";

        messageEl.innerText = successMsg;
        messageEl.style.color = "green";
      }

      setTimeout(() => {
        router.navigate(endpoint.includes("signup") ? "/login" : "/");
      }, 1500);

      return data;
    }

    if (messageEl) {
      const errorMsg = data.message || "Something went wrong";
      messageEl.innerText = errorMsg;
      messageEl.style.color = "red";
    }
  } catch (err) {
    console.error("Network error:", err);
    const messageEl = document.getElementById("log-message");
    if (messageEl) {
      messageEl.innerText = "Cannot connect to server.";
      messageEl.style.color = "red";
    }
  }
}
