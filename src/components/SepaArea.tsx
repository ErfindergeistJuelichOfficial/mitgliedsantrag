import { FormHelperText, Input, FormControl } from "@mui/material";
import SignatureButton from "./SignatureFormControl/SignatureFormControl";

function SepaArea() {
  return (
    <>
      <h1>SEPA-Lastschriftmandat</h1>
      <div>
        <p>
          Unsere Gläubiger-Identifikationsnummer: DE27ZZZ00002425162<br/>
          Hiermit ermächtige ich den Erfindergeist Jülich e.V. mittels Lastschrift die
          im Antrag angekreuzte Zahlung einzuziehen. Zugleich weise ich mein
          Kreditinstitut an, die vom Erfindergeist Jülich e.V. auf mein Konto
          gezogene Lastschrift einzulösen.
        </p>
      </div>
      <ul>
        <li>
          <FormControl variant="standard" fullWidth>
            <Input aria-describedby="standard-weight-helper-text" multiline />
            <FormHelperText id="standard-weight-helper-text">
              Kontoinhaber
            </FormHelperText>
          </FormControl>
        </li>
        <li>
          <FormControl variant="standard" fullWidth>
            <Input aria-describedby="standard-weight-helper-text" multiline />
            <FormHelperText id="standard-weight-helper-text">
              Kreditinstitut
            </FormHelperText>
          </FormControl>
        </li>
        <li>
          <FormControl variant="standard" fullWidth>
            <Input aria-describedby="standard-weight-helper-text" multiline />
            <FormHelperText id="standard-weight-helper-text">
              IBAN
            </FormHelperText>
          </FormControl>
        </li>
        <li>
          <FormControl variant="standard" fullWidth>
            <Input aria-describedby="standard-weight-helper-text" multiline />
            <FormHelperText id="standard-weight-helper-text">
              BIC
            </FormHelperText>
          </FormControl>
        </li>
      </ul>

      <SignatureButton signatureKey="sepa" />
    </>
  );
}

export default SepaArea;
