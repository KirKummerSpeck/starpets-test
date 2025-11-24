import type { IUser } from "./types";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser | null>(null);

  const fetchUser = async () => {
    try {
      const data = await $fetch<IUser>("/api/v1/user");

      user.value = data;

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseBalance = async (cost: number) => {
    try {
      const data = await $fetch("/api/v1/user/buy", {
        method: "POST",
        body: {
          cost,
        },
      });

      if (user.value && data.newBalance !== undefined) {
        user.value.balance = data.newBalance;
      }

      return data;
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  const formattedBalance = computed(() => {
    if (!user.value) return "0 ₽";
    return `${user.value.balance.toLocaleString("ru-RU")} ₽`;
  });

  const getBalance = computed(() => user.value?.balance);
  const getName = computed(() => user.value?.userName);
  const getAvatar = computed(() => user.value?.avatar);

  return {
    // data
    user,

    // methods
    fetchUser,
    decreaseBalance,
    formattedBalance,

    //getters
    getBalance,
    getName,
    getAvatar,
  };
});
