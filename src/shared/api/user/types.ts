export type CurrencyCode = "USD" | "EUR" | "RUB";

export interface IUser {
  id: number;
  userName: string;
  avatar: string;
  balance: number;
  currency: CurrencyCode;
}
