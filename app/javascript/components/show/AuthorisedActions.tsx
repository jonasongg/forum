import React from 'react';
import styled from 'styled-components';
import { PostCommentActions } from '../styles/PostCommentActions';

const AuthorisedActionsWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const AuthorisedActions: React.FC = () => {
  return (
    <AuthorisedActionsWrapper>
      <PostCommentActions>Edit</PostCommentActions>
      <PostCommentActions>Delete</PostCommentActions>
    </AuthorisedActionsWrapper>
  );
};

export default AuthorisedActions;
