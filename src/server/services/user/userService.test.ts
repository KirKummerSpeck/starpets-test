import { describe, it, expect, vi, beforeEach } from "vitest";

import { userService } from "@/server/services/user/userService";
import { userRepository } from "@/server/repositories/user";
import type { IUser } from "@shared/api/user/types";

vi.stubGlobal(
  "createError",
  (options: { message?: string; statusCode?: number }) => {
    const error = new Error(options.message || "Unknown Error");

    // @ts-ignore
    error.statusCode = options.statusCode;
    return error;
  }
);

vi.mock("@/server/repositories/user", () => ({
  userRepository: {
    findById: vi.fn(),
    updateBalance: vi.fn(),
  },
}));

describe("userService", () => {
  const mockUser: IUser = {
    id: 1,
    userName: "StarPetsUser",
    avatar: "avatar.png",
    balance: 100,
    currency: "USD",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserProfile", () => {
    it("OK - пользователь найден", async () => {
      const localMockUser = { ...mockUser, balance: 500 };

      vi.mocked(userRepository.findById).mockReturnValue(localMockUser);

      const result = await userService.getUserProfile(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(localMockUser);
    });

    it("ERROR - пользователь не найден", async () => {
      vi.mocked(userRepository.findById).mockReturnValue(null);

      await expect(userService.getUserProfile(1)).rejects.toThrowError(
        "Пользователь не найден"
      );
    });
  });

  describe("processPurchase", () => {
    it("OK - успешная покупка", async () => {
      vi.mocked(userRepository.findById).mockReturnValue({
        ...mockUser,
        balance: 100,
      });

      const result = await userService.processPurchase(1, 40);

      expect(result).toEqual({ newBalance: 60 });
      expect(userRepository.updateBalance).toHaveBeenCalledWith(1, 60);
    });

    it("ERROR - недостаточно средств (402)", async () => {
      vi.mocked(userRepository.findById).mockReturnValue({
        ...mockUser,
        balance: 10,
      });

      await expect(userService.processPurchase(1, 40)).rejects.toThrowError(
        "Недостаточно средств"
      );

      expect(userRepository.updateBalance).not.toHaveBeenCalled();
    });

    it("ERROR - пользователь не найден", async () => {
      vi.mocked(userRepository.findById).mockReturnValue(null);

      await expect(userService.processPurchase(999, 50)).rejects.toThrowError(
        "Пользователь не найден"
      );
    });
  });
});
