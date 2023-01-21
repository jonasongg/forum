import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.main};
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
    color: ${(props) => props.theme.text};
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.background};

    :hover {
        background-color: ${(props) => props.theme.main};
    }
    :active {
        background-color: ${(props) => props.theme.subMain};
    }

    transition: background-color 0.2s;
  }
`;

export default GlobalStyle;
