import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiPostPost, apiPutPost } from '../api';
import { AuthContext } from '../authentication/AuthContext';
import CustomTextArea from '../CustomTextArea';
import { BasicWrapper, PostCommentButton } from '../styles/SharedStyles';
import { tUser } from '../types';

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

type stateType = {
    title: string;
    body: string;
    originalPost: string;
};

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const stateData = useLocation().state as stateType;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (stateData) {
      setTitle(stateData.title);
      setBody(stateData.body);
      setIsEdit(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length == 0 || body.length == 0) {
      setTitleError(title.length == 0);
      setBodyError(body.length == 0);
    } else {
      auth.promptLogin(postOrEditPost); //Set postOrEditPost to be the afterLogin function to be called
    }
  };

  const postOrEditPost = async (user: tUser) => {
    const data = {
      title: title,
      body: body,
      user_id: user.id,
    };
    console.log(data);
    console.log(stateData.originalPost);

    if (isEdit) {
      console.log(isEdit);
      await apiPutPost(stateData.originalPost, data);
    } else {
      await apiPostPost(data);
    }

    navigate(isEdit ? stateData.originalPost : '/');
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
          autoFocus={isEdit}
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
