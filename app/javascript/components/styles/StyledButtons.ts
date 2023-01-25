import styled from 'styled-components';

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
