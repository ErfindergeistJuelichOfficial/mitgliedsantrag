import type { AllowedFormKeys } from "./AllowedFormKeys";

export interface FormItem {
  key: AllowedFormKeys;
  value: string;
  required: boolean;
}