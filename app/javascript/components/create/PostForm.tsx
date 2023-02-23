import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetTags, apiPostPost, apiPutPost } from '../api';
import { AuthContext } from '../authentication/AuthContext';
import CustomTextArea from '../CustomTextArea';
import { BasicWrapper, PostCommentButton } from '../styles/SharedStyles';
import { tTag, tUser } from '../types';

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

const TagsWrapper = styled.div`
    display: flex;
    align-items: center;

    gap: 13px;
`;

const TagWrapper = styled.button<{ selected: boolean }>`
    padding: 25px;
    font-size: medium;
    justify-content: flex-start;
    border: 2px solid ${(props) =>
    props.selected ? props.theme.subMain : props.theme.main};

    background-color: ${(props) =>
    props.selected ? props.theme.subMain : props.theme.background};
    }
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

  const [tags, setTags] = useState<tTag[]>([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    if (stateData) {
      setTitle(stateData.title);
      setBody(stateData.body);
      setIsEdit(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setTags((await apiGetTags()).data.data);
    })();
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
      tag: selectedTag,
    };

    if (isEdit) {
      console.log(isEdit);
      await apiPutPost(stateData.originalPost, data);
    } else {
      await apiPostPost(data);
    }

    navigate(isEdit ? stateData.originalPost : '/');
  };

  const handleTag = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const tagName = (e.target as HTMLButtonElement).innerText;
    if (selectedTag == tagName) {
      setSelectedTag('');
    } else {
      setSelectedTag(tagName);
    }
  };

  const tagList = tags.map((tag) => (
    <TagWrapper
      key={tag.id}
      onClick={(e) => handleTag(e)}
      selected={selectedTag == tag.attributes.name}
    >
      {tag.attributes.name}
    </TagWrapper>
  ));

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
        <TagsWrapper>{tagList}</TagsWrapper>
        <PostCommentButton>POST</PostCommentButton>
      </NewPostForm>
    </BasicWrapper>
  );
};

export default PostForm;
