import React from 'react';
import styled from 'styled-components';
import { tComment } from '../types';

type CommentProps = {
    attributes: tComment['attributes'];
};

const CommentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

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

const Replies = styled.div`
    padding: 0px 0px 20px 25px;
`;

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  return (
    <CommentsWrapper>
      <CommentWrapper>
        <CommentSubtext>
          {props.attributes.user_username} •{' '}
          {props.attributes.created_at}
        </CommentSubtext>
        {props.attributes.body}
        <CommentActions>Reply</CommentActions>
      </CommentWrapper>
      {props.attributes.replies.length != 0 && (
        <Replies>
          {props.attributes.replies.map((reply) => (
            <Comment
              key={reply.data.attributes.body}
              attributes={reply.data.attributes}
            />
          ))}
        </Replies>
      )}
    </CommentsWrapper>
  );
};

export default Comment;
