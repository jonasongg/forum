import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import DeletePopup from './DeletePopup';
import LoginPopup from './LoginPopup';
import { PopupContext } from './PopupContext';

const PopupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.2);
`;

const PopupInner = styled.div`
    padding: 70px;
    z-index: 3;
    background-color: ${(props) => props.theme.background};
    border-radius: 20px;
    width: 40%;

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Popup: React.FC = () => {
  const popup = useContext(PopupContext);

  //Close login prompt on Esc key
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        popup.setPopupPrompted(0);
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return popup.popupPrompted != 0 ? (
    <PopupWrapper onClick={() => popup.setPopupPrompted(0)}>
      <PopupInner onClick={(e) => e.stopPropagation()}>
        {popup.popupPrompted == 1 ? (
          <LoginPopup />
        ) : (
          <DeletePopup isComment={popup.isCommentDelete} />
        )}
      </PopupInner>
    </PopupWrapper>
  ) : null;
};

export default Popup;
