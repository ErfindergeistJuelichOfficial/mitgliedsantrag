import { expect, test } from "vitest";
import { mitgliedsnummerGen } from "./mitgliedsnummerGen.ts";


test("generates member number correctly", () => {
  // https://vitest.dev/api/expect.html#expect-stringmatching
  const forename = "John";
  const surname = "Doe";

  const memberNumber = mitgliedsnummerGen(forename, surname);

  const variety = {
    name: memberNumber,
    count: 1,
  }

  expect(variety).toEqual({
    name: expect.stringMatching(/[A-Z][A-Z]\d\d\d\d[a-z]/),
    count: 1,
  })
});

