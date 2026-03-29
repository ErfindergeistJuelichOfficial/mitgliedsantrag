import { Radio, type RadioProps } from "@mui/material";

interface IRadioWrapperProps extends RadioProps {
  selectedValue: string;
  checkValue: string;
}

function RadioWrapper(props: Readonly<IRadioWrapperProps>) {
  return (
    <Radio
      checked={props.selectedValue === props.checkValue}
      onChange={props.onChange}
      value={props.checkValue}
   />
  )

}

export default RadioWrapper;