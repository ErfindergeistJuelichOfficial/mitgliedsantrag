import { expect, test } from "vitest";
import dayjs from "dayjs";
import { getInitialSignatureItems } from "./getInitialSignatureItems";
import { allowedSignatureKeys, BLANK_PNG } from "../const";

test("returns one item per key in the same order", () => {
  const items = getInitialSignatureItems([...allowedSignatureKeys]);
  expect(items).toHaveLength(2);
  expect(items.map((i) => i.key)).toEqual(["form", "sepa"]);
});

test("date is today formatted as DD.MM.YYYY", () => {
  const items = getInitialSignatureItems(["form"]);
  expect(items[0].date).toBe(dayjs().format("DD.MM.YYYY"));
});

test("dataURL starts as the blank PNG constant", () => {
  const items = getInitialSignatureItems(["form"]);
  expect(items[0].dataURL).toBe(BLANK_PNG);
});

test("location starts as empty string", () => {
  const items = getInitialSignatureItems(["form"]);
  expect(items[0].location).toBe("");
});

test("aspectRatio starts as 1", () => {
  const items = getInitialSignatureItems(["sepa"]);
  expect(items[0].aspectRatio).toBe(1);
});
