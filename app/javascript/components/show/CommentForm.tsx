import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiPostComment, apiPutComment } from '../api';
import { AuthContext } from '../authentication/AuthContext';
import CustomTextArea from '../CustomTextArea';
import { PostCommentButton } from '../styles/StyledButtons';
import { tUser } from '../types';

type CommentFormProps = {
    parentId: number;
    originalInput: string;
    setIsDone?: React.Dispatch<React.SetStateAction<boolean>>;
    URL: string;
    fetchComments: () => Promise<void>;
};

const NewCommentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const auth = useContext(AuthContext);
  const params = useParams();

  const isEdit = props.originalInput.length > 0;
  const isReply = !isEdit && props.parentId > 0; //If it's an edit, then it's not a reply regardless of id

  useEffect(() => {
    setInput(props.originalInput);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFocus(true); //Prevents the button from disappearing

    if (input.length == 0) {
      setError(true);
    } else {
      auth.promptLogin(postCommentOrEdit); //Set postCommentOrEdit to be the afterLogin function to be called
    }
  };

  const handleCancel = () => {
    setFocus(false);
    setTimeout(() => {
            props.setIsDone!(false);
    }, 170);
  };

  const postCommentOrEdit = async (user: tUser) => {
    const data = {
      body: input,
      user_id: user.id,
      post_id: Number(params.id),
      ...(isReply && { parent_id: props.parentId }), //Only include this if it's a reply
    };

    if (isEdit) {
      await apiPutComment(props.URL, data);
    } else {
      await apiPostComment(props.URL, data);
    }

    props.fetchComments(); //Update list of comments
    setInput('');

    if (props.setIsDone) {
      handleCancel();
    }
  };

  return (
    <NewCommentForm onSubmit={handleSubmit}>
      <CustomTextArea
        isTextArea={true}
        placeholder={`Write a ${isReply ? 'reply' : 'comment'}...`}
        useInputState={[input, setInput]}
        useErrorState={[error, setError]}
        useFocusState={[focus, setFocus]}
        autoFocus={isReply || isEdit}
        //ref={textAreaRef}
      />
      {focus && (
        <ButtonsWrapper>
          <PostCommentButton
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
          >
            {isEdit ? 'EDIT' : isReply ? 'REPLY' : 'COMMENT'}
          </PostCommentButton>
          {(isReply || isEdit) && props.setIsDone && (
            <button
              onClick={() => handleCancel()}
              onMouseDown={(e) => e.preventDefault()}
            >
                            CANCEL
            </button>
          )}
        </ButtonsWrapper>
      )}
    </NewCommentForm>
  );
};

export default CommentForm;
