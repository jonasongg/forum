import React from 'react';
import styled from 'styled-components';

type CommentProps = {
    author: string;
    body: string;
    date: string;
};

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const CommentSubtext = styled.div`
    color: gray;
    font-weight: 400;
    font-size: small;
`;

const CommentActions = styled.div`
    color: gray;
    font-weight: 600;
    font-size: small;
`;

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  return (
    <CommentWrapper>
      <CommentSubtext>
        {props.author} • {props.date}
      </CommentSubtext>
      {props.body}
      <CommentActions>Reply</CommentActions>
    </CommentWrapper>
  );
};

export default Comment;
