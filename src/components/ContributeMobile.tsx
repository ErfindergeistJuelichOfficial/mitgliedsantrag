import React from "react";

import Paper from "@mui/material/Paper";
import RadioWrapper from "./RadioWrapper";
import {
  Box,
  FormControlLabel,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useAppStore } from "../stores/appStore";
import { useShallow } from "zustand/shallow";
import ContributeIndividuallyBlock from "./ContributeIndividuallyBlock";
function createData(key: string, name: string, month: number) {
  return { key, name, month };
}

const rows = [
  createData("a", "- ordentliches Mitglied", 10),
  createData("b", "- Förder Mitgliedschaft: 1. Natürliche Personen", 10),
  createData("c", "- Förder Mitgliedschaft: 2. Juristische Personen", 15),
  createData("d", "- Individuelle Förderung:", 0),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

interface ContributeMobileProps {
  className: string;
}

function ContributeMobile(props: Readonly<ContributeMobileProps>) {
  const [
    contributeValue,
    setContributeValue,
    contributeFundingAmount,
    setContributeFundingAmount,
  ] = useAppStore(
    useShallow((state) => [
      state.contributeValue,
      state.setContributeValue,
      state.contributeFundingAmount,
      state.setContributeFundingAmount,
    ])
  );

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      setContributeValue(event.target.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }} className={props.className}>
      {rows.map((row) => {
        if (row.key === "d") {
          return (
            <Item key={row.key} sx={{ my: 1, mx: "auto", p: 2, maxWidth: "unset" }}>
              <Stack
                spacing={2}
                direction="column"
                sx={{ alignItems: "center" }}
              >
                <ContributeIndividuallyBlock
                  name={row.name}
                  contributeFundingAmount={contributeFundingAmount}
                  setContributeFundingAmount={setContributeFundingAmount}
                />
                <FormControlLabel
                  control={
                    <RadioWrapper
                      checkValue={row.key}
                      selectedValue={contributeValue}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Auswahl: "
                  labelPlacement="start"
                />
              </Stack>
            </Item>
          );
        }

        return (
          <Item key={row.key} sx={{ my: 1, mx: "auto", p: 2, maxWidth: "unset"}}>
            <Stack spacing={2} direction="column" sx={{ alignItems: "center" }}>
              <Stack sx={{ minWidth: 0 }}>
                <Typography>{row.name}</Typography>
              </Stack>
              <Stack sx={{ minWidth: 0 }}>
                <Typography>Monatlich: {row.month}€</Typography>
              </Stack>
              <Stack sx={{ minWidth: 0 }}>
                <Typography>Jährlich: {row.month * 12}€</Typography>
              </Stack>
              <Stack direction="row">
                <FormControlLabel
                  control={
                    <RadioWrapper
                      checkValue={row.key}
                      selectedValue={contributeValue}
                      onChange={handleRadioChange}
                    />
                  }
                  label="Auswahl: "
                  labelPlacement="start"
                />
              </Stack>
            </Stack>
          </Item>
        );
      })}
    </Box>
  );
}

export default ContributeMobile;
