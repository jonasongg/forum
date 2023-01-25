import React, { useContext } from 'react';
import {
  ButtonsWrapper,
  PopupTitle,
  StyledConfirmButton,
} from '../styles/SharedStyles';
import { PopupContext } from './PopupContext';

type DeletePopupProps = {
    isComment: boolean;
};

const DeletePopup: React.FC<DeletePopupProps> = (props) => {
  const popup = useContext(PopupContext);

  const handleDelete = () => {
    popup.afterDeleteFunction();
  };

  return (
    <>
      <PopupTitle>Delete confirmation</PopupTitle>
      <div>
        {`Are you sure you want to delete this ${
          props.isComment
            ? 'comment?'
            : 'post? All comments under your post will also be deleted!'
        }`}
      </div>
      <ButtonsWrapper>
        <StyledConfirmButton onClick={() => handleDelete()}>
                    DELETE
        </StyledConfirmButton>
        <button onClick={() => popup.setPopupPrompted(0)}>
                    CANCEL
        </button>
      </ButtonsWrapper>
    </>
  );
};

export default DeletePopup;
