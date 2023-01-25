import React from 'react';
import styled from 'styled-components';
import { PostCommentActions } from '../styles/PostCommentActions';

type AuthorisedActionsProps = {
    handleEdit: () => void;
    handleDelete: () => void;
};

const AuthorisedActionsWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const AuthorisedActions: React.FC<AuthorisedActionsProps> = (props) => {
  return (
    <AuthorisedActionsWrapper>
      <PostCommentActions onClick={() => props.handleEdit()}>
                Edit
      </PostCommentActions>
      <PostCommentActions onClick={() => props.handleDelete()}>
                Delete
      </PostCommentActions>
    </AuthorisedActionsWrapper>
  );
};

export default AuthorisedActions;
