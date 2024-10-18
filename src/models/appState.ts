import { AllowedFormKeys } from "./AllowedFormKeys";
import { AllowedSignatureKeys } from "./AllowedSignatureKeys";
import { FormItem } from "./FormItem";
import { SignatureItem } from "./SignatureItem";

export interface AppState {
  // Contribute FORM
  contributeValue: string;
  setContributeValue: (value: string) => void;

  contributeFundingAmount: string;
  setContributeFundingAmount: (amount: string) => void;

  // FORM
  formItems: FormItem[];
  setFormItems: (formItems: FormItem[]) => void;
  updateFormItemValue: (key: AllowedFormKeys, value: string) => void;
  toggleFormItemRequired: (key: AllowedFormKeys) => void;

  // SIGNATURES Forms
  signatures: SignatureItem[];
  updateSignatureItemDataURL: (key: AllowedSignatureKeys, dataURL: string) => void;
  updateSignatureItemDate: (key: AllowedSignatureKeys, date: string) => void;
  updateSignatureItemLocation: (key: AllowedSignatureKeys, location: string) => void;
  updateSignatureAspectRatio: (key: AllowedSignatureKeys, aspectRatio: number) => void;

  // MODALS
  printModalIsOpen: boolean;
  togglePrintModalIsOpen: () => void;

  helpModalIsOpen: boolean;
  toggleHelpModalIsOpen: () => void;

  
}
