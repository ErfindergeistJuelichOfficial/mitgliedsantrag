import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  PaletteColorOptions,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

import { Print } from "@mui/icons-material";
import ContributeTable from "./components/Contribute/ContributeTable";
import AppBarWrapper from "./components/AppBarWrapper";
import { PersonalDataList } from "./components/PersonalDataList";
import { PrintModal } from "./components/PrintModal";
import { BankAccountList } from "./components/BankAccountList";
import { HelpModal } from "./components/HelpModal";
import SignatureButton from "./components/SignatureFormControl/SignatureFormControl";
import VolunteerArea from "./components/VolunteerArea";
import SepaArea from "./components/SepaArea";
import AddressArea from "./components/AddressArea";
import ContributeMobile from "./components/Contribute/ContributeMobile";

// Hooks
import { useAppStore } from "./stores/appStore";
import { useShallow } from "zustand/shallow";

// Constants
import { CONTRIBUTES } from "./const";

function App() {
  const matches = useMediaQuery("(min-width:800px)");

  const [togglePrintModalIsOpen] = useAppStore(
    useShallow((state) => [state.togglePrintModalIsOpen])
  );

  const primary: PaletteColorOptions = {
    main: "#159989",
    light: "#159989",
    dark: "#159989",
    contrastText: "#fff",
  };

  const secondary: PaletteColorOptions = {
    main: "#F9B338",
    light: "#F9B338",
    dark: "#F9B338",
    contrastText: "#000",
  };

  const theme = createTheme({
    palette: {
      primary: primary,
      secondary: secondary,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "block" }}>
        <Box component="header" className="header no-print">
          <CssBaseline />
          <AppBarWrapper />
          <PrintModal />
          <HelpModal />
        </Box>

        <Box component="main">
          <Box className="no-print" sx={{ height: "30px" }}>
            {/* simples spacer div */}
          </Box>

          <Box component="article">
            <h1>Antrag auf Mitgliedschaft </h1>

            <div>
              <p>
                Hiermit beantrage ich die Mitgliedschaft im Erfindergeist Jülich
                e.V. zum nächstmöglichen Zeitpunkt. Ich habe die Vereinssatzung
                gelesen und bin mit deren Einhaltung einverstanden. Mir ist
                bewusst, dass mit der Annahme des Antrages eine Einladung zu den
                vereinsinternen Kommunikations- & Co-Working-Apps erfolgt.
              </p>
            </div>

            <ContributeTable
              contributes={CONTRIBUTES}
              className={`${matches ? "visible" : "hidden"} visible-on-print`}
            />
            <ContributeMobile
              contributes={CONTRIBUTES}
              className={`${!matches ? "visible" : "hidden"} no-print`}
            />

            <PersonalDataList />

            <div>
              <p>
                Personen unter 16 Jahren sollten sich mit einem
                Erziehungsberechtigten anmelden, siehe Vereinssatzung.
              </p>
              <p>
                Alle Daten werden unter strenger Beachtung der EU-DSGVO,
                ausschließlich für vereinsinterne Zwecke, vom Vorstand
                EDV-gestützt verarbeitet. Mit der Bestätigung der Mitgliedschaft
                wird eine Mitgliedsnummer zugewiesen, welche in den
                Überweisungen als Verwendungszweck angegeben werden muss. Bitte
                richten Sie einen Dauerauftrag ein oder nutzen Sie das Formular
                (siehe unten), um ein Lastschriftmandat zu erteilen.
              </p>
            </div>

            <BankAccountList />

            <SignatureButton signatureKey="form" />
          </Box>

          <Box component="article" className="print-per-page">
            <VolunteerArea />
            <AddressArea />
          </Box>

          <Box component="article" className="print-per-page">
            <SepaArea />
            <AddressArea />
          </Box>
        </Box>

        <Box component="footer" className="footer no-print">
          <Button
            variant="contained"
            onClick={() => togglePrintModalIsOpen()}
            endIcon={<Print />}
            fullWidth
          >
            Drucken
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
