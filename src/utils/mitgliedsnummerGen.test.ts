import { expect, test } from "vitest";
import { mitgliedsnummerGen } from "./mitgliedsnummerGen.ts";

test("generates member number with correct format", () => {
  const memberNumber = mitgliedsnummerGen("John", "Doe");
  expect(memberNumber).toMatch(/^[A-Z][A-Z]\d{4}[a-z]$/);
});

test("uses surname initial first, then forename initial", () => {
  const memberNumber = mitgliedsnummerGen("John", "Doe");
  expect(memberNumber[0]).toBe("D");
  expect(memberNumber[1]).toBe("J");
});

test("output is always 7 characters long", () => {
  expect(mitgliedsnummerGen("A", "B")).toHaveLength(7);
  expect(mitgliedsnummerGen("John", "Doe")).toHaveLength(7);
});

test("initials preserve the case of the input", () => {
  const memberNumber = mitgliedsnummerGen("john", "doe");
  expect(memberNumber[0]).toBe("d");
  expect(memberNumber[1]).toBe("j");
});

test("successive calls produce different results", () => {
  const results = new Set(
    Array.from({ length: 20 }, () => mitgliedsnummerGen("John", "Doe"))
  );
  expect(results.size).toBeGreaterThan(1);
});

