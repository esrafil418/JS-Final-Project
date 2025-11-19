export const authHelper = {
  setToken(token) {
    console.log("Saving token:", token);
    localStorage.setItem("token", token);
  },

  getToken() {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
    return token;
  },

  clearToken() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
