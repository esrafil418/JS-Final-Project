import { BASE_URL } from "../constants";
import { router } from "../utils/router";
import { store } from "../utils/store";

//? Get input value
function getInputValue(id) {
  return document.getElementById(id)?.value.trim() ?? "";
}

//? Show message
function setMessage(id, message, type = "error") {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerText = message;
  el.style.color = type === "success" ? "green" : "red";
}

//? Save token in Cookie
function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax;`;
}

//! Main Auth Request
export async function authRequest(endpoint) {
  const username = getInputValue("username");
  const password = getInputValue("password");
  const messageId = "log-message";

  if (!username || !password) {
    setMessage(messageId, "Please fill in all fields.");
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
      // Save user in store
      store.setState("user", data);

      // Save token in cookie
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCookie("token", data.token, 30);
      }

      // Show success message
      const successMsg = endpoint.includes("signup")
        ? "Signup successful!"
        : "Login successful!";

      setMessage(messageId, successMsg, "success");

      setTimeout(() => router.navigate("/"), 1200);

      return data;
    }

    // Backend error
    const msg = Array.isArray(data?.message)
      ? data.message[0]
      : data?.message || "Unspecified error";

    setMessage(messageId, msg);
    return data;
  } catch (err) {
    console.error("NETWORK ERROR:", err);
    setMessage(messageId, "Cannot connect to server.");
  }
}
