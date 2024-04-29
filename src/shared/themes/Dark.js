import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[700],
      dark: green[800],
      light: green[500],
      contrastText: "#FFFF",
    },

    secondary: {
      main: grey[500],
      dark: grey[400],
      light: grey[300],
      contrastText: "#ffffff",
    },

    background: {
      default: "#202124",
      paper: "#303134",
    },
  
  },
  typography: {
    allVariants: {
      color: "white"
    }
  }
});
