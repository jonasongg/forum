import styled from 'styled-components';

export const BasicWrapper = styled.div`
    background-color: ${(props) => props.theme.background};
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
`;

export const StyledConfirmButton = styled.button`
    color: ${(props) => props.theme.main};
    background-color: ${(props) => props.theme.dark};

    :hover,
    :active {
        background-color: ${(props) => props.theme.darkContrast};
    }
`;

export const PostCommentButton = styled(StyledConfirmButton)`
    width: fit-content;
`;

export const PopupTitle = styled.div`
    font-weight: 600;
    font-size: xx-large;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 20px -10px -20px 0px;
`;
