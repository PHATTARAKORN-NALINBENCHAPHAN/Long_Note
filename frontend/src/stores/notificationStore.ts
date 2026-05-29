import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const message = ref("");
  const type = ref<"success" | "error" | "info">("info");
  const isVisible = ref(false);

  const showNotification = (msg: string, notificationType: "success" | "error" | "info" = "info") => {
    message.value = msg;
    type.value = notificationType;
    isVisible.value = true;

    // ตั้งเวลาให้หายไปเองภายใน 3 วินาที
    setTimeout(() => {
      isVisible.value = false;
    }, 3000);
  };

  return {
    message,
    type,
    isVisible,
    showNotification,
  };
});