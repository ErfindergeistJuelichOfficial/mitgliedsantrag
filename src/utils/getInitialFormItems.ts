import type { AllowedFormKeys } from "../models/AllowedFormKeys";
import type { FormItem } from "../models/FormItem";

export function getInitialFormItems(
  allowedFormKeys: AllowedFormKeys[],
  requiredFormKeys: string[]
): FormItem[] {
  return allowedFormKeys.map((key) => {
    return {
      key,
      value: "",
      required: requiredFormKeys.includes(key),
    };
  });
}
