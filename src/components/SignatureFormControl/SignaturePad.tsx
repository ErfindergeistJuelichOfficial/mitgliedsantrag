import { Button, Stack } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

// Hooks
import { useLayoutEffect, useRef } from "react";
import { useAppStore } from "../../stores/appStore";
import { useShallow } from "zustand/shallow";
import { useResizeDetector } from "react-resize-detector";

// Constants
import { BLANK_PNG } from "../../const";
import { AllowedSignatureKeys } from "../../models/AllowedSignatureKeys";

interface SignaturePadProps {
  signatureKey: AllowedSignatureKeys;
  onClose: () => void;
}

function SignaturePad(props: Readonly<SignaturePadProps>) {
  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const signatureCanvasWrapperRef = useRef<HTMLDivElement>(null);

  const { width } = useResizeDetector({
    targetRef: signatureCanvasWrapperRef,
  });

  const [signatures, updateSignatureItemDataURL, updateSignatureAspectRatio] =
    useAppStore(
      useShallow((state) => [
        state.signatures,
        state.updateSignatureItemDataURL,
        state.updateSignatureAspectRatio,
      ])
    );

  function clearSignature(): void {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current?.clear();
      signatureCanvasRef.current?.fromDataURL(BLANK_PNG);
    }
  }

  function saveSignature(): void {
    if (signatureCanvasRef.current) {
      const signatureImage = signatureCanvasRef.current?.toDataURL();
      updateSignatureItemDataURL(props.signatureKey, signatureImage);

      if (width) {
        const aspectRatio = width / 200;
        updateSignatureAspectRatio(props.signatureKey, aspectRatio);
      }

      props.onClose();
    }
  }

  useLayoutEffect(() => {
    if (width && signatureCanvasRef.current) {
      const x = signatureCanvasRef.current?.getCanvas();
      x.width = width;

      signatureCanvasRef.current.fromDataURL(
        signatures.find((signature) => signature.key === props.signatureKey)
          ?.dataURL ?? BLANK_PNG,
        {
          width: width,
          height: 200,
        }
      );
    }
  }, [width, signatureCanvasRef, signatures, props.signatureKey]);

  return (
    <>
      <div
        ref={signatureCanvasWrapperRef}
        style={{
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SignatureCanvas
          ref={signatureCanvasRef}
          penColor="blue"
          canvasProps={{ height: 200, className: "signature-canvas" }}
        />
      </div>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 1, md: 1 }}
        useFlexGap
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => props.onClose()}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          schließen
        </Button>

        <Button
          variant="outlined"
          onClick={() => clearSignature()}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          Löschen
        </Button>

        <Button
          variant="contained"
          onClick={() => saveSignature()}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          Speichern
        </Button>
      </Stack>
    </>
  );
}

export default SignaturePad;
