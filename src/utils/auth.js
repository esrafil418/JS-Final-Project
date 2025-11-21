export const authHelper = {
  setToken(token) {
    // localStorage.setItem("token", token);
    //? save to cookie for (1) day 
    document.cookie = `token=${token}; path=/; max-age=86400;`;
  },

  getToken() {
    // return localStorage.getItem("token");
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((item) => item.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  },

  setUsername(username) {
    localStorage.setItem("username", username);
  },

  getUsername() {
    return localStorage.getItem("username");
  },

  clearAuth() {
    document.cookie = "token=; path=/; max-age=0"
    localStorage.removeItem("username");
    localStorage.removeItem("onboarded");
  },
};
