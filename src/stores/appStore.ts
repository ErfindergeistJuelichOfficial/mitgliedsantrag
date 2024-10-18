import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getInitialFormItems } from "../utils/getInitialFormItems";
import { AppState } from "../models/appState";
import { getInitialSignatureItems } from "../utils/getInitialSignatureItems";
import { allowedFormKeys, requiredFormKeys } from "../const";
import { AllowedFormKeys } from "../models/AllowedFormKeys";

export const useAppStore = create<AppState>()(
  immer((set) => ({
    contributeValue: "noting",
    setContributeValue: (value) => set({ contributeValue: value }),
    contributeFundingAmount: "",
    setContributeFundingAmount: (amount) => set({ contributeFundingAmount: amount }),
    formItems: getInitialFormItems(
      allowedFormKeys as unknown as AllowedFormKeys[],
      requiredFormKeys
    ),
    setFormItems: (formItems) => set({ formItems }),
    updateFormItemValue: (key, value) => {
      set((state) => {
        const index = state.formItems.findIndex(
          (formItem) => formItem.key === key
        );
        if (index > -1) {
          state.formItems[index].value = value;
        }
      });
    },
    toggleFormItemRequired: (key) => {
      set((state) => {
        const index = state.formItems.findIndex(
          (formItem) => formItem.key === key
        );
        if (index > -1) {
          state.formItems[index].required = !state.formItems[index].required;
        }
      });
    },
    signatures: getInitialSignatureItems(["form", "sepa"]),
    updateSignatureItemDataURL: (key, dataURL) => {
      set((state) => {
        const index = state.signatures.findIndex(
          (signature) => signature.key === key
        );
        if (index > -1) {
          state.signatures[index].dataURL = dataURL;
        }
      });
    },
    updateSignatureItemDate: (key, date) => {
      set((state) => {
        const index = state.signatures.findIndex(
          (signature) => signature.key === key
        );
        if (index > -1) {
          state.signatures[index].date = date;
        }
      });
    },
    updateSignatureItemLocation: (key, location) => {
      set((state) => {
        const index = state.signatures.findIndex(
          (signature) => signature.key === key
        );
        if (index > -1) {
          state.signatures[index].location = location;
        }
      });
    },
    updateSignatureAspectRatio: (key, location) => {
      set((state) => {
        const index = state.signatures.findIndex(
          (signature) => signature.key === key
        );
        if (index > -1) {
          state.signatures[index].aspectRatio = location;
        }
      });
    },
    printModalIsOpen: false,
    togglePrintModalIsOpen: () =>
      set((state) => {
        state.printModalIsOpen = !state.printModalIsOpen;
      }),
    helpModalIsOpen: false,
    toggleHelpModalIsOpen: () =>
      set((state) => {
        state.helpModalIsOpen = !state.helpModalIsOpen;
      })
  }))
);
