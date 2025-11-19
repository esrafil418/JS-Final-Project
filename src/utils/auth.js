export const authHelper = {
  setToken(token) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  setUsername(username) {
    localStorage.setItem("username", username);
  },

  getUsername() {
    return localStorage.getItem("username");
  },

  clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("onboarded");
  },
};
