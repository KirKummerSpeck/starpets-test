import { useCartStore } from "@/entities/cart/model/store";
import { useUserStore } from "@/entities/user/model/store";

export const useCheckout = () => {
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const handleCheckout = async () => {
    const cost = cartStore.totalPriceNumber;
    const balance = userStore.getBalance;

    if (cartStore.items.length === 0) {
      return;
    }

    if (balance < cost) {
      alert("Недостаточно средств!");
      return;
    }

    try {
      await userStore.decreaseBalance(cost);

      alert("Покупка успешна!");
    } catch (error) {
      alert("покупка не успешна");

      throw error;
    }

    cartStore.clearCart();

    cartStore.toggleCart();
  };

  return {
    handleCheckout,
  };
};
