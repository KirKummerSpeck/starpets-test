import { defineNuxtRouteMiddleware } from "#app";
import { useUserStore } from "@/entities/user/model/store";

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const userStore = useUserStore();

  if (userStore.user) {
    return;
  }

  await useAsyncData("auth-user-init", async () => {
    try {
      await userStore.fetchUser();
      return true;
    } catch (error) {
      console.error("Failed to fetch user in middleware", error);
      return null;
    }
  });
});
