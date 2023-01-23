import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { tComment } from '../types';
import CommentForm from './CommentForm';

type CommentProps = {
    id: number;
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
    color: ${(props) => props.theme.subText};
    font-weight: 400;
    font-size: small;
`;

const CommentReply = styled.div`
    width: fit-content;
    cursor: pointer;
    color: ${(props) => props.theme.subText};
    :hover {
        text-decoration: underline;
    }

    font-weight: 600;
    font-size: small;
`;

const LineWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const CommentLine = styled.div`
    border-left: 1px solid ${(props) => props.theme.subMain};

    width: 1px;
    margin: 0px 0px 15px 7px;
`;

const RepliesWrapper = styled.div`
    display: flex;
    flex-direction: column;

    flex: 1;
`;

const PaddedCommentForm = styled.div`
    margin: 5px 5px 15px 15px;
`;

const Replies = styled.div`
    padding: 0px 0px 20px 20px;
`;

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const params = useParams();

  const handleReply = () => {
    setIsReplying(true);
    console.log('test');
  };

  return (
    <CommentsWrapper>
      <CommentWrapper>
        <CommentSubtext>
          {props.attributes.user_username} •{' '}
          {props.attributes.created_at}
        </CommentSubtext>
        {props.attributes.body}
        <CommentReply onClick={() => handleReply()}>Reply</CommentReply>
      </CommentWrapper>
      {(props.attributes.replies.length != 0 || isReplying) && (
        <LineWrapper>
          <CommentLine />
          <RepliesWrapper>
            {isReplying && (
              <PaddedCommentForm>
                <CommentForm
                  parentId={props.id}
                  setIsReplying={setIsReplying}
                  postURL={`/posts/${params.id}/comments/${props.id}`}
                />
              </PaddedCommentForm>
            )}
            {props.attributes.replies.length != 0 && (
              <Replies>
                {props.attributes.replies.map((reply) => (
                  <Comment
                    key={reply.data.attributes.body}
                    id={reply.data.id}
                    attributes={reply.data.attributes}
                  />
                ))}
              </Replies>
            )}
          </RepliesWrapper>
        </LineWrapper>
      )}
    </CommentsWrapper>
  );
};

export default Comment;
