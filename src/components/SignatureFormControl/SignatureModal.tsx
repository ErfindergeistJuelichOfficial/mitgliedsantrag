import { Box, Modal } from "@mui/material";
import SignaturePad from "./SignaturePad";
import { AllowedSignatureKeys } from "../../models/AllowedSignatureKeys";

// Styles
import { modalBoxStyle } from "../../styles/styles";

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
  signatureKey: AllowedSignatureKeys;
}

function SignatureModal(props: Readonly<SignatureModalProps>) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="no-print"
    >
      <Box sx={modalBoxStyle}>
        <h2>Unterschrift</h2>

        <SignaturePad
          signatureKey={props.signatureKey}
          onClose={props.onClose}
        />
      </Box>
    </Modal>
  );
}

export default SignatureModal;
