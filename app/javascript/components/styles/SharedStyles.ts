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

export const NoComments = styled.div`
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.subText};
    font-size: small;
`;

export const Divider = styled.div`
    border-top: 1px solid ${(props) => props.theme.subMain};
    margin: 0px 0px 0px 2%;
    width: 96%;
`;

export const Tag = styled(StyledConfirmButton)`
    height: fit-content;
    width: fit-content;

    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    padding: 4px 7px;
`;
