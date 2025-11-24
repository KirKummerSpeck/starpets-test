import { storage } from "@/server/utils/storage";
import type { IUser } from "@shared/api/user/types";

export const userRepository = {
  findById(id: number): IUser | null {
    return storage.users.find((user) => user.id === id) || null;
  },

  updateBalance(id: number, newBalance: number): IUser | null {
    const user = this.findById(id);

    if (user) {
      user.balance = newBalance;

      return user;
    }

    return null;
  },
};
