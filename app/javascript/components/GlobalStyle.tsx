import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f5f5f5;
    font-family: Roboto;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: small;
    font-weight: 600;

    height: 40px;
    padding: 15px;
    color: #050505;
    border: none;
    border-radius: 10px;
    background-color: white;

    :hover {
        background-color: #f5f5f5;
    }
    :active {
        background-color: #e0e0e0;
    }

    transition: background-color 0.2s;
  }
`;

export default GlobalStyle;
