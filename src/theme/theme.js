import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F9B485",
      contrastText: "#f4711a",
    },
    secondary: {
      main: "#A3C6C8",
    },
    style: {
      background: "#1B2836",
      paper: "#3E5765",
      lightblue: "#A3C6C8",
      neutral: "#E6E6E6",
      primary: "#F9B485",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "1.5rem",
      fontWeight: "600",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "normal",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.214,
    },
    h4: {
      fontSize: "0.6rem",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "0.8125rem",
      fontWeight: "normal",
      lineHeight: 1.231,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: "0.75rem",
      fontWeight: "500",
      lineHeight: 1.25,
    },
  },
});

export default theme;
