import { expect, test } from "vitest";
import { getInitialFormItems } from "./getInitialFormItems";
import { allowedFormKeys, requiredFormKeys } from "../const";
import type { AllowedFormKeys } from "../models/AllowedFormKeys";

const keys = allowedFormKeys as unknown as AllowedFormKeys[];

test("returns one item per key in the same order", () => {
  const items = getInitialFormItems(keys, requiredFormKeys);
  expect(items).toHaveLength(allowedFormKeys.length);
  expect(items.map((i) => i.key)).toEqual([...allowedFormKeys]);
});

test("all values start as empty strings", () => {
  const items = getInitialFormItems(keys, requiredFormKeys);
  expect(items.every((i) => i.value === "")).toBe(true);
});

test("required flags match requiredFormKeys", () => {
  const items = getInitialFormItems(keys, requiredFormKeys);
  for (const item of items) {
    expect(item.required).toBe(requiredFormKeys.includes(item.key));
  }
});

test("works correctly with an empty required list", () => {
  const items = getInitialFormItems(keys, []);
  expect(items.every((i) => i.required === false)).toBe(true);
});
