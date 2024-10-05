import { AllowedFormKeys } from "./AllowedFormKeys";
import { AllowedSignatureKeys } from "./AllowedSignatureKeys";
import { FormItem } from "./FormItem";
import { SignatureItem } from "./SignatureItem";

export interface AppState {
  // Contribute FORM
  contributeValue: string;
  setContributeValue: (value: string) => void;

  // FORM
  formItems: FormItem[];
  setFormItems: (formItems: FormItem[]) => void;
  updateFormItemValue: (key: AllowedFormKeys, value: string) => void;
  toggleFormItemRequired: (key: AllowedFormKeys) => void;

  // SIGNATURES
  signatures: SignatureItem[];

  // MODALS
  printModalIsOpen: boolean;
  togglePrintModalIsOpen: () => void;

  helpModalIsOpen: boolean;
  toggleHelpModalIsOpen: () => void;

  signatureModalIsOpen: boolean;
  signatureKey: AllowedSignatureKeys;
  toggleSignatureModalIsOpen: (signatureKey?: AllowedSignatureKeys) => void;
}