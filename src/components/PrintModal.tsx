import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { useAppStore } from "../stores/appStore";
import { useShallow } from "zustand/shallow";
import { ExpandMore, Print } from "@mui/icons-material";
import { modalBoxStyle } from "../styles/styles";

export function PrintModal() {
  const [printModalIsOpen, togglePrintModalIsOpen] = useAppStore(
    useShallow((state) => [
      state.printModalIsOpen,
      state.togglePrintModalIsOpen,
    ])
  );

  function handlePrint(): void {
    togglePrintModalIsOpen();
    window.print();
  }

  return (
    <Modal
      open={printModalIsOpen}
      onClose={togglePrintModalIsOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="no-print"
    >
      <Box sx={modalBoxStyle}>
        <h2>Drucken</h2>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Druck Hilfe
          </AccordionSummary>
          <AccordionDetails>
            Wir nutzen die Standard Druck-Funktion Ihres Browsers. Diese weiche
            je nach Drucker ab. Daher müssen Sie selber ein paar einstellungen
            vornehmen. Prüfen Sie bitte ob die Druckvorschau alles richtig
            anzeigt. Deaktivieren Sie gegebenenfalls unter "Weiteren
            Einstellungen" die "Kopf- und Fusszeilen"
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Drucken
          </AccordionSummary>
          <AccordionDetails>
            Wir überlassen es Ihnen das Formular im Browser auszufüllen, es per
            Hand auszufüllen oder gemischt ausfüllen.
          </AccordionDetails>
          <AccordionActions>
            <Button onClick={() => togglePrintModalIsOpen()}>Abbrechen</Button>
            <Button variant="contained" onClick={() => handlePrint()} endIcon={<Print />}>
              Drucken
            </Button>
          </AccordionActions>
        </Accordion>
      </Box>
    </Modal>
  );
}