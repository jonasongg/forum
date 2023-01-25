import styled from 'styled-components';

export const BasicWrapper = styled.div`
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;
