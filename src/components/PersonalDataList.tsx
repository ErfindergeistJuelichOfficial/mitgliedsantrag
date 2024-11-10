import { FormControl, FormHelperText, Input } from "@mui/material";
import { useAppStore } from "../stores/appStore";
import { useShallow } from "zustand/shallow";

export function PersonalDataList() {
  const [formItems, updateFormItemValue] = useAppStore(
    useShallow((state) => [state.formItems, state.updateFormItemValue])
  );

  return (
    <ul>
      {formItems.map((formItem) => {
        return (
          <li key={formItem.key}>
            <FormControl variant="standard" fullWidth>
              <Input
                aria-describedby="standard-weight-helper-text"
                onChange={(event) => {
                  updateFormItemValue(formItem.key, event.target.value);
                }}
                value={
                  formItems.find(
                    (formItemFind) => formItemFind.key === formItem.key
                  )?.value
                }
                multiline
              />
              <FormHelperText
                id="standard-weight-helper-text"
                required={formItem.required}
              >
                {formItem.key}
              </FormHelperText>
            </FormControl>
          </li>
        );
      })}
    </ul>
  );
}
