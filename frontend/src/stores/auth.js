import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      token: localStorage.getItem("token"),
      isAuth: !!localStorage.getItem("token"),
      details: JSON.parse(localStorage.getItem("details")),
    };
  },
  actions: {
    login(token, details) {
      (this.isAuth = true), (this.token = token), (this.details = details);
      localStorage.setItem("token", token);
      localStorage.setItem("details", JSON.stringify(details));
    },
    logout() {
      this.details = {};
      this.isAuth = false;
      this.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("details");
    },
    updateDetails(details) {
      this.details = details;
      localStorage.setItem("details", JSON.stringify(details));
    },
  },
});
