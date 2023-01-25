import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiDeleteComment } from '../api';
import { AuthContext } from '../authentication/AuthContext';
import Dropdown from '../Dropdown';
import { PopupContext } from '../popup/PopupContext';
import { PostCommentActions } from '../styles/PostCommentActions';
import { tComment } from '../types';
import AuthorisedActions from './AuthorisedActions';
import CommentForm from './CommentForm';

type CommentProps = {
    id: number;
    attributes: tComment['attributes'];
    fetchComments: () => Promise<void>;
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

const CommentActionsWrapper = styled.div`
    display: flex;
    gap: 15px;
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
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const auth = useContext(AuthContext);
  const popup = useContext(PopupContext);

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    popup.promptDelete(deleteComment);
  };

  const deleteComment = async () => {
    await apiDeleteComment(`/posts/${params.id}/comments/${props.id}`);
    popup.setPopupPrompted(0);
    props.fetchComments();
  };

  return (
    <CommentsWrapper>
      <CommentWrapper>
        <CommentSubtext>
          {props.attributes.user_username} •{' '}
          {props.attributes.created_at}
        </CommentSubtext>
        {isEditing ? (
          <CommentForm
            parentId={props.id}
            originalInput={props.attributes.body}
            setIsDone={setIsEditing}
            URL={`/posts/${params.id}/comments/${props.id}`}
            fetchComments={props.fetchComments}
          />
        ) : (
          props.attributes.body
        )}
        <CommentActionsWrapper>
          <PostCommentActions onClick={() => handleReply()}>
                        Reply
          </PostCommentActions>
          {props.attributes.user_username ==
                        auth.user?.attributes.username && (
            <AuthorisedActions
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </CommentActionsWrapper>
      </CommentWrapper>
      {(props.attributes.replies.length != 0 || isReplying) && (
        <LineWrapper>
          <CommentLine />
          <RepliesWrapper>
            {isReplying && (
              <PaddedCommentForm>
                <CommentForm
                  parentId={props.id}
                  originalInput=""
                  setIsDone={setIsReplying}
                  URL={`/posts/${params.id}/comments`}
                  fetchComments={props.fetchComments}
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
                    fetchComments={props.fetchComments}
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
