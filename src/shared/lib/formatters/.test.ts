import { formatString } from "./string";
import { it, describe, expect } from "vitest";

describe("format string", () => {
  it("возвращает пустую строку, если передан null", () => {
    expect(formatString(null)).toBe("");
  });

  it("возвращает пустую строку, если передана пустая строка", () => {
    expect(formatString("")).toBe("");
  });

  it("форматирует слово без нижнего подчёркивания", () => {
    expect(formatString("hello")).toBe("Hello");
  });

  it("форматирует строку с нижними подчёркиваниями", () => {
    expect(formatString("mega_neon_pet")).toBe("Mega Neon Pet");
  });

  it("корректно работает со строкой в верхнем регистре", () => {
    expect(formatString("ULTRA_RARE")).toBe("Ultra Rare");
  });
});
