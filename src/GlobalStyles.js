// GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden; /* Remove a barra de rolagem */
    margin: 0; /* Remove as margens padrão do corpo */
    padding: 0; /* Remove o preenchimento padrão do corpo */
    
  }
`;

export default GlobalStyles;
