import React, { useContext, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiPostPost } from '../api';
import { AuthContext } from '../AuthContext';
import CustomTextArea from '../CustomTextArea';
import { BasicWrapper } from '../styles/BasicWrapper';
import { PostCommentButton } from '../styles/StyledButtons';
import { tUser } from '../types';

const NewPostWrapper = styled(BasicWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px;
    gap: 20px;
`;

const NewPostForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 30px;
    gap: 20px;
`;

const NewPostHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: larger;
    font-weight: 600;
`;

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length == 0 || body.length == 0) {
      setTitleError(title.length == 0);
      setBodyError(body.length == 0);
    } else {
      auth.promptLogin(postPost); //Set postComment to be the afterLogin function to be called
    }
  };

  const postPost = async (user: tUser) => {
    await apiPostPost({
      title: title,
      body: body,
      user_id: user.id,
    });

    navigate('/');
  };

  return (
    <BasicWrapper>
      <NewPostForm onSubmit={handleSubmit}>
        <NewPostHeader>Create a new post</NewPostHeader>
        <CustomTextArea
          isTextArea={false}
          placeholder="Title"
          useInputState={[title, setTitle]}
          useErrorState={[titleError, setTitleError]}
          autoFocus={false}
        />
        <CustomTextArea
          isTextArea={true}
          placeholder="Body"
          useInputState={[body, setBody]}
          useErrorState={[bodyError, setBodyError]}
          autoFocus={false}
        />
        <PostCommentButton>POST</PostCommentButton>
      </NewPostForm>
    </BasicWrapper>
  );
};

export default PostForm;
