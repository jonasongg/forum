import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstance } from '../api';
import { AuthContext } from '../AuthContext';
import { StyledConfirmButton } from '../styles/StyledConfirmButton';

type CommentFormProps = {
    parentId: number;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    postURL: string;
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

const PostCommentButton = styled(StyledConfirmButton)`
    width: fit-content;
`;

const CommentTextarea = styled.textarea<{ isFocus: boolean; error: boolean }>`
    width: ${(props) => (props.isFocus ? '100%' : '95%')};
    height: ${(props) => (props.isFocus ? '200px' : '100px')};
    background-color: ${(props) =>
    props.isFocus ? props.theme.background : props.theme.main};

    padding: 10px;
    resize: none;
    outline: none;
    border: 2px solid
        ${(props) =>
    props.isFocus
      ? props.error
        ? props.theme.subError
        : props.theme.subMain
      : props.theme.main};
    border-radius: 10px;
    box-shadow: ${(props) =>
    props.isFocus ? props.theme.boxShadow : props.theme.boxShadowStrong};

    transition: background-color 0.2s, width 0.2s, border 0.2s, height 0.4s;
`;

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [input, setInput] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const params = useParams();

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const inputValue = (event.target as HTMLTextAreaElement).value;

    setInput(inputValue);
    if (inputValue.length != 0) {
      setError(false);
    }
  };

  const handleBlur = () => {
    setFocus(input.length != 0);
    setError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFocus(true);

    if (input.length == 0) {
      setError(true);
    } else {
      auth.setAfterLogin(() => {
        axiosInstance.post(props.postURL, {
          body: input,
          user_id: auth.user?.id,
          post_id: Number(params.id),
          ...(props.parentId > 0 && { parent_id: props.parentId }),
        });
      });
    }
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <NewCommentForm onSubmit={handleSubmit}>
      <CommentTextarea
        placeholder={`Write a ${
          props.parentId > 0 ? 'reply' : 'comment'
        }...`}
        onFocus={() => setFocus(true)}
        onBlur={() => handleBlur()} //Set unfocused only when length is 0 (textarea empty)
        onChange={handleChange}
        isFocus={focus}
        error={error}
        autoFocus={props.parentId > 0}
      ></CommentTextarea>
      {focus && (
        <ButtonsWrapper>
          <PostCommentButton
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
          >
            {props.parentId > 0 ? 'REPLY' : 'COMMENT'}
          </PostCommentButton>
          {props.parentId > 0 && props.setIsReplying && (
            <button
              onClick={() => props.setIsReplying!(false)}
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
