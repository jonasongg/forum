import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiPostComment } from '../api';
import { AuthContext } from '../AuthContext';
import CustomTextArea from '../CustomTextArea';
import { PostCommentButton } from '../styles/StyledButtons';
import { tUser } from '../types';

type CommentFormProps = {
    parentId: number;
    setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
    postURL: string;
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFocus(true); //Prevents the button from disappearing

    if (input.length == 0) {
      setError(true);
    } else {
      auth.promptLogin(postComment); //Set postComment to be the afterLogin function to be called
    }
  };

  const postComment = async (user: tUser) => {
    await apiPostComment(props.postURL, {
      body: input,
      user_id: user.id,
      post_id: Number(params.id),
      ...(props.parentId > 0 && { parent_id: props.parentId }), //Only include this if it's a reply
    });

    if (textAreaRef.current) {
      //Blur and empty textArea
      textAreaRef.current.value = '';
      textAreaRef.current.blur();
      setInput('');
      setFocus(false);
    }

    props.fetchComments(); //Update list of comments

    if (props.parentId > 0 && props.setIsReplying) {
      //If it's a reply, get rid of textarea
      props.setIsReplying(false);
    }
  };

  return (
    <NewCommentForm onSubmit={handleSubmit}>
      <CustomTextArea
        isTextArea={true}
        placeholder={`Write a ${
          props.parentId > 0 ? 'reply' : 'comment'
        }...`}
        useInputState={[input, setInput]}
        useErrorState={[error, setError]}
        useFocusState={[focus, setFocus]}
        autoFocus={props.parentId > 0}
        //ref={textAreaRef}
      />
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
