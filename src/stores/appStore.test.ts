import { beforeEach, expect, test } from "vitest";
import { useAppStore } from "./appStore";
import { allowedFormKeys, allowedSignatureKeys, requiredFormKeys } from "../const";
import { getInitialFormItems } from "../utils/getInitialFormItems";
import { getInitialSignatureItems } from "../utils/getInitialSignatureItems";
import type { AllowedFormKeys } from "../models/AllowedFormKeys";

beforeEach(() => {
  useAppStore.setState({
    contributeValue: "noting",
    contributeFundingAmount: "",
    formItems: getInitialFormItems(
      allowedFormKeys as unknown as AllowedFormKeys[],
      requiredFormKeys
    ),
    signatures: getInitialSignatureItems([...allowedSignatureKeys]),
    printModalIsOpen: false,
    helpModalIsOpen: false,
  });
});

// --- Contribute ---

test("setContributeValue updates contributeValue", () => {
  useAppStore.getState().setContributeValue("b");
  expect(useAppStore.getState().contributeValue).toBe("b");
});

test("setContributeFundingAmount updates contributeFundingAmount", () => {
  useAppStore.getState().setContributeFundingAmount("25");
  expect(useAppStore.getState().contributeFundingAmount).toBe("25");
});

// --- Form items ---

test("updateFormItemValue updates the matching item", () => {
  useAppStore.getState().updateFormItemValue("Vorname", "Max");
  const item = useAppStore.getState().formItems.find((i) => i.key === "Vorname");
  expect(item?.value).toBe("Max");
});

test("updateFormItemValue does not touch other items", () => {
  useAppStore.getState().updateFormItemValue("Vorname", "Max");
  const others = useAppStore
    .getState()
    .formItems.filter((i) => i.key !== "Vorname");
  expect(others.every((i) => i.value === "")).toBe(true);
});

test("toggleFormItemRequired flips the flag and can be reversed", () => {
  useAppStore.getState().toggleFormItemRequired("Vorname");
  expect(
    useAppStore.getState().formItems.find((i) => i.key === "Vorname")?.required
  ).toBe(false);

  useAppStore.getState().toggleFormItemRequired("Vorname");
  expect(
    useAppStore.getState().formItems.find((i) => i.key === "Vorname")?.required
  ).toBe(true);
});

// --- Modals ---

test("togglePrintModalIsOpen toggles between true and false", () => {
  expect(useAppStore.getState().printModalIsOpen).toBe(false);
  useAppStore.getState().togglePrintModalIsOpen();
  expect(useAppStore.getState().printModalIsOpen).toBe(true);
  useAppStore.getState().togglePrintModalIsOpen();
  expect(useAppStore.getState().printModalIsOpen).toBe(false);
});

test("toggleHelpModalIsOpen toggles between true and false", () => {
  expect(useAppStore.getState().helpModalIsOpen).toBe(false);
  useAppStore.getState().toggleHelpModalIsOpen();
  expect(useAppStore.getState().helpModalIsOpen).toBe(true);
  useAppStore.getState().toggleHelpModalIsOpen();
  expect(useAppStore.getState().helpModalIsOpen).toBe(false);
});

// --- Signatures ---

test("updateSignatureItemDataURL updates the correct signature", () => {
  useAppStore.getState().updateSignatureItemDataURL("form", "data:image/png;base64,abc");
  expect(
    useAppStore.getState().signatures.find((s) => s.key === "form")?.dataURL
  ).toBe("data:image/png;base64,abc");
});

test("updateSignatureItemDate updates the correct signature", () => {
  useAppStore.getState().updateSignatureItemDate("sepa", "01.01.2026");
  expect(
    useAppStore.getState().signatures.find((s) => s.key === "sepa")?.date
  ).toBe("01.01.2026");
});

test("updateSignatureItemLocation updates the correct signature", () => {
  useAppStore.getState().updateSignatureItemLocation("form", "Berlin");
  expect(
    useAppStore.getState().signatures.find((s) => s.key === "form")?.location
  ).toBe("Berlin");
});

test("updateSignatureAspectRatio updates the correct signature", () => {
  useAppStore.getState().updateSignatureAspectRatio("sepa", 1.5);
  expect(
    useAppStore.getState().signatures.find((s) => s.key === "sepa")?.aspectRatio
  ).toBe(1.5);
});
