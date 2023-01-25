import styled from 'styled-components';

export const PostCommentActions = styled.div`
    width: fit-content;
    cursor: pointer;
    color: ${(props) => props.theme.subText};
    :hover {
        text-decoration: underline;
    }

    font-weight: 600;
    font-size: small;
`;
