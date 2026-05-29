import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // --- State ---
  const token = ref<string | null>(localStorage.getItem("token"));
  const user = ref<any | null>(JSON.parse(localStorage.getItem("user") || "null"));

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value);

  // --- Actions ---
  const setToken = (newToken: string, userData: any) => {
    token.value = newToken;
    user.value = userData;
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    logout,
  };
});