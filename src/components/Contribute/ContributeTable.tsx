import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RadioWrapper from "../RadioWrapper";
import { useAppStore } from "../../stores/appStore";
import { useShallow } from "zustand/shallow";
import ContributeIndividuallyBlock from "./ContributeIndividuallyBlock";
import { ContributeProps } from "./ContributeProps";

export default function ContributeTable(props: Readonly<ContributeProps>) {
  const [contributeValue, setContributeValue, contributeFundingAmount,setContributeFundingAmount] = useAppStore(
    useShallow((state) => [
      state.contributeValue,
      state.setContributeValue,
      state.contributeFundingAmount,
      state.setContributeFundingAmount
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
    <TableContainer component={Paper} className={props.className}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Mitgliedsbeitragsmodell</TableCell>
            <TableCell align="right">Monatlich</TableCell>
            <TableCell align="right">Jährlich</TableCell>
            <TableCell align="right">Auswahl</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contributes.map((row) => {
            if (row.key === "d") {
              return (
                <TableRow
                  key={row.key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={3} component="th" scope="row">
                    <ContributeIndividuallyBlock 
                      name={row.name}
                      contributeFundingAmount={contributeFundingAmount}
                      setContributeFundingAmount={setContributeFundingAmount}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <RadioWrapper
                      checkValue={row.key}
                      selectedValue={contributeValue}
                      onChange={handleRadioChange}
                    />
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                key={row.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.month}€</TableCell>
                <TableCell align="right">{row.month * 12}€</TableCell>
                <TableCell align="right">
                  <RadioWrapper
                    checkValue={row.key}
                    selectedValue={contributeValue}
                    onChange={handleRadioChange}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
