import type { IUser } from "@shared/api/user/types";

class InMemoryStorage {
  public users: IUser[] = [
    {
      id: 1,
      userName: "StarPets LTD",
      avatar:
        "https://cdn.starpets.pw/AM/110x110/bat_dragon_146462647561927032198913846494863876793.webp",
      balance: 10000,
      currency: "USD",
    },
  ];
}

export const storage = new InMemoryStorage();
