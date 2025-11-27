import { BASE_URL } from "../../constants";
import { router } from "../../utils/router";
import { authHelper } from "../../utils/auth";

//! Main Auth Request - Handles both login and signup
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
      console.log("data:", data);

      authHelper.setUsername(username);
      console.log("username:", username);

      if (data.token && !endpoint.includes("signup")) {
        authHelper.setToken(data.token);
        console.log("login token:", data.token);
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
      }, 2000);
    }

    if (!res.ok && messageEl) {
      const errorMsg = data.message || "Something went wrong";
      messageEl.innerText = errorMsg;
      messageEl.style.color = "red";
    }
  } catch (err) {
    console.error("error:", err);
    const messageEl = document.getElementById("log-message");
    if (messageEl) {
      messageEl.innerText = "Cannot connect to server.";
      messageEl.style.color = "red";
    }
  }
}
