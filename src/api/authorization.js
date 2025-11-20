import { BASE_URL } from "../constants";
import { router } from "../utils/router";
import { authHelper } from "../utils/auth";

//! Main Auth Request - Handles both login and signup
export async function authRequest(endpoint) {
  // Get DOM elements for form inputs and message display
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const messageEl = document.getElementById("log-message");

  // Extract and trim input values
  const username = usernameInput?.value.trim() || "";
  const password = passwordInput?.value.trim() || "";

  // Validation: Check if all fields are filled
  if (!username || !password) {
    if (messageEl) {
      messageEl.innerText = "Please fill in all fields.";
      messageEl.style.color = "red";
    }
    return;
  }

  try {
    // Send authentication request to server
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    // Handle successful response
    if (res.ok) {
      console.log("data:", data);

      // Store username in localStorage
      localStorage.setItem("username", username);
      console.log("username:", username);

      // Store token if it's a login request (not signup)
      if (data.token && !endpoint.includes("signup")) {
        authHelper.setToken(data.token);
        console.log("login token:", data.token);
      }

      // Display success message
      if (messageEl) {
        const successMsg = endpoint.includes("signup")
          ? "Registration successful! Moving to login page"
          : "Login successful!";

        messageEl.innerText = successMsg;
        messageEl.style.color = "green";
      }

      // Redirect after delay
      setTimeout(() => {
        router.navigate(endpoint.includes("signup") ? "/login" : "/");
      }, 1500);
    }

    // Handle error response from server
    if (messageEl) {
      const errorMsg = data.message || "Something went wrong";
      messageEl.innerText = errorMsg;
      messageEl.style.color = "red";
    }
  } catch (err) {
    // Handle network errors
    console.error("error:", err);
    const messageEl = document.getElementById("log-message");
    if (messageEl) {
      messageEl.innerText = "Cannot connect to server.";
      messageEl.style.color = "red";
    }
  }
}
