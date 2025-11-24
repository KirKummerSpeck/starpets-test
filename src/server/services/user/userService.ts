import { userRepository } from "@/server/repositories/user";

import type { IUser } from "@shared/api/user/types";
import type { IBuyResponse } from "@/server/models/user/buy.dto";

export const userService = {
  async getUserProfile(userId: number): Promise<IUser> {
    const user = userRepository.findById(userId);

    if (!user) {
      throw createError({ statusCode: 404, message: "Пользователь не найден" });
    }

    return user;
  },

  async processPurchase(userId: number, cost: number): Promise<IBuyResponse> {
    const user = await this.getUserProfile(userId);

    if (cost < 0) {
      throw createError({
        statusCode: 400,
        message: "Стоимость не может быть отрицательной",
      });
    }

    if (user.balance < cost) {
      throw createError({
        statusCode: 402,
        message: "Недостаточно средств",
        data: {
          currentBalance: user.balance,
          required: cost,
        },
      });
    }

    const newBalance = Number((user.balance - cost).toFixed(2));

    userRepository.updateBalance(userId, newBalance);

    return {
      newBalance,
    };
  },
};
