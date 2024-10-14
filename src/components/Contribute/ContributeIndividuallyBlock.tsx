import { FormControl, FormHelperText, Input } from "@mui/material";

interface ContributeIndividuallyBlockProps {
  name: string;
  contributeFundingAmount: string;
  setContributeFundingAmount: (amount: string) => void;
}

function ContributeIndividuallyBlock(
  props: Readonly<ContributeIndividuallyBlockProps>
) {
  return (
    <>
      {props.name}
      <br />
      Ich fördere den Erfindergeist Jülich e.V. mit folgendem Betrag (in Euro,
      pro Monat):
      <FormControl variant="standard" fullWidth>
        <Input
          aria-describedby="standard-weight-helper-text"
          onChange={(event) => {
            props.setContributeFundingAmount(event.target.value);
          }}
          value={props.contributeFundingAmount}
        />
        <FormHelperText id="standard-weight-helper-text">
          Monats Beitrag
        </FormHelperText>
      </FormControl>
      Dieser Betrag wird gesammelt, einmal jährlich überwiesen oder abgebucht.
      Juristische Personen geben bitte den Namen einer natürlichen Person als
      Vertreter an (Unternehmensname).
    </>
  );
}

export default ContributeIndividuallyBlock;
