import type { FormItem } from "../models/FormItem";

interface Data {
  formItems: FormItem[]

}
export function validate(data: Data): boolean {
  let failed = false;
  
  failed = data.formItems.some(formItem => formItem.required && formItem.value === "")

  return failed
}