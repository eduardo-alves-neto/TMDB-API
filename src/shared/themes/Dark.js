import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#202124",
    paper: "#303134",
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: #ffffff; 
  }
`;
