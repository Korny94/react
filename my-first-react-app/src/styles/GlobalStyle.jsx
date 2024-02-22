import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --color-primary: blue;
    --color-secondary: white;
    --color-tertiary: #f0f0f0;
    height: 100%;
    }
    body {
        height: 100%;
        background-color: var(--color-tertiary);
    }
    img {
        width: 100px;
        height: auto;
    }
`;

export default GlobalStyle;
