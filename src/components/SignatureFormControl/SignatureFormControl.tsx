import { FormControl, FormHelperText, Input, Stack } from "@mui/material";
import SignatureModal from "./SignatureModal";

// Hooks
import { useAppStore } from "../../stores/appStore";
import { useShallow } from "zustand/shallow";
import { useState } from "react";

// Constants
import { AllowedSignatureKeys } from "../../models/AllowedSignatureKeys";
import { BLANK_PNG } from "../../const";

interface SignatureButtonProps {
  signatureKey: AllowedSignatureKeys;
}

function SignatureButton(props: Readonly<SignatureButtonProps>) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [signatures, updateSignatureItemDate, updateSignatureItemLocation] =
    useAppStore(
      useShallow((state) => [
        state.signatures,
        state.updateSignatureItemDate,
        state.updateSignatureItemLocation,
      ])
    );

  const currentSignature = signatures.find(
    (signature) => signature.key === props.signatureKey
  );

  return (
    <>
      <SignatureModal
        signatureKey={props.signatureKey}
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 1, md: 1 }}
        useFlexGap
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl variant="standard" fullWidth>
          <Input
            aria-describedby="standard-weight-helper-text"
            onChange={(event) =>
              updateSignatureItemDate(props.signatureKey, event.target.value)
            }
            value={
              signatures.find(
                (signature) => signature.key === props.signatureKey
              )?.date
            }
          />
          <FormHelperText id="standard-weight-helper-text">
            Datum
          </FormHelperText>
        </FormControl>

        <FormControl variant="standard" fullWidth>
          <Input
            aria-describedby="standard-weight-helper-text"
            onChange={(event) =>
              updateSignatureItemLocation(
                props.signatureKey,
                event.target.value
              )
            }
            value={
              signatures.find(
                (signature) => signature.key === props.signatureKey
              )?.location
            }
          />
          <FormHelperText id="standard-weight-helper-text">Ort</FormHelperText>
        </FormControl>

        <FormControl
          variant="standard"
          onClick={() => setModalIsOpen(true)}
          fullWidth
        >
          <Input
            id="input-with-icon-adornment"
            sx={{
              zIndex: 2,
            }}
            value={currentSignature?.dataURL === BLANK_PNG ? "" : " "}
          />
          <img
            width={
              currentSignature?.aspectRatio
                ? 50 * currentSignature.aspectRatio * 2
                : "100%"
            }
            height="50"
            style={{
              zIndex: 1,
              position: "absolute",
              alignSelf: "center",
              top: "-10px",
            }}
            src={
              signatures.find(
                (signature) => signature.key === props.signatureKey
              )?.dataURL
            }
            alt="Unterschrift"
          />

          <FormHelperText id="standard-weight-helper-text">
            Unterschrift
          </FormHelperText>
        </FormControl>
      </Stack>
    </>
  );
}

export default SignatureButton;
